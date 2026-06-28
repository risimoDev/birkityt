import { prisma } from "@/lib/db";
import { cache } from "react";

export type ContentMap = Record<string, string>;

/**
 * Loads all content key/values once per request (deduped via React cache).
 * Returns a plain map; use `pick` for safe access with a fallback.
 */
export const getContent = cache(async (): Promise<ContentMap> => {
  try {
    const rows = await prisma.content.findMany();
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch {
    return {};
  }
});

export function pick(map: ContentMap, key: string, fallback = ""): string {
  const v = map[key];
  return v === undefined || v === "" ? fallback : v;
}
