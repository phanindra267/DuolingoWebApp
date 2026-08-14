"use client";

import { useState } from "react";

import { AppShell, Modal, PageHeader } from "@/components/duo/AppShell";
import { Btn } from "@/components/duo/Btn";
import { Confetti, Mascot } from "@/components/duo/Mascot";
import { SHOP_ITEMS } from "@/lib/duo/data";
import { MAX_HEARTS, useDuo } from "@/lib/duo/store";



function ShopPage() {
  const { state, set, spendGems } = useDuo();
  const [result, setResult] = useState<string | null>(null);

  const buy = (id: string, price: number, title: string) => {
    if (id === "heart-refill" && state.hearts >= MAX_HEARTS) {
      setResult("Your hearts are already full!");
      return;
    }
    if (!spendGems(price)) {
      setResult("Not enough gems. Complete a lesson or open a chest to earn more.");
      return;
    }
    if (id === "heart-refill") set({ hearts: MAX_HEARTS });
    if (id === "streak-freeze") set({ streak: state.streak + 1 });
    setResult(`${title} purchased!`);
  };

  return (
    <AppShell>
      <PageHeader title="Shop" emoji="🛍️" subtitle={`You have ${state.gems} gems`} />

      <section className="mb-8 flex items-center gap-4 rounded-3xl border-2 border-duo-red p-5">
        <span className="text-5xl">❤️</span>
        <div className="flex-1">
          <h2 className="text-xl font-extrabold">Hearts</h2>
          <p className="text-sm text-muted-foreground">
            {state.hearts} / {MAX_HEARTS} hearts remaining
          </p>
        </div>
        <Btn tone="red" onClick={() => buy("heart-refill", 350, "Heart Refill")}>
          Refill · 350 💎
        </Btn>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {SHOP_ITEMS.map((item) => (
          <article key={item.id} className="flex flex-col rounded-3xl border-2 border-border p-5">
            <div className="anim-bob text-5xl">{item.emoji}</div>
            <h3 className="mt-2 font-display text-xl font-extrabold">{item.title}</h3>
            <p className="mb-4 flex-1 text-sm text-muted-foreground">{item.desc}</p>
            <Btn tone="blue" onClick={() => buy(item.id, item.price, item.title)}>
              {item.price} 💎
            </Btn>
          </article>
        ))}
      </div>

      <Modal open={!!result} onClose={() => setResult(null)} title="Shop">
        <div className="relative">
          {result?.includes("purchased") && <Confetti count={24} />}
          <Mascot state={result?.includes("purchased") ? "celebrate" : "sad"} size={120} className="mx-auto" />
          <p className="mt-2 text-lg font-extrabold">{result}</p>
          <Btn className="mt-4 w-full" onClick={() => setResult(null)}>
            Ok
          </Btn>
        </div>
      </Modal>
    </AppShell>
  );
}

export default ShopPage;
