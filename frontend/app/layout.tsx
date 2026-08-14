import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { DuoProvider } from "@/lib/duo/store";

export const metadata: Metadata = {
  title: "Lingua",
  description: "Learn languages the gamified way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased`}>
        <DuoProvider>
          {children}
        </DuoProvider>
      </body>
    </html>
  );
}
