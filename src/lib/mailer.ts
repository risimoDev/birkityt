import nodemailer from "nodemailer";
import { env } from "@/lib/env";

let transporter: nodemailer.Transporter | null = null;

export function isMailConfigured(): boolean {
  return Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.MAIL_TO);
}

function getTransport(): nodemailer.Transporter | null {
  if (!isMailConfigured()) return null;
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT ?? 465,
    secure: env.SMTP_SECURE ?? true,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });
  return transporter;
}

/**
 * Sends an email to MAIL_TO. Returns true on success, false if not configured
 * or on error. Never throws — notifications must not break the request flow.
 */
export async function sendMail(subject: string, html: string): Promise<boolean> {
  const t = getTransport();
  if (!t) return false;
  try {
    await t.sendMail({
      from: env.MAIL_FROM || env.SMTP_USER,
      to: env.MAIL_TO,
      subject,
      html,
    });
    return true;
  } catch (err) {
    console.error("sendMail failed:", (err as Error).message);
    return false;
  }
}
