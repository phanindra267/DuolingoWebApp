import { ClerkProvider } from "@/components/clerk-mock";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { DuoProvider } from "@/lib/duo/store";
import { SplashWrapper } from "@/components/duo/SplashWrapper";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Duolingo — Learn a language for free",
  description: "Learn a language for free. Forever. Join over 500 million learners worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased`}>
        <ClerkProvider>
          <DuoProvider>
            <SplashWrapper>
              {children}
            </SplashWrapper>
          </DuoProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}