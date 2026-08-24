"use server";

import { headers } from "next/headers";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { clientIp, rateLimit, resetRateLimit } from "@/lib/rate-limit";

/** 10 attempts per IP per 15 minutes — generous for a typo, useless for a bot. */
const LIMIT = { limit: 10, windowMs: 15 * 60 * 1000 };

export async function loginAction(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const ip = clientIp(await headers());
  const key = `login:${ip}`;

  const { ok, retryAfter } = rateLimit(key, LIMIT);
  if (!ok) {
    const minutes = Math.ceil(retryAfter / 60);
    return `Слишком много попыток входа. Попробуйте через ${minutes} мин.`;
  }

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      // Deliberately the same message for a wrong email and a wrong password:
      // a different one would tell an attacker which accounts exist.
      return "Неверный email или пароль";
    }
    // signIn signals success by throwing a redirect. Only that clears the
    // counter — a database outage must not hand an attacker a fresh window.
    const digest = (error as { digest?: string }).digest;
    if (typeof digest === "string" && digest.startsWith("NEXT_REDIRECT")) {
      resetRateLimit(key);
    }
    throw error;
  }
  return undefined;
}
