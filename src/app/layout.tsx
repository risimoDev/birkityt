import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "БИРКИТУТ — изготовление бирок для одежды на заказ",
  description:
    "Изготовление бирок для одежды на различных тканях и силиконе. Картонные бирки. Высокое качество и индивидуальный подход.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={manrope.className}>
      <body>{children}</body>
    </html>
  );
}
