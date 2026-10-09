import { createFileRoute, Link } from "@tanstack/react-router";

import { SoftwareForm } from "../components/software-form";
import { SiteFooter } from "../components/site-footer";
import { breadcrumbSchema, pageHead, serviceSchema } from "../lib/seo";

export const Route = createFileRoute("/desenvolvimento")({
  head: () =>
    pageHead({
      title: "Desenvolvimento de Software sob Medida | Vértice",
      description:
        "Desenvolvimento de sistemas web, automações, integrações, portais e micro-SaaS sob medida para processos reais da sua empresa.",
      path: "/desenvolvimento",
      schemas: [
        serviceSchema({
          name: "Desenvolvimento de software sob medida",
          description:
            "Sistemas web, automações, integrações, portais e micro-SaaS desenvolvidos sob medida.",
          path: "/desenvolvimento",
        }),
        breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Desenvolvimento de software", path: "/desenvolvimento" },
        ]),
      ],
    }),
  component: DevelopmentPage,
});

const services = [
  {
    code: "MODULE: MICRO_SAAS",
    id: "sistemas",
    title: "Sistemas sob medida",
    description:
      "Aplicações web para transformar planilhas, controles dispersos e tarefas manuais em um fluxo único.",
    items: [
      "Estoque, ordens de serviço e agendamentos",
      "Áreas de cliente com documentos e histórico",
      "Cálculo, cotação e precificação",
      "Painéis administrativos com níveis de acesso",
    ],
  },
  {
    code: "MODULE: AUTOMATION",
    id: "automacoes",
    title: "Automação e integrações",
    description:
      "Robôs e integrações que conectam seus sistemas e reduzem a digitação, o retrabalho e os erros.",
    items: [
      "Integração de ERPs, CRMs, planilhas e APIs",
      "Leitura de documentos e extração de dados",
      "Rotinas agendadas, alertas e relatórios",
      "Sincronização segura entre plataformas",
    ],
  },
  {
    code: "MODULE: WEB_APPS",
    id: "web-apps",
    title: "Web apps e portais",
    description:
      "Sites, portais e aplicações rápidas, responsivas e orientadas à experiência de quem usa.",
    items: [
      "Sites institucionais e landing pages",
      "Formulários e fluxos de captação",
      "Portais com login e área de documentos",
      "Painéis de indicadores e relatórios",
    ],
  },
];

const process = [
  ["01", "Descoberta", "Entendemos o problema, as pessoas, os dados e o resultado esperado."],
  ["02", "Protótipo", "Validamos telas e fluxos antes de investir no desenvolvimento completo."],
  [
    "03",
    "Construção",
    "Entregamos em ciclos curtos, com versões parciais que já podem ser testadas.",
  ],
  ["04", "Sustentação", "Acompanhamos a entrada em uso, corrigimos e evoluímos a solução."],
];

function DevelopmentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/10 selection:text-accent">
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8 min-w-0">
            <Link
              to="/"
              className="font-mono text-sm tracking-tighter font-bold uppercase whitespace-nowrap"
            >
              Vértice
            </Link>
            <div className="hidden md:flex gap-6 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              <a href="#servicos" className="hover:text-accent transition-colors">
                Soluções
              </a>
              <a href="#processo" className="hover:text-accent transition-colors">
                Processo
              </a>
              <Link to="/" className="hover:text-accent transition-colors">
                Perícia e Auditoria
              </Link>
              <Link to="/blog" className="hover:text-accent transition-colors">
                Blog
              </Link>
            </div>
          </div>
          <a
            href="#briefing"
            className="bg-foreground text-background text-[11px] font-mono uppercase tracking-widest px-5 py-2 hover:bg-accent transition-colors whitespace-nowrap"
          >
            Solicitar projeto
          </a>
        </div>
      </nav>

      <header className="relative px-6 py-24 md:py-32 border-b border-border overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] gap-16 items-end">
          <div className="animate-entry">
            <span className="inline-block font-mono text-[10px] text-accent uppercase tracking-[0.25em] border border-accent/20 px-3 py-2 mb-8">
              Vértice Desenvolvimento
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.92] text-balance mb-8">
              Software criado para o seu <span className="text-accent">processo real.</span>
            </h1>
            <p className="max-w-[58ch] text-lg text-muted-foreground leading-relaxed mb-10">
              Projetamos sistemas, automações e produtos digitais sob medida para resolver gargalos,
              integrar informações e dar escala à sua operação.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#briefing"
                className="px-7 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors"
              >
                Solicitar uma proposta
              </a>
              <a
                href="#servicos"
                className="px-7 py-4 border border-border font-mono text-xs uppercase tracking-widest hover:border-accent transition-colors"
              >
                Conhecer soluções
              </a>
            </div>
          </div>

          <aside className="border border-border bg-background/80 p-7 animate-entry [animation-delay:200ms]">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-6">
              Como trabalhamos
            </span>
            <div className="space-y-5 text-sm">
              <p>
                <strong className="block mb-1">Escopo transparente</strong>
                <span className="text-muted-foreground">
                  Você sabe o que será entregue em cada etapa.
                </span>
              </p>
              <p>
                <strong className="block mb-1">Validação contínua</strong>
                <span className="text-muted-foreground">
                  O produto evolui com retorno de quem realmente vai usá-lo.
                </span>
              </p>
              <p>
                <strong className="block mb-1">Tecnologia proporcional</strong>
                <span className="text-muted-foreground">
                  Arquitetura adequada ao problema, ao orçamento e à escala.
                </span>
              </p>
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section id="servicos" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
              <div>
                <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 block">
                  01 — Soluções
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                  O que podemos construir.
                </h2>
              </div>
              <p className="max-w-[44ch] text-sm text-muted-foreground">
                Da automação de uma rotina específica a uma plataforma completa para clientes e
                equipe.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service) => (
                <article
                  key={service.id}
                  id={service.id}
                  className="border border-border p-8 flex flex-col hover:border-accent/50 transition-colors"
                >
                  <span className="font-mono text-xs text-accent mb-6">{service.code}</span>
                  <h3 className="text-2xl font-bold tracking-tight mb-4">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-7">
                    {service.description}
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground mb-8 flex-1">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-accent">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#briefing"
                    className="inline-flex justify-center px-6 py-3 bg-foreground text-background text-xs font-mono uppercase tracking-widest hover:bg-accent transition-colors"
                  >
                    Solicitar proposta
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="processo" className="py-24 px-6 border-y border-border bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 block">
              02 — Processo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-14">
              Do problema à solução em produção.
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
              {process.map(([number, title, description]) => (
                <article key={number} className="bg-background p-7">
                  <span className="font-mono text-xs text-accent block mb-5">ETAPA {number}</span>
                  <h3 className="text-lg font-bold mb-3">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="briefing" className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_500px] gap-16 items-start">
            <div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 block">
                03 — Briefing
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                Conte o que precisa ser construído.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-9 max-w-[56ch]">
                O formulário organiza as informações iniciais e abre uma conversa no WhatsApp. A
                partir daí, avaliamos viabilidade, etapas, prazo e investimento.
              </p>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Descreva o problema atual e quem usará a solução.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Informe sistemas envolvidos: ERP, planilhas, e-mail e APIs.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Se possível, indique exemplos, prazo e faixa de investimento.</span>
                </li>
              </ul>
            </div>
            <div className="border border-border p-7 md:p-8">
              <SoftwareForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
