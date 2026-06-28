"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createGroup } from "@/app/admin/(dash)/prices/actions";

export function AddGroup() {
  const [name, setName] = useState("");
  const [pending, start] = useTransition();
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название новой группы"
        className="min-w-0 flex-1 rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-onbutton"
      />
      <button
        disabled={pending || !name.trim()}
        onClick={() =>
          start(async () => {
            await createGroup(name);
            setName("");
            router.refresh();
          })
        }
        className="rounded-xl bg-textColorDark px-5 py-2.5 text-sm font-semibold text-mainColor disabled:opacity-50"
      >
        + Добавить группу
      </button>
    </div>
  );
}
