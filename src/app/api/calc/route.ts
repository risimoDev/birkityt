import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { computeQuote } from "@/lib/pricing";
import { getCalcConfig, lengthSurchargeFor } from "@/lib/calc-config";
import { notifyCalc } from "@/lib/notify";

const schema = z.object({
  groupId: z.string().min(1),
  itemId: z.string().min(1),
  quantity: z.coerce.number().int().positive().max(1_000_000),
  length: z.string().max(32).nullable().optional(),
  fraying: z.boolean().optional(),
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

export async function POST(req: Request) {
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
  const quote = computeQuote({
    tiers: item.tiers.map((t) => ({ maxQty: t.maxQty, pricePerUnit: t.pricePerUnit })),
    quantity: data.quantity,
    lengthSurcharge: lengthSurchargeFor(config, data.length ?? null),
    frayingSurcharge:
      data.fraying && config.frayingEnabled ? config.frayingSurcharge : 0,
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
          contactMethod: data.contactMethod ?? null,
          quote,
        },
      },
    });
    // Notify manager (email + telegram). Non-blocking failures are tolerated.
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
