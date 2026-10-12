import { prisma } from "@/lib/db";

export type ReviewDTO = {
  id: string;
  name: string;
  brand: string | null;
  brandUrl: string | null;
  avatar: string | null;
  text: string;
  rating: number;
  isPublished?: boolean;
  sortOrder: number;
  createdAt?: Date;
};

export const DEFAULT_REVIEWS: ReviewDTO[] = [
  {
    id: "default-1",
    name: "Екатерина В.",
    brand: "Швейная мастерская Silk & Line",
    brandUrl: null,
    avatar: null,
    text: "Заказываем премиум-сатин и силиконовые размерники уже больше 2 лет. Качество печати безупречное — логотип не стирается даже после многочисленных стирок при 60 градусах. Отдельное спасибо за оперативность, отдают заказы ровно в срок!",
    rating: 5,
    isPublished: true,
    sortOrder: 1,
  },
  {
    id: "default-2",
    name: "Михаил С.",
    brand: "Бренд спортивной одежды UrbanMotion",
    brandUrl: null,
    avatar: null,
    text: "Силиконовые бирки для нашей коллекции худи — просто пушка! Мягкие, не колется тело, макет согласовали буквально за полчаса. Очень удобно, что минимальный тираж от 30 штук — идеальный вариант для теста новых моделей.",
    rating: 5,
    isPublished: true,
    sortOrder: 2,
  },
  {
    id: "default-3",
    name: "Анна К.",
    brand: "Дизайнер детской одежды LittleBear",
    brandUrl: null,
    avatar: null,
    text: "Искали гипоаллергенные составники для детских вещей. В БИРКИТУТ подсказали хлопковую ленту с тканым краем. Край аккуратный, швы тонкие, ткани приятные на ощупь. Присылают СДЭКом в регионы быстро и в надежной упаковке.",
    rating: 5,
    isPublished: true,
    sortOrder: 3,
  },
];

export async function getReviews(): Promise<ReviewDTO[]> {
  try {
    const reviews = await (prisma as any).review.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    if (!reviews || reviews.length === 0) return DEFAULT_REVIEWS;
    return reviews.map((r: any) => ({
      id: r.id,
      name: r.name,
      brand: r.brand ?? null,
      brandUrl: r.brandUrl ?? null,
      avatar: r.avatar ?? null,
      text: r.text,
      rating: r.rating ?? 5,
      isPublished: r.isPublished ?? true,
      sortOrder: r.sortOrder ?? 0,
      createdAt: r.createdAt,
    }));
  } catch {
    return DEFAULT_REVIEWS;
  }
}

export async function getAllReviewsForAdmin(): Promise<ReviewDTO[]> {
  try {
    const reviews = await (prisma as any).review.findMany({
      orderBy: [{ createdAt: "desc" }],
    });
    return reviews.map((r: any) => ({
      id: r.id,
      name: r.name,
      brand: r.brand ?? null,
      brandUrl: r.brandUrl ?? null,
      avatar: r.avatar ?? null,
      text: r.text,
      rating: r.rating ?? 5,
      isPublished: r.isPublished ?? false,
      sortOrder: r.sortOrder ?? 0,
      createdAt: r.createdAt,
    }));
  } catch {
    return [];
  }
}
