import { Link } from "@tanstack/react-router";

import { PericialNav } from "./pericial-nav";

const WHATSAPP_NUMBER = "5592981680207";

export type PericialService = {
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  introduction: string;
  services: string[];
  indications: string[];
  whatsappMessage: string;
};

// The routes import this static catalog so each URL can select exactly one service.
// eslint-disable-next-line react-refresh/only-export-components
export const pericialServices = {
  contabil: {
    code: "CASE_TYPE: ACCOUNTING",
    title: "Perícia Contábil",
    shortTitle: "Contábil",
    description:
      "Apuração de haveres, cálculos judiciais complexos e análise econômico-financeira para demandas judiciais e extrajudiciais.",
    introduction:
      "A perícia contábil transforma registros financeiros, contratos e demonstrações em conclusões técnicas verificáveis. O trabalho é planejado conforme a controvérsia, os quesitos e a documentação disponível.",
    services: [
      "Cálculos de liquidação de sentença",
      "Apuração de haveres e dissolução societária",
      "Arbitramento de perdas e danos",
      "Revisão de contratos, encargos e movimentações financeiras",
      "Assistência técnica e elaboração de quesitos",
      "Parecer contábil para negociação extrajudicial",
    ],
    indications: [
      "Divergência sobre valores, saldos ou critérios de cálculo",
      "Discussões societárias, partilhas e prestação de contas",
      "Necessidade de quantificar prejuízos ou obrigações",
      "Apoio técnico em processo judicial ou arbitral",
    ],
    whatsappMessage: "Olá, gostaria de solicitar uma análise para Perícia Contábil.",
  },
  auditoria: {
    code: "CASE_TYPE: AUDIT",
    title: "Auditoria Especial",
    shortTitle: "Auditoria",
    description:
      "Auditoria preventiva e investigativa de fluxos financeiros, estoques, controles internos e processos empresariais.",
    introduction:
      "A auditoria especial é direcionada a uma dúvida, risco ou ocorrência concreta. O objetivo é reconstruir fatos, testar controles e apresentar achados sustentados pela documentação examinada.",
    services: [
      "Auditoria de fraudes, desvios e irregularidades",
      "Due diligence financeira e contábil",
      "Análise de controles internos e segregação de funções",
      "Revisão de fluxos de caixa, estoques e pagamentos",
      "Cruzamento de bases e identificação de exceções",
      "Relatórios técnicos para administração, conselhos e assessoria jurídica",
    ],
    indications: [
      "Suspeita de fraude, desvio ou conflito de interesses",
      "Diferenças recorrentes em caixa, estoque ou faturamento",
      "Avaliação prévia a aquisição, sociedade ou investimento",
      "Necessidade de fortalecer controles e rastreabilidade",
    ],
    whatsappMessage: "Olá, gostaria de solicitar uma análise para Auditoria Especial.",
  },
  grafotecnica: {
    code: "CASE_TYPE: HANDWRITING",
    title: "Perícia Grafotécnica",
    shortTitle: "Grafotécnica",
    description:
      "Exame técnico de assinaturas e escritas manuscritas para avaliar compatibilidade gráfica e responder aos quesitos do caso.",
    introduction:
      "O exame grafotécnico compara características da escrita questionada com padrões adequados de confronto. A conclusão depende da qualidade, quantidade e contemporaneidade do material disponível.",
    services: [
      "Exame de autenticidade de assinaturas e manuscritos",
      "Análise de contratos, cheques, procurações e títulos",
      "Seleção e avaliação de padrões de confronto",
      "Coleta técnica de padrões gráficos quando aplicável",
      "Assistência técnica, quesitos e manifestação sobre laudo",
      "Parecer para mediação ou solução extrajudicial",
    ],
    indications: [
      "Assinatura impugnada ou desconhecida pela parte",
      "Divergência sobre autoria de preenchimentos manuscritos",
      "Documento com assinaturas de períodos ou origens diferentes",
      "Necessidade de avaliação técnica antes de ajuizar uma demanda",
    ],
    whatsappMessage: "Olá, gostaria de solicitar uma análise para Perícia Grafotécnica.",
  },
  documental: {
    code: "CASE_TYPE: DOCUMENTS",
    title: "Perícia Documental",
    shortTitle: "Documental",
    description:
      "Análise da materialidade de documentos para investigar rasuras, acréscimos, supressões e outras alterações relevantes.",
    introduction:
      "A perícia documental examina os elementos físicos e reprodutivos do documento. O método e o alcance variam conforme o material seja original, cópia, arquivo digitalizado ou documento antigo.",
    services: [
      "Detecção de rasuras, supressões e acréscimos",
      "Exame de originais, cópias e documentos antigos",
      "Análise de contratos, recibos e comprovantes",
      "Comparação de impressão, papel, tinta e elementos gráficos",
      "Avaliação de montagem, substituição ou sobreposição",
      "Laudo ou parecer para demanda judicial e extrajudicial",
    ],
    indications: [
      "Suspeita de alteração posterior à assinatura",
      "Divergência entre vias ou versões do mesmo documento",
      "Questionamento sobre rasura, preenchimento ou montagem",
      "Necessidade de documentar tecnicamente uma irregularidade",
    ],
    whatsappMessage: "Olá, gostaria de solicitar uma análise para Perícia Documental.",
  },
  digital: {
    code: "CASE_TYPE: FORENSIC_DIGITAL",
    title: "Perícia Digital",
    shortTitle: "Digital",
    description:
      "Preservação, recuperação e análise de evidências em dispositivos, arquivos, mensagens, sistemas e ambientes digitais.",
    introduction:
      "A perícia digital busca preservar a integridade dos dados e tornar o exame reproduzível. O escopo é definido conforme as fontes disponíveis, os quesitos e os limites técnicos e jurídicos do caso.",
    services: [
      "Aquisição e análise de dispositivos e mídias",
      "Recuperação de arquivos e exame de metadados",
      "Análise de e-mails, mensagens e armazenamento em nuvem",
      "Exame de logs, sistemas empresariais e bancos de dados",
      "Preservação de conteúdo digital e cadeia de custódia",
      "Rastreamento e análise técnica de transações digitais",
    ],
    indications: [
      "Exclusão, alteração ou desaparecimento de dados",
      "Controvérsia envolvendo mensagens, arquivos ou acessos",
      "Incidente em sistema, conta, equipamento ou ambiente em nuvem",
      "Necessidade de preservar evidência antes que ela seja perdida",
    ],
    whatsappMessage: "Olá, gostaria de solicitar uma análise para Perícia Digital.",
  },
} satisfies Record<string, PericialService>;

export function PericialServicePage({ service }: { service: PericialService }) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(service.whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/10 selection:text-accent">
      <PericialNav />

      <main>
        <header className="px-6 py-24 md:py-32 border-b border-border">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] gap-16 items-end">
            <div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-[0.25em] block mb-7">
                {service.code}
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.94] mb-8">
                {service.title}
              </h1>
              <p className="max-w-[60ch] text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
            <div className="border border-border p-7">
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-4">
                Atendimento direcionado
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Fale diretamente sobre esta categoria. A mensagem já será identificada como uma
                solicitação de {service.title.toLowerCase()}.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center w-full px-6 py-3 bg-[#25D366] text-white text-xs font-mono uppercase tracking-widest hover:brightness-110 transition-all"
              >
                Solicitar análise
              </a>
            </div>
          </div>
        </header>

        <section className="px-6 py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-4">
                01 — Visão geral
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
                Exame técnico orientado ao problema do caso.
              </h2>
              <p className="text-muted-foreground leading-relaxed">{service.introduction}</p>
            </div>
            <div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-4">
                Quando procurar
              </span>
              <ul className="border border-border divide-y divide-border">
                {service.indications.map((item) => (
                  <li key={item} className="p-4 flex gap-3 text-sm text-muted-foreground">
                    <span className="text-accent">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 border-y border-border bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-4">
              02 — Escopo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12">
              O trabalho pode abranger
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {service.services.map((item, index) => (
                <div key={item} className="bg-background p-6 min-h-32">
                  <span className="font-mono text-[10px] text-accent block mb-4">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-4">
              03 — Solicitação
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              Precisa de {service.title.toLowerCase()}?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-9">
              Envie uma descrição inicial do caso. A documentação e o objetivo do exame serão
              avaliados antes da definição do escopo técnico.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center px-8 py-4 bg-[#25D366] text-white font-bold hover:brightness-110 transition-all"
            >
              Falar sobre {service.shortTitle}
            </a>
          </div>
        </section>
      </main>

      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <span>Vértice Perícia</span>
          <Link to="/" className="hover:text-accent transition-colors">
            Ver todas as especialidades
          </Link>
        </div>
      </footer>
    </div>
  );
}
