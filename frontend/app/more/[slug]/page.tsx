"use client";
import Link from "next/link";

import { useParams, notFound } from "next/navigation";


import { AppShell, PageHeader } from "@/components/duo/AppShell";
import { Mascot } from "@/components/duo/Mascot";
import { MORE_PAGES } from "@/lib/duo/data";



function MorePage() {
  const { slug } = useParams() as { slug: string };
  const page = MORE_PAGES[slug as keyof typeof MORE_PAGES];

  if (!page) {
    notFound();
  }

  return (
    <AppShell>
      <PageHeader title={page.title} />
      <article className="max-w-2xl space-y-4 text-lg text-muted-foreground">
        {page.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
      <div className="mt-8 flex flex-wrap gap-2">
        {Object.entries(MORE_PAGES).map(([slug, p]) => (
          <Link
            key={slug}
            href={`/more/${slug}`}
            className="rounded-xl border-2 border-border px-3 py-2 text-sm font-extrabold uppercase text-muted-foreground hover:bg-muted"
          >
            {p.title}
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Mascot state="idle" size={120} />
      </div>
    </AppShell>
  );
}

export default MorePage;
