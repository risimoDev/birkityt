import type { Metadata } from "next";
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
