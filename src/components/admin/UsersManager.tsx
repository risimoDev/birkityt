"use client";

import { useActionState, useState, useTransition } from "react";
import { createUser, setRole, resetPassword, deleteUser } from "@/app/admin/(dash)/users/actions";

export type UserView = {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "MANAGER";
  createdAt: string;
  self: boolean;
};

export function UsersManager({ users }: { users: UserView[] }) {
  const [error, formAction] = useActionState(createUser, undefined);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-onbutton">
          Новый пользователь
        </h2>
        <form
          action={formAction}
          className="grid gap-3 rounded-2xl border border-textColorDark/10 bg-white/70 p-5 sm:grid-cols-2"
        >
          <input name="email" type="email" required placeholder="Email"
            className="rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton" />
          <input name="name" placeholder="Имя (необязательно)"
            className="rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton" />
          <select name="role" defaultValue="MANAGER"
            className="rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton">
            <option value="MANAGER">MANAGER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <input name="password" type="text" required placeholder="Пароль (мин. 8)"
            className="rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton" />
          <div className="sm:col-span-2 flex items-center gap-3">
            <button className="rounded-xl bg-textColorDark px-5 py-2.5 text-sm font-semibold text-mainColor">
              Создать
            </button>
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </form>
      </section>

      <section>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-onbutton">
          Пользователи
        </h2>
        <div className="grid gap-3">
          {users.map((u) => (
            <UserRow key={u.id} u={u} />
          ))}
        </div>
      </section>
    </div>
  );
}

function UserRow({ u }: { u: UserView }) {
  const [pending, start] = useTransition();
  const [pw, setPw] = useState("");

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-textColorDark/10 bg-white/70 p-4">
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold text-textColorDark">
          {u.name || u.email} {u.self && <span className="text-xs text-textColor/50">(вы)</span>}
        </div>
        <div className="truncate text-sm text-textColor">{u.email}</div>
      </div>

      <select
        value={u.role}
        disabled={pending}
        onChange={(e) => start(() => setRole(u.id, e.target.value))}
        className="rounded-lg border border-textColorDark/15 bg-white px-3 py-1.5 text-sm"
      >
        <option value="MANAGER">MANAGER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <div className="flex items-center gap-2">
        <input
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="новый пароль"
          className="w-36 rounded-lg border border-textColorDark/15 bg-white px-3 py-1.5 text-sm outline-none focus:border-onbutton"
        />
        <button
          disabled={pending || pw.length < 8}
          onClick={() => start(async () => { await resetPassword(u.id, pw); setPw(""); })}
          className="rounded-lg bg-textColorDark px-3 py-1.5 text-xs font-semibold text-mainColor disabled:opacity-40"
        >
          Сброс
        </button>
      </div>

      {!u.self && (
        <button
          disabled={pending}
          onClick={() => { if (confirm("Удалить пользователя?")) start(() => deleteUser(u.id)); }}
          className="rounded-lg border border-textColorDark/15 px-3 py-1.5 text-xs text-textColor hover:border-red-300 hover:text-red-600"
        >
          Удалить
        </button>
      )}
    </div>
  );
}
