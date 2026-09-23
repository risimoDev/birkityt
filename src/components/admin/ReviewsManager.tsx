"use client";

import { useState } from "react";
import {
  createReview,
  updateReview,
  deleteReview,
  moveReview,
} from "@/app/admin/(dash)/reviews/actions";
import type { ReviewDTO } from "@/lib/reviews";

export function ReviewsManager({ initial }: { initial: ReviewDTO[] }) {
  const [items, setItems] = useState(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);

  const [editName, setEditName] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);

  const [statusMsg, setStatusMsg] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setStatusMsg("");
    const res = await createReview(newName, newText, newBrand, undefined, newRating);
    if (!res.ok) {
      setStatusMsg(res.info || "Ошибка создания");
      return;
    }
    setNewName("");
    setNewBrand("");
    setNewText("");
    setNewRating(5);
    window.location.reload();
  }

  function startEdit(item: ReviewDTO) {
    setEditingId(item.id);
    setEditName(item.name);
    setEditBrand(item.brand || "");
    setEditText(item.text);
    setEditRating(item.rating || 5);
  }

  async function handleUpdate(id: string) {
    setStatusMsg("");
    const res = await updateReview(id, {
      name: editName,
      text: editText,
      brand: editBrand,
      rating: editRating,
    });
    if (!res.ok) {
      setStatusMsg(res.info || "Ошибка обновления");
      return;
    }
    setEditingId(null);
    window.location.reload();
  }

  async function handleDelete(id: string) {
    if (!confirm("Удалить этот отзыв?")) return;
    await deleteReview(id);
    window.location.reload();
  }

  async function handleMove(id: string, dir: "up" | "down") {
    await moveReview(id, dir);
    window.location.reload();
  }

  return (
    <div className="space-y-8">
      {statusMsg && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {statusMsg}
        </div>
      )}

      {/* Form: create */}
      <form
        onSubmit={handleCreate}
        className="rounded-3xl border border-textColorDark/10 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-xl font-bold text-textColorDark">Добавить отзыв</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-textColor/60">
              Имя клиента *
            </label>
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Екатерина В."
              className="w-full rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-textColorDark outline-none focus:border-onbutton"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-textColor/60">
              Бренд / Компания
            </label>
            <input
              type="text"
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              placeholder="Швейная мастерская Silk & Line"
              className="w-full rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-textColorDark outline-none focus:border-onbutton"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block font-mono text-xs uppercase tracking-wider text-textColor/60">
              Текст отзыва *
            </label>
            <textarea
              required
              rows={3}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Текст отзыва от клиента..."
              className="w-full rounded-xl border border-textColorDark/15 bg-white px-4 py-2.5 text-textColorDark outline-none focus:border-onbutton"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-textColor/60">Оценка:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewRating(star)}
                className={`text-lg ${star <= newRating ? "text-amber-500" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="rounded-full bg-textColorDark px-6 py-2.5 text-sm font-semibold text-mainColor transition-colors hover:bg-onbutton hover:text-white"
          >
            Сохранить отзыв
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-textColorDark">Все отзывы ({items.length})</h2>
        {items.map((item, idx) => {
          const isEdit = editingId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-3xl border border-textColorDark/10 bg-white p-6 shadow-sm"
            >
              {isEdit ? (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="rounded-xl border border-textColorDark/20 px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      value={editBrand}
                      onChange={(e) => setEditBrand(e.target.value)}
                      className="rounded-xl border border-textColorDark/20 px-3 py-2 text-sm"
                    />
                    <textarea
                      rows={3}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="sm:col-span-2 rounded-xl border border-textColorDark/20 px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditRating(star)}
                          className={`text-lg ${star <= editRating ? "text-amber-500" : "text-gray-300"}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdate(item.id)}
                        className="rounded-full bg-onbutton px-4 py-1.5 text-xs font-semibold text-white"
                      >
                        Сохранить
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-full border px-4 py-1.5 text-xs"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-textColorDark">{item.name}</h3>
                      {item.brand && (
                        <span className="font-mono text-xs text-textColor/60">
                          · {item.brand}
                        </span>
                      )}
                      <div className="ml-2 flex text-amber-500 text-sm">
                        {"★".repeat(item.rating || 5)}
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-textColor">{item.text}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(item.id, "up")}
                      className="rounded-lg border px-2 py-1 text-xs disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={idx === items.length - 1}
                      onClick={() => handleMove(item.id, "down")}
                      className="rounded-lg border px-2 py-1 text-xs disabled:opacity-30"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="rounded-lg border border-textColorDark/20 px-3 py-1 text-xs font-medium hover:bg-textColorDark/5"
                    >
                      Редактировать
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg border border-red-200 text-red-600 px-3 py-1 text-xs hover:bg-red-50"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
