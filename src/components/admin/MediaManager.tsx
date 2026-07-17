"use client";

import Image from "next/image";
import { useActionState, useTransition } from "react";
import { uploadMedia, resetMedia } from "@/app/admin/(dash)/media/actions";

export type MediaSlotView = {
  key: string;
  label: string;
  src: string;
  isDefault: boolean;
};

export type MediaGroupView = { title: string; slots: MediaSlotView[] };

export function MediaManager({ groups }: { groups: MediaGroupView[] }) {
  return (
    <div className="space-y-8">
      {groups.map((g) => (
        <section key={g.title}>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-onbutton">
            {g.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {g.slots.map((s) => (
              <Slot key={s.key} slot={s} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Slot({ slot }: { slot: MediaSlotView }) {
  const [error, formAction] = useActionState(uploadMedia, undefined);
  const [pending, start] = useTransition();

  return (
    <div className="rounded-2xl border border-textColorDark/10 bg-white/70 p-3">
      <div className="relative mb-2 aspect-square overflow-hidden rounded-xl bg-mainColor">
        <Image src={slot.src} alt={slot.label} fill sizes="220px" className="object-cover" />
      </div>
      <div className="mb-2 text-sm font-medium text-textColorDark">{slot.label}</div>
      <form action={formAction} className="space-y-2">
        <input type="hidden" name="key" value={slot.key} />
        <input
          name="image"
          type="file"
          accept="image/*"
          required
          className="w-full text-xs text-textColor file:mr-2 file:rounded-lg file:border-0 file:bg-textColorDark file:px-3 file:py-1.5 file:text-mainColor"
        />
        <div className="flex items-center gap-2">
          <button className="rounded-lg bg-textColorDark px-3 py-1.5 text-xs font-semibold text-mainColor">
            Загрузить
          </button>
          {!slot.isDefault && (
            <button
              type="button"
              disabled={pending}
              onClick={() => start(() => resetMedia(slot.key))}
              className="rounded-lg border border-textColorDark/15 px-3 py-1.5 text-xs text-textColor hover:border-red-300 hover:text-red-600"
            >
              Сбросить
            </button>
          )}
        </div>
        {error && <span className="block text-xs text-red-600">{error}</span>}
      </form>
    </div>
  );
}
