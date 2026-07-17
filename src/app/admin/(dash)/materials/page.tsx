import { prisma } from "@/lib/db";
import { getMaterials } from "@/lib/materials";
import { MaterialsManager } from "@/components/admin/MaterialsManager";

export const dynamic = "force-dynamic";

export default async function MaterialsAdminPage() {
  const [materials, count] = await Promise.all([
    getMaterials(),
    prisma.material.count().catch(() => 0),
  ]);
  const seeded = count > 0;

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-textColorDark">Материалы</h1>
      <p className="mt-1 text-textColor">
        Карточки на странице{" "}
        <a href="/materials" className="font-semibold underline" target="_blank" rel="noopener">
          «Материалы»
        </a>
        . Добавляйте, редактируйте и меняйте порядок.
      </p>

      <div className="mt-6">
        <MaterialsManager
          materials={materials.map((m) => ({ id: m.id, title: m.title, text: m.text }))}
          seeded={seeded}
        />
      </div>
    </div>
  );
}
