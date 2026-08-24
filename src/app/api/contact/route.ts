import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { notifyContact } from "@/lib/notify";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z
    .string({ required_error: "Укажите имя" })
    .trim()
    .min(1, "Укажите имя")
    .max(200),
  phone: z
    .string({ required_error: "Укажите телефон" })
    .trim()
    .min(3, "Укажите телефон")
    .max(64),
  email: z
    .string()
    .trim()
    .email("Неверный e-mail")
    .max(200)
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  // honeypot: must stay empty
  company: z.string().optional(),
});

/** 5 submissions per IP per 10 minutes — well above human use, below a script. */
const LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

export async function POST(req: Request) {
  const { ok, retryAfter } = rateLimit(
    `contact:${clientIp(req.headers)}`,
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

  const { name, phone, email, message, company } = parsed.data;

  // Silently accept bots (honeypot) without storing.
  if (company && company.trim() !== "") {
    return NextResponse.json({ result: "success", info: "ok" });
  }

  try {
    await prisma.submission.create({
      data: {
        type: "CONTACT",
        name,
        phone,
        email: email || null,
        message: message || null,
        source: "site/contact-form",
      },
    });
    // Notify manager (email + MAX). Non-blocking failures are tolerated.
    await notifyContact({ name, phone, email, message });
    return NextResponse.json({ result: "success", info: "Заявка сохранена" });
  } catch {
    return NextResponse.json(
      { result: "error", info: "Ошибка сервера, попробуйте позже" },
      { status: 500 },
    );
  }
}
