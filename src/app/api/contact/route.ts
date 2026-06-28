import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { notifyContact } from "@/lib/notify";

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
    // Notify manager (email + telegram). Non-blocking failures are tolerated.
    await notifyContact({ name, phone, email, message });
    return NextResponse.json({ result: "success", info: "Заявка сохранена" });
  } catch {
    return NextResponse.json(
      { result: "error", info: "Ошибка сервера, попробуйте позже" },
      { status: 500 },
    );
  }
}
