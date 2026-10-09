import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Copy, Rss } from "lucide-react";
import { useState } from "react";

import { PericialNav } from "../components/pericial-nav";
import { SiteFooter } from "../components/site-footer";
import { SITE_URL, breadcrumbSchema, pageHead } from "../lib/seo";

const FEED_URL = `${SITE_URL}/rss.xml`;

export const Route = createFileRoute("/assinar-rss")({
  head: () =>
    pageHead({
      title: "Assine o RSS do Blog | Vértice Perícia",
      description:
        "Copie o endereço do feed RSS da Vértice e acompanhe novos artigos sobre perícia, auditoria e evidências digitais.",
      path: "/assinar-rss",
      schemas: [
        breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: "Assinar RSS", path: "/assinar-rss" },
        ]),
      ],
    }),
  component: RssSubscriptionPage,
});

function RssSubscriptionPage() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const copyFeedUrl = async () => {
    try {
      await navigator.clipboard.writeText(FEED_URL);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/10 selection:text-accent">
      <PericialNav />

      <main id="conteudo-principal" tabIndex={-1} className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex h-12 w-12 items-center justify-center border border-accent text-accent">
            <Rss className="h-5 w-5" aria-hidden="true" />
          </div>

          <span className="mb-5 block font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Atualizações do blog
          </span>
          <h1 className="mb-7 max-w-3xl text-4xl font-extrabold tracking-tighter text-balance md:text-6xl">
            Assine o feed RSS da Vértice
          </h1>
          <p className="max-w-[68ch] text-lg leading-relaxed text-muted-foreground">
            O RSS permite acompanhar novos artigos em um aplicativo leitor de feeds, sem depender de
            redes sociais ou mensagens promocionais.
          </p>

          <section
            className="mt-12 border border-border p-6 md:p-8"
            aria-labelledby="endereco-feed"
          >
            <h2 id="endereco-feed" className="mb-4 text-2xl font-bold tracking-tight">
              Endereço do feed
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Copie o endereço abaixo e adicione-o ao Feedly, Inoreader, Thunderbird ou outro leitor
              compatível com RSS.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={FEED_URL}
                readOnly
                aria-label="Endereço do feed RSS"
                onFocus={(event) => event.currentTarget.select()}
                className="min-h-12 min-w-0 flex-1 border border-border bg-muted/20 px-4 font-mono text-xs text-foreground outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={copyFeedUrl}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-foreground px-6 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-background hover:bg-accent"
              >
                {copyStatus === "copied" ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copyStatus === "copied" ? "Endereço copiado" : "Copiar endereço"}
              </button>
            </div>

            <p className="mt-4 min-h-5 text-sm text-muted-foreground" aria-live="polite">
              {copyStatus === "copied" ? "Agora cole o endereço no seu leitor de RSS." : null}
              {copyStatus === "error"
                ? "Não foi possível copiar automaticamente. Selecione o endereço e copie manualmente."
                : null}
            </p>
          </section>

          <section className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
            {[
              ["01", "Copie", "Use o botão acima para copiar o endereço do feed."],
              ["02", "Adicione", "Abra seu leitor RSS e escolha adicionar uma nova fonte."],
              ["03", "Acompanhe", "Os novos artigos aparecerão automaticamente no leitor."],
            ].map(([number, title, description]) => (
              <div key={number} className="bg-background p-6">
                <span className="font-mono text-[10px] text-accent">{number}</span>
                <h2 className="my-3 text-lg font-bold">{title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </section>

          <Link
            to="/blog"
            className="mt-10 inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-accent"
          >
            ← Voltar ao blog
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
