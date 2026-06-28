"use client";

import Image from "next/image";
import { useActionState, useState, useTransition } from "react";
import { uploadWork, updateWork, deleteWork } from "@/app/admin/(dash)/works/actions";

export type WorkRow = {
  id: string;
  title: string;
  description: string;
  image: string;
  categoryId: string | null;
};

export type CategoryOption = { id: string; name: string };

export function WorksManager({
  works,
  categories,
}: {
  works: WorkRow[];
  categories: CategoryOption[];
}) {
  const [error, formAction] = useActionState(uploadWork, undefined);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-onbutton">
          Загрузить работу
        </h2>
        <form
          action={formAction}
          className="grid gap-3 rounded-2xl border border-textColorDark/10 bg-white/70 p-5 sm:grid-cols-2"
        >
          <input name="title" placeholder="Заголовок"
            className="rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton" />
          <input name="description" placeholder="Описание (необязательно)"
            className="rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton" />
          <select name="categoryId" defaultValue=""
            className="rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton">
            <option value="">Без категории</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input name="image" type="file" accept="image/*" required
            className="text-sm text-textColor file:mr-3 file:rounded-lg file:border-0 file:bg-textColorDark file:px-4 file:py-2 file:text-mainColor" />
          <div className="sm:col-span-2 flex items-center gap-3">
            <button className="rounded-xl bg-textColorDark px-5 py-2.5 text-sm font-semibold text-mainColor">
              Загрузить
            </button>
            <span className="text-xs text-textColor/60">
              Изображение сжимается в WebP автоматически.
            </span>
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </form>
      </section>

      <section>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-onbutton">
          Загруженные работы ({works.length})
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {works.map((w) => (
            <WorkCard key={w.id} w={w} categories={categories} />
          ))}
          {works.length === 0 && (
            <p className="col-span-full rounded-2xl border border-dashed border-textColorDark/20 p-10 text-center text-textColor">
              Работ пока нет.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function WorkCard({ w, categories }: { w: WorkRow; categories: CategoryOption[] }) {
  const [pending, start] = useTransition();
  const [title, setTitle] = useState(w.title);
  const [desc, setDesc] = useState(w.description);
  const [catId, setCatId] = useState(w.categoryId ?? "");
  const dirty = title !== w.title || desc !== w.description || catId !== (w.categoryId ?? "");

  return (
    <div className="rounded-2xl border border-textColorDark/10 bg-white/70 p-3">
      <div className="relative mb-2 aspect-square overflow-hidden rounded-xl bg-mainColor">
        <Image src={w.image} alt={w.title || "Работа"} fill sizes="200px" className="object-cover" />
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
        className="mb-1.5 w-full rounded-lg border border-textColorDark/10 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-onbutton"
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Описание"
        rows={2}
        className="w-full resize-none rounded-lg border border-textColorDark/10 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-onbutton"
      />
      <select
        value={catId}
        onChange={(e) => setCatId(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-textColorDark/10 bg-white px-2.5 py-1.5 text-xs outline-none focus:border-onbutton"
      >
        <option value="">Без категории</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <div className="mt-2 flex gap-2">
        <button
          disabled={pending || !dirty}
          onClick={() => start(() => updateWork(w.id, title, desc, catId || null))}
          className="flex-1 rounded-lg bg-textColorDark px-2 py-1.5 text-xs font-semibold text-mainColor disabled:opacity-40"
        >
          Сохранить
        </button>
        <button
          disabled={pending}
          onClick={() => { if (confirm("Удалить работу?")) start(() => deleteWork(w.id)); }}
          className="rounded-lg border border-textColorDark/15 px-2.5 py-1.5 text-xs text-textColor hover:border-red-300 hover:text-red-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
