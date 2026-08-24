import type { Metadata } from "next";

/**
 * Admin is disallowed in robots.txt, but that only asks crawlers not to fetch
 * the pages — a URL discovered elsewhere can still be indexed. `noindex`
 * settles it, and applies to the login page too.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
