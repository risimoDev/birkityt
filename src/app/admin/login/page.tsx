"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "./actions";
import { Logo } from "@/components/site/Logo";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-textColorDark px-6 py-3 text-sm font-semibold text-mainColor transition-colors hover:bg-onbutton hover:text-white disabled:opacity-60"
    >
      {pending ? "Входим…" : "Войти"}
    </button>
  );
}

export default function LoginPage() {
  const [error, formAction] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-mainColor px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo href={null} className="h-10" />
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-textColor/50">
            панель управления
          </p>
        </div>

        <form
          action={formAction}
          className="space-y-4 rounded-3xl border border-textColorDark/10 bg-white/70 p-7"
        >
          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-textColor/60">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded-xl border border-textColorDark/15 bg-white px-4 py-3 text-textColorDark outline-none focus:border-onbutton"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-textColor/60">
              Пароль
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-textColorDark/15 bg-white px-4 py-3 text-textColorDark outline-none focus:border-onbutton"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
