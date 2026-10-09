import type { ReactNode } from "react";

import { PericialNav } from "./pericial-nav";
import { SiteFooter } from "./site-footer";

export function InstitutionalPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/10 selection:text-accent">
      <PericialNav />
      <main id="conteudo-principal" tabIndex={-1}>
        <header className="px-6 py-20 md:py-28 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[10px] text-accent uppercase tracking-[0.25em] block mb-6">
              {eyebrow}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-7">{title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-[70ch]">
              {description}
            </p>
          </div>
        </header>
        <div className="px-6 py-16 md:py-20">
          <article className="max-w-4xl mx-auto space-y-12 text-muted-foreground leading-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mb-4 [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2 [&_li]:ml-5 [&_li]:list-disc [&_a]:text-accent [&_a]:underline-offset-4 hover:[&_a]:underline">
            {children}
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
