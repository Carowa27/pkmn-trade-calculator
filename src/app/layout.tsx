import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalValueProvider } from "@/components/GlobalValueProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mad's Trade Calculator",
  description: "Calc for making trades easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalValueProvider>{children}</GlobalValueProvider>
      </body>
    </html>
  );
}
