import { setting, type SettingMap } from "@/lib/settings";

/**
 * Editable image slots on the homepage. Each slot maps a Setting key to a
 * current image path; when unset it falls back to the bundled default.
 * Admin uploads replace the value (see /admin/media).
 */
export type MediaSlot = { key: string; label: string; default: string };

export const HERO_SLOTS: MediaSlot[] = [
  { key: "media.home.hero.1", label: "Хедер — фото 1", default: "/images/works/work_693a32b58034e5.65048226.webp" },
  { key: "media.home.hero.2", label: "Хедер — фото 2", default: "/images/works/work_693a32b6aafd39.89489493.webp" },
  { key: "media.home.hero.3", label: "Хедер — фото 3", default: "/images/works/work_693a32b798b680.91423171.webp" },
];

export const ABOUT_SLOTS: MediaSlot[] = [
  { key: "media.home.about.1", label: "О нас — фото 1 (слева сверху)", default: "/images/banners/0iCWg4QBUkE.jpg" },
  { key: "media.home.about.2", label: "О нас — фото 2 (справа сверху)", default: "/images/banners/jtouETZBAo0.jpg" },
  { key: "media.home.about.3", label: "О нас — фото 3 (широкое снизу)", default: "/images/banners/UPqlF9J6IHo.jpg" },
];

export const MEDIA_GROUPS: { title: string; slots: MediaSlot[] }[] = [
  { title: "Главная · Хедер (3 фото)", slots: HERO_SLOTS },
  { title: "Главная · Блок «о нас» (3 фото)", slots: ABOUT_SLOTS },
];

export const ALL_MEDIA_SLOTS: MediaSlot[] = MEDIA_GROUPS.flatMap((g) => g.slots);

/** Resolve a group of slots to their current image paths (default when unset). */
export function mediaSrcs(map: SettingMap, slots: MediaSlot[]): string[] {
  return slots.map((s) => setting(map, s.key, s.default));
}
