import { getWorks } from "@/lib/works";
import { getWorkCategories } from "@/lib/categories";
import { WorksManager, type WorkRow } from "@/components/admin/WorksManager";
import { CategoryManager } from "@/components/admin/CategoryManager";

export const dynamic = "force-dynamic";

export default async function WorksAdminPage() {
  const [works, categories] = await Promise.all([getWorks(), getWorkCategories()]);
  const rows: WorkRow[] = works.map((w) => ({
    id: w.id,
    title: w.title,
    description: w.description ?? "",
    image: w.image,
    categoryId: w.categoryId,
  }));

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-textColorDark">Работы</h1>
      <p className="mt-1 text-textColor">
        Портфолио на странице «Наши работы». Загруженные изображения сжимаются в WebP.
        Категории помогают фильтровать работы на сайте.
      </p>
      <div className="mt-6">
        <CategoryManager categories={categories} />
      </div>

      <div className="mt-6">
        <WorksManager
          works={rows}
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      </div>
    </div>
  );
}
