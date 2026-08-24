import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { computeQuote } from "@/lib/pricing";
import { getCalcConfig, lengthSurchargeFor, addonsSurchargeFor } from "@/lib/calc-config";
import { notifyCalc } from "@/lib/notify";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  groupId: z.string().min(1),
  itemId: z.string().min(1),
  quantity: z.coerce.number().int().positive().max(1_000_000),
  length: z.string().max(32).nullable().optional(),
  fraying: z.boolean().optional(),
  addons: z.array(z.string().max(48)).max(20).optional(),
  name: z.string({ required_error: "Укажите имя" }).trim().min(1, "Укажите имя").max(200),
  phone: z
    .string({ required_error: "Укажите телефон" })
    .trim()
    .min(3, "Укажите телефон")
    .max(64),
  email: z.string().trim().email("Неверный e-mail").max(200).optional().or(z.literal("")),
  contactMethod: z.string().trim().max(64).optional(),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  company: z.string().optional(), // honeypot
});

/** 5 submissions per IP per 10 minutes — well above human use, below a script. */
const LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

export async function POST(req: Request) {
  const { ok, retryAfter } = rateLimit(
    `calc:${clientIp(req.headers)}`,
    LIMIT,
  );
  if (!ok) {
    return NextResponse.json(
      { result: "error", info: "Слишком много заявок подряд. Попробуйте позже или позвоните нам." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { result: "error", info: "Неверный формат запроса" },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.errors[0]?.message ?? "Проверьте поля формы";
    return NextResponse.json({ result: "error", info: first }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot: silently accept bots.
  if (data.company && data.company.trim() !== "") {
    return NextResponse.json({ result: "success", info: "ok" });
  }

  // Authoritative price recompute from DB — never trust a client-sent total.
  let item;
  try {
    item = await prisma.priceItem.findFirst({
      where: { id: data.itemId, groupId: data.groupId },
      include: { tiers: true, group: true },
    });
  } catch {
    return NextResponse.json(
      { result: "error", info: "Ошибка сервера, попробуйте позже" },
      { status: 500 },
    );
  }

  if (!item) {
    return NextResponse.json(
      { result: "error", info: "Выбранный материал не найден" },
      { status: 422 },
    );
  }

  // Recompute surcharges from the editable calculator config — never trust
  // amounts from the client.
  const config = await getCalcConfig();
  // Only keep add-ons the chosen group actually offers, then recompute.
  const selectedAddons =
    item.group.addonsEnabled && config.addonsEnabled
      ? (data.addons ?? []).filter((label) =>
          config.addons.some((a) => a.label === label),
        )
      : [];
  const quote = computeQuote({
    tiers: item.tiers.map((t) => ({ maxQty: t.maxQty, pricePerUnit: t.pricePerUnit })),
    quantity: data.quantity,
    lengthSurcharge: lengthSurchargeFor(config, data.length ?? null),
    frayingSurcharge:
      data.fraying && config.frayingEnabled ? config.frayingSurcharge : 0,
    addonsSurcharge: addonsSurchargeFor(config, selectedAddons, item.group.addonsEnabled),
  });

  try {
    await prisma.submission.create({
      data: {
        type: "CALC",
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        message: data.message || null,
        source: "site/calculator",
        payload: {
          group: item.group.name,
          variant: item.variant,
          quantity: data.quantity,
          length: data.length ?? null,
          fraying: data.fraying ?? false,
          addons: selectedAddons,
          contactMethod: data.contactMethod ?? null,
          quote,
        },
      },
    });
    // Notify manager (email + MAX). Non-blocking failures are tolerated.
    await notifyCalc(
      {
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message,
        contactMethod: data.contactMethod,
      },
      {
        group: item.group.name,
        variant: item.variant,
        quantity: data.quantity,
        length: data.length ?? null,
        fraying: data.fraying ?? false,
        addons: selectedAddons,
        quote,
      },
    );
    return NextResponse.json({
      result: "success",
      info: "Заявка сохранена",
      total: quote.total,
    });
  } catch {
    return NextResponse.json(
      { result: "error", info: "Ошибка сервера, попробуйте позже" },
      { status: 500 },
    );
  }
}
