"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { DuoProvider } from "@/lib/duo/store";
import { SplashWrapper } from "@/components/duo/SplashWrapper";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <DuoProvider>
        <SplashWrapper>{children}</SplashWrapper>
      </DuoProvider>
    </ClerkProvider>
  );
}
