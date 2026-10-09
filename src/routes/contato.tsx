import { createFileRoute } from "@tanstack/react-router";

import { PericialNav } from "../components/pericial-nav";
import { RequestForm, type RequestKind } from "../components/request-form";
import { SiteFooter } from "../components/site-footer";
import { SITE_URL, breadcrumbSchema, organizationSchema, pageHead } from "../lib/seo";

export const Route = createFileRoute("/contato")({
  head: () =>
    pageHead({
      title: "Contato e Solicitação de Serviços | Vértice Perícia",
      description:
        "Solicite perícia contábil, digital, documental, grafotécnica, auditoria ou desenvolvimento de software por um formulário direcionado.",
      path: "/contato",
      schemas: [
        organizationSchema(),
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contato e solicitação de serviços",
          url: `${SITE_URL}/contato`,
          description:
            "Formulários para solicitar perícias, auditoria e desenvolvimento de software.",
        },
        breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ]),
      ],
    }),
  component: ContactPage,
});

const choices: Array<{
  id: RequestKind;
  eyebrow: string;
  title: string;
  description: string;
}> = [
  {
    id: "pericia",
    eyebrow: "01 — Perícias",
    title: "Perícia técnica",
    description:
      "Para perícia contábil, grafotécnica, documental ou digital, judicial ou extrajudicial.",
  },
  {
    id: "auditoria",
    eyebrow: "02 — Auditoria",
    title: "Auditoria especial",
    description:
      "Para apuração direcionada, controles internos, due diligence e investigação de inconsistências.",
  },
  {
    id: "desenvolvimento",
    eyebrow: "03 — Software",
    title: "Desenvolvimento",
    description:
      "Para sistemas web, automações, integrações, portais e produtos digitais sob medida.",
  },
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10 selection:text-accent">
      <PericialNav />
      <main id="conteudo-principal" tabIndex={-1}>
        <header className="border-b border-border px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                Atendimento direcionado
              </span>
              <h1 className="mb-7 max-w-[15ch] text-5xl font-extrabold leading-[0.94] tracking-tighter text-balance md:text-7xl">
                Conte o que você precisa analisar ou construir.
              </h1>
              <p className="max-w-[68ch] text-lg leading-relaxed text-muted-foreground">
                Escolha a área correta para que as informações cheguem organizadas à equipe
                responsável. O envio inicia uma triagem e não representa aceite automático do
                trabalho ou conclusão sobre o caso.
              </p>
            </div>
            <address className="border border-border p-7 not-italic">
              <span className="mb-4 block font-mono text-[10px] uppercase tracking-widest text-accent">
                Canais diretos
              </span>
              <a
                href="mailto:vertice.pericias@gmail.com"
                data-analytics-source="contato:header"
                className="block break-all text-sm font-semibold hover:text-accent"
              >
                vertice.pericias@gmail.com
              </a>
              <a
                href="tel:+5592981680207"
                data-analytics-source="contato:header"
                className="mt-3 block text-sm font-semibold hover:text-accent"
              >
                +55 92 98168-0207
              </a>
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                Atendimento inicial remoto. A viabilidade e os meios de execução são avaliados
                conforme a natureza da demanda.
              </p>
            </address>
          </div>
        </header>

        <nav aria-label="Tipos de solicitação" className="border-b border-border px-6 py-8">
          <div className="mx-auto grid max-w-7xl gap-px border border-border bg-border md:grid-cols-3">
            {choices.map((choice) => (
              <a
                key={choice.id}
                href={`#${choice.id}`}
                className="group bg-background p-6 transition-colors hover:bg-muted/40"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  {choice.eyebrow}
                </span>
                <strong className="mt-3 block text-xl tracking-tight group-hover:text-accent">
                  {choice.title}
                </strong>
                <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">
                  {choice.description}
                </span>
              </a>
            ))}
          </div>
        </nav>

        <div className="divide-y divide-border">
          {choices.map((choice) => (
            <section key={choice.id} id={choice.id} className="px-6 py-20 md:py-24">
              <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <div>
                  <span className="mb-4 block font-mono text-[10px] uppercase tracking-widest text-accent">
                    {choice.eyebrow}
                  </span>
                  <h2 className="mb-5 text-3xl font-extrabold tracking-tighter md:text-5xl">
                    {choice.title}
                  </h2>
                  <p className="max-w-[48ch] leading-relaxed text-muted-foreground">
                    {choice.description} Preencha somente as informações iniciais. Documentos e
                    dados sensíveis serão solicitados por canal apropriado, se necessários.
                  </p>
                </div>
                <div className="border border-border bg-background p-6 md:p-8">
                  <RequestForm kind={choice.id} />
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
