-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "material" TEXT,
ADD COLUMN     "printType" TEXT,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "clientNiche" TEXT;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "brandUrl" TEXT,
    "avatar" TEXT,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Review_sortOrder_idx" ON "Review"("sortOrder");

-- CreateIndex
CREATE INDEX "Review_isPublished_idx" ON "Review"("isPublished");
