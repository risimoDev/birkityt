import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import type { ReadableOptions } from "node:stream";
import { uploadDir } from "@/lib/uploads";

export const dynamic = "force-dynamic";

const TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  // No SVG on purpose: it can carry scripts, and it would be served from the
  // site's own origin. saveWorkImage() re-encodes every upload to WebP, so
  // nothing here should ever be an SVG anyway.
};

function nodeStreamToWeb(stream: NodeJS.ReadableStream) {
  return new ReadableStream({
    start(controller) {
      stream.on("data", (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
      stream.on("end", () => controller.close());
      stream.on("error", (err) => controller.error(err));
    },
  });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  // Only allow a flat filename — defend against path traversal.
  const name = basename((path ?? []).join("/"));
  if (!name || name.includes("..")) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = join(uploadDir(), name);
  try {
    const info = await stat(filePath);
    if (!info.isFile()) return new Response("Not found", { status: 404 });
    const type = TYPES[extname(name).toLowerCase()] ?? "application/octet-stream";
    const opts: ReadableOptions = {};
    const stream = createReadStream(filePath, opts);
    return new Response(nodeStreamToWeb(stream), {
      headers: {
        "Content-Type": type,
        // Never let a browser guess a different, executable type.
        "X-Content-Type-Options": "nosniff",
        "Content-Length": String(info.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
