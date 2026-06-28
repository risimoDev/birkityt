import { mkdir, writeFile, unlink } from "node:fs/promises";
import { join, resolve, basename } from "node:path";
import { randomBytes } from "node:crypto";
import sharp from "sharp";
import { env } from "@/lib/env";

export function uploadDir(): string {
  return resolve(process.cwd(), env.UPLOAD_DIR);
}

/** Process an uploaded image to web-optimised WebP and store it. */
export async function saveWorkImage(file: File): Promise<{ webpPath: string }> {
  const dir = uploadDir();
  await mkdir(dir, { recursive: true });

  const input = Buffer.from(await file.arrayBuffer());
  const id = `work_${Date.now()}_${randomBytes(4).toString("hex")}`;
  const filename = `${id}.webp`;

  const webp = await sharp(input)
    .rotate() // honour EXIF orientation
    .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  await writeFile(join(dir, filename), webp);
  return { webpPath: `/uploads/${filename}` };
}

/** Remove a stored upload by its public path (e.g. /uploads/x.webp). */
export async function deleteUpload(publicPath: string | null | undefined): Promise<void> {
  if (!publicPath || !publicPath.startsWith("/uploads/")) return;
  const name = basename(publicPath);
  try {
    await unlink(join(uploadDir(), name));
  } catch {
    /* already gone — ignore */
  }
}
