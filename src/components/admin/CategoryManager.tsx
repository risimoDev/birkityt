"use client";

import { useState, useTransition } from "react";
import {
  createWorkCategory,
  renameWorkCategory,
  deleteWorkCategory,
} from "@/app/admin/(dash)/works/actions";

export type CategoryRow = { id: string; slug: string; name: string };

export function CategoryManager({ categories }: { categories: CategoryRow[] }) {
  const [newName, setNewName] = useState("");
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  function add() {
    const name = newName.trim();
    if (!name) return;
    start(async () => {
      const res = await createWorkCategory(name);
      if (res.ok) setNewName("");
      setMsg(res.ok ? "Категория добавлена" : res.info ?? "Ошибка");
    });
  }

  return (
    <section className="rounded-2xl border border-textColorDark/10 bg-white/70 p-5">
      <h2 className="font-bold text-textColorDark">Категории работ</h2>
      <p className="mt-1 text-sm text-textColor/70">
        Категории используются для фильтра на странице «Наши работы».
        Удаление категории не удаляет работы — они становятся без категории.
      </p>

      <div className="mt-4 space-y-2">
        {categories.map((c) => (
          <CategoryRowItem key={c.id} category={c} />
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-textColor/50">Категорий пока нет.</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-textColorDark/10 pt-4">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Новая категория (напр. Силиконовые бирки)"
          className="min-w-0 flex-1 rounded-lg border border-textColorDark/15 bg-white px-3 py-2 text-sm outline-none focus:border-onbutton"
        />
        <button
          onClick={add}
          disabled={pending || !newName.trim()}
          className="rounded-lg bg-textColorDark px-4 py-2 text-sm font-semibold text-mainColor disabled:opacity-50"
        >
          + Добавить
        </button>
        {msg && <span className="text-xs text-onbutton">{msg}</span>}
      </div>
    </section>
  );
}

function CategoryRowItem({ category }: { category: CategoryRow }) {
  const [name, setName] = useState(category.name);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const dirty = name.trim() !== category.name;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-textColorDark/10 bg-mainColor px-3 py-2 text-sm outline-none focus:border-onbutton"
      />
      <span className="hidden font-mono text-[10px] text-textColor/40 sm:inline">/{category.slug}</span>
      <button
        onClick={() =>
          start(async () => {
            const res = await renameWorkCategory(category.id, name);
            setMsg(res.ok ? "✓" : res.info ?? "Ошибка");
          })
        }
        disabled={pending || !dirty}
        className="rounded-lg bg-textColorDark px-3 py-2 text-xs font-semibold text-mainColor disabled:opacity-40"
      >
        Сохранить
      </button>
      <button
        onClick={() => {
          if (confirm(`Удалить категорию «${category.name}»?`))
            start(() => deleteWorkCategory(category.id));
        }}
        disabled={pending}
        className="rounded-lg border border-textColorDark/15 px-3 py-2 text-xs text-textColor hover:border-red-300 hover:text-red-600"
      >
        Удалить
      </button>
      {msg && <span className="text-xs text-onbutton">{msg}</span>}
    </div>
  );
}
