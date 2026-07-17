"use client";

import { useState, useTransition } from "react";
import {
  createMaterial,
  updateMaterial,
  deleteMaterial,
  moveMaterial,
  seedDefaultMaterials,
} from "@/app/admin/(dash)/materials/actions";

export type MaterialRow = { id: string; title: string; text: string };

export function MaterialsManager({
  materials,
  seeded,
}: {
  materials: MaterialRow[];
  seeded: boolean;
}) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);

  function add() {
    setMsg(null);
    start(async () => {
      const res = await createMaterial(title, text);
      if (res.ok) {
        setTitle("");
        setText("");
      } else {
        setMsg(res.info ?? "Ошибка");
      }
    });
  }

  return (
    <div className="space-y-8">
      {!seeded && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-onbutton/40 bg-onbutton/10 p-4 text-sm text-textColorDark">
          <span>
            Сейчас показываются стандартные карточки. Загрузите их в базу, чтобы
            редактировать.
          </span>
          <button
            disabled={pending}
            onClick={() => start(() => seedDefaultMaterials().then(() => undefined))}
            className="rounded-xl bg-textColorDark px-4 py-2 text-xs font-semibold text-mainColor disabled:opacity-50"
          >
            Загрузить стандартные
          </button>
        </div>
      )}

      <section>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-onbutton">
          Добавить материал
        </h2>
        <div className="grid gap-3 rounded-2xl border border-textColorDark/10 bg-white/70 p-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название (напр. Силиконовая бирка)"
            className="rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Описание материала"
            rows={2}
            className="resize-y rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton"
          />
          <div className="flex items-center gap-3">
            <button
              disabled={pending || !title.trim()}
              onClick={add}
              className="rounded-xl bg-textColorDark px-5 py-2.5 text-sm font-semibold text-mainColor disabled:opacity-50"
            >
              + Добавить
            </button>
            {msg && <span className="text-sm text-red-600">{msg}</span>}
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-onbutton">
          Материалы ({materials.length})
        </h2>
        <div className="grid gap-3">
          {materials.map((m, i) => (
            <MaterialCard
              key={m.id}
              m={m}
              index={i}
              total={materials.length}
              editable={seeded}
            />
          ))}
          {materials.length === 0 && (
            <p className="rounded-2xl border border-dashed border-textColorDark/20 p-10 text-center text-textColor">
              Материалов пока нет. Добавьте первый.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function MaterialCard({
  m,
  index,
  total,
  editable,
}: {
  m: MaterialRow;
  index: number;
  total: number;
  editable: boolean;
}) {
  const [title, setTitle] = useState(m.title);
  const [text, setText] = useState(m.text);
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const dirty = title !== m.title || text !== m.text;

  if (!editable) {
    // Fallback (default) cards — read-only until seeded into the DB.
    return (
      <div className="rounded-2xl border border-textColorDark/10 bg-white/70 p-4">
        <div className="font-semibold text-textColorDark">{m.title}</div>
        <p className="mt-1 text-sm text-textColor">{m.text}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-textColorDark/10 bg-white/70 p-4">
      <div className="flex items-start gap-3">
        <div className="flex flex-col pt-1">
          <button
            onClick={() => start(() => moveMaterial(m.id, "up"))}
            disabled={pending || index === 0}
            title="Выше"
            className="text-textColor/50 hover:text-textColorDark disabled:opacity-25"
          >
            ▲
          </button>
          <button
            onClick={() => start(() => moveMaterial(m.id, "down"))}
            disabled={pending || index === total - 1}
            title="Ниже"
            className="text-textColor/50 hover:text-textColorDark disabled:opacity-25"
          >
            ▼
          </button>
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-textColorDark/10 bg-mainColor px-3 py-2 text-sm font-semibold outline-none focus:border-onbutton"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            className="w-full resize-y rounded-lg border border-textColorDark/10 bg-white px-3 py-2 text-sm outline-none focus:border-onbutton"
          />
          <div className="flex items-center gap-2">
            <button
              disabled={pending || !dirty}
              onClick={() =>
                start(async () => {
                  const res = await updateMaterial(m.id, title, text);
                  setMsg(res.ok ? "Сохранено" : res.info ?? "Ошибка");
                })
              }
              className="rounded-lg bg-textColorDark px-3 py-2 text-xs font-semibold text-mainColor disabled:opacity-50"
            >
              Сохранить
            </button>
            <button
              disabled={pending}
              onClick={() => {
                if (confirm(`Удалить материал «${m.title}»?`)) start(() => deleteMaterial(m.id));
              }}
              className="rounded-lg border border-textColorDark/15 px-3 py-2 text-xs text-textColor hover:border-red-300 hover:text-red-600"
            >
              Удалить
            </button>
            {msg && <span className="text-xs text-onbutton">{msg}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
