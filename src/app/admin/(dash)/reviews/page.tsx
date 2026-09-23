import { getReviews } from "@/lib/reviews";
import { ReviewsManager } from "@/components/admin/ReviewsManager";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-textColorDark">
          Управление отзывами
        </h1>
        <p className="mt-1 text-sm text-textColor/70">
          Добавляйте, редактируйте и меняйте порядок отображения отзывов клиентов на главной странице сайта.
        </p>
      </div>

      <ReviewsManager initial={reviews} />
    </div>
  );
}
