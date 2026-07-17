import { getSettings, setting } from "@/lib/settings";
import { MEDIA_GROUPS } from "@/lib/media";
import { MediaManager, type MediaGroupView } from "@/components/admin/MediaManager";

export const dynamic = "force-dynamic";

export default async function MediaAdminPage() {
  const s = await getSettings();

  const groups: MediaGroupView[] = MEDIA_GROUPS.map((g) => ({
    title: g.title,
    slots: g.slots.map((slot) => {
      const override = setting(s, slot.key, "");
      return {
        key: slot.key,
        label: slot.label,
        src: override || slot.default,
        isDefault: !override,
      };
    }),
  }));

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-textColorDark">Медиа</h1>
      <p className="mt-1 text-textColor">
        Ключевые фото главной страницы. Загруженное изображение автоматически
        сжимается в WebP. «Сбросить» возвращает стандартное фото.
      </p>

      <div className="mt-6">
        <MediaManager groups={groups} />
      </div>
    </div>
  );
}
