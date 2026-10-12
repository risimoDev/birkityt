import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "БИРКИТУТ — изготовление бирок для одежды на заказ",
  description:
    "Изготовление бирок для одежды на различных тканях и силиконе. Картонные бирки. Высокое качество и индивидуальный подход.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="font-sans">{children}</body>
    </html>
  );
}
