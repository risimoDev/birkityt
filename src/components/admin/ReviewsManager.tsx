"use client";

import { useState } from "react";
import {
  createReview,
  updateReview,
  togglePublishReview,
  deleteReview,
  moveReview,
  seedDefaultReviews,
} from "@/app/admin/(dash)/reviews/actions";
import type { ReviewDTO } from "@/lib/reviews";

type Tab = "all" | "pending" | "published";

export function ReviewsManager({ initial }: { initial: ReviewDTO[] }) {
  const [items, setItems] = useState(initial);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newPublish, setNewPublish] = useState(true);

  const [editName, setEditName] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editPublish, setEditPublish] = useState(false);

  const [statusMsg, setStatusMsg] = useState("");

  const pendingCount = items.filter((i) => !i.isPublished).length;
  const publishedCount = items.filter((i) => i.isPublished).length;

  const filteredItems = items.filter((i) => {
    if (activeTab === "pending") return !i.isPublished;
    if (activeTab === "published") return i.isPublished;
    return true;
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setStatusMsg("");
    const res = await createReview(newName, newText, newBrand, undefined, newRating, newPublish);
    if (!res.ok) {
      setStatusMsg(res.info || "Ошибка создания");
      return;
    }
    setNewName("");
    setNewBrand("");
    setNewText("");
    setNewRating(5);
    setNewPublish(true);
    window.location.reload();
  }

  function startEdit(item: ReviewDTO) {
    setEditingId(item.id);
    setEditName(item.name);
    setEditBrand(item.brand || "");
    setEditText(item.text);
    setEditRating(item.rating || 5);
    setEditPublish(!!item.isPublished);
  }

  async function handleUpdate(id: string) {
    setStatusMsg("");
    const res = await updateReview(id, {
      name: editName,
      text: editText,
      brand: editBrand,
      rating: editRating,
      isPublished: editPublish,
    });
    if (!res.ok) {
      setStatusMsg(res.info || "Ошибка обновления");
      return;
    }
    setEditingId(null);
    window.location.reload();
  }

  async function handleTogglePublish(id: string, publish: boolean) {
    setStatusMsg("");
    const res = await togglePublishReview(id, publish);
    if (!res.ok) {
      setStatusMsg("Не удалось изменить статус публикации");
      return;
    }
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

  async function handleSeed() {
    setStatusMsg("");
    await seedDefaultReviews();
    window.location.reload();
  }

  return (
    <div className="space-y-8">
      {statusMsg && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {statusMsg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-textColorDark/10 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "all"
              ? "bg-textColorDark text-mainColor"
              : "bg-white text-textColor hover:bg-gray-100"
          }`}
        >
          Все отзывы ({items.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("pending")}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "pending"
              ? "bg-amber-600 text-white"
              : "bg-white text-textColor hover:bg-gray-100"
          }`}
        >
          <span>На модерации</span>
          {pendingCount > 0 && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                activeTab === "pending" ? "bg-white text-amber-700" : "bg-amber-100 text-amber-800"
              }`}
            >
              {pendingCount}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("published")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "published"
              ? "bg-emerald-700 text-white"
              : "bg-white text-textColor hover:bg-gray-100"
          }`}
        >
          Опубликованные ({publishedCount})
        </button>
      </div>

      {/* Form: create */}
      <form
        onSubmit={handleCreate}
        className="rounded-3xl border border-textColorDark/10 bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-xl font-bold text-textColorDark">Добавить отзыв вручную</h2>
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

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
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

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-textColorDark">
              <input
                type="checkbox"
                checked={newPublish}
                onChange={(e) => setNewPublish(e.target.checked)}
                className="h-4 w-4 rounded accent-emerald-600"
              />
              Опубликовать сразу
            </label>
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
        <h2 className="text-xl font-bold text-textColorDark">
          {activeTab === "pending"
            ? `Отзывы на модерации (${filteredItems.length})`
            : activeTab === "published"
            ? `Опубликованные на сайте (${filteredItems.length})`
            : `Все отзывы (${filteredItems.length})`}
        </h2>

        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-textColorDark/20 bg-white p-8 text-center text-sm text-textColor/60 space-y-3">
            <p>
              {activeTab === "pending"
                ? "Нет отзывов, ожидающих модерации."
                : "В базе данных пока нет отзывов."}
            </p>
            {activeTab !== "pending" && (
              <button
                type="button"
                onClick={handleSeed}
                className="rounded-full bg-textColorDark px-5 py-2 text-xs font-semibold text-mainColor hover:bg-onbutton hover:text-white transition-colors"
              >
                Загрузить стартовые примеры отзывов
              </button>
            )}
          </div>
        ) : (
          filteredItems.map((item, idx) => {
            const isEdit = editingId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-3xl border p-6 shadow-sm transition-all ${
                  item.isPublished
                    ? "border-textColorDark/10 bg-white"
                    : "border-amber-300 bg-amber-50/50"
                }`}
              >
                {isEdit ? (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Имя"
                        className="rounded-xl border border-textColorDark/20 px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={editBrand}
                        onChange={(e) => setEditBrand(e.target.value)}
                        placeholder="Бренд"
                        className="rounded-xl border border-textColorDark/20 px-3 py-2 text-sm"
                      />
                      <textarea
                        rows={3}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Текст отзыва"
                        className="sm:col-span-2 rounded-xl border border-textColorDark/20 px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
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
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-textColorDark">
                          <input
                            type="checkbox"
                            checked={editPublish}
                            onChange={(e) => setEditPublish(e.target.checked)}
                            className="h-4 w-4 rounded accent-emerald-600"
                          />
                          Опубликован на сайте
                        </label>
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
                      <div className="flex flex-wrap items-center gap-2">
                        {item.isPublished ? (
                          <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[11px] font-semibold">
                            ✓ Опубликован
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-200 text-amber-900 px-2.5 py-0.5 text-[11px] font-bold animate-pulse">
                            ⏳ На модерации
                          </span>
                        )}
                        <h3 className="font-bold text-textColorDark">{item.name}</h3>
                        {item.brand && (
                          <span className="font-mono text-xs text-textColor/60">
                            · {item.brand}
                          </span>
                        )}
                        <div className="flex text-amber-500 text-sm">
                          {"★".repeat(item.rating || 5)}
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-textColor">{item.text}</p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      {item.isPublished ? (
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(item.id, false)}
                          className="rounded-lg border border-textColorDark/20 bg-white px-3 py-1.5 text-xs font-medium text-textColorDark hover:bg-gray-100"
                        >
                          Снять с публикации
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(item.id, true)}
                          className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm"
                        >
                          ✓ Опубликовать
                        </button>
                      )}

                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMove(item.id, "up")}
                        className="rounded-lg border px-2 py-1 text-xs disabled:opacity-30 bg-white"
                        title="Поднять выше"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={idx === filteredItems.length - 1}
                        onClick={() => handleMove(item.id, "down")}
                        className="rounded-lg border px-2 py-1 text-xs disabled:opacity-30 bg-white"
                        title="Опустить ниже"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="rounded-lg border border-textColorDark/20 bg-white px-3 py-1 text-xs font-medium hover:bg-textColorDark/5"
                      >
                        Редактировать
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg border border-red-200 bg-white text-red-600 px-3 py-1 text-xs hover:bg-red-50"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
