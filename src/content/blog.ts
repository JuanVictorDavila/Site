export type ServicePath =
  | "/pericia-contabil"
  | "/auditoria"
  | "/pericia-grafotecnica"
  | "/pericia-documental"
  | "/pericia-digital";

export interface BlogSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  introduction: string;
  sections: BlogSection[];
  relatedService: {
    label: string;
    path: ServicePath;
  };
  additionalServicePaths?: ServicePath[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "quando-solicitar-pericia-contabil",
    category: "Perícia Contábil",
    title: "Quando solicitar uma perícia contábil?",
    description:
      "Entenda em quais situações a análise técnica contábil pode esclarecer valores, contratos, registros e divergências financeiras.",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-08",
    readingTime: "5 min de leitura",
    introduction:
      "A perícia contábil é útil quando uma controvérsia depende de cálculos, documentos financeiros ou da reconstrução de fatos registrados na contabilidade. O trabalho técnico não substitui a decisão jurídica ou administrativa: ele organiza evidências, explicita critérios e apresenta conclusões dentro dos limites do material examinado.",
    sections: [
      {
        title: "Situações em que a análise costuma ser necessária",
        paragraphs: [
          "A necessidade de perícia aparece quando as partes apresentam números diferentes, quando o método de cálculo é questionado ou quando os registros disponíveis precisam ser conciliados. O escopo deve nascer das perguntas que realmente precisam ser respondidas.",
        ],
        bullets: [
          "Apuração de haveres, lucros, prejuízos ou participações societárias.",
          "Revisão de contratos, financiamentos, encargos e evolução de saldos.",
          "Divergências em folhas de pagamento, comissões ou verbas trabalhistas.",
          "Investigação de inconsistências em registros contábeis e movimentações financeiras.",
          "Liquidação de sentença e atualização de valores conforme critérios definidos.",
        ],
      },
      {
        title: "Quais documentos ajudam a construir uma análise confiável?",
        paragraphs: [
          "A qualidade da conclusão depende da qualidade, da completude e da rastreabilidade dos documentos. Contratos, extratos, livros contábeis, notas fiscais, planilhas nativas e comprovantes podem ser relevantes, conforme o objeto da análise.",
          "Quando existem lacunas, versões conflitantes ou arquivos sem origem verificável, essas limitações precisam aparecer de forma clara no laudo ou parecer. Uma planilha isolada, por exemplo, pode apoiar uma conferência, mas não prova por si só a origem dos lançamentos.",
        ],
      },
      {
        title: "O que esperar do trabalho pericial",
        paragraphs: [
          "O profissional delimita o objeto, identifica as fontes utilizadas, descreve os procedimentos, demonstra os cálculos e responde aos quesitos de forma fundamentada. Dependendo do caso, também pode apontar documentos ausentes e sugerir diligências necessárias.",
          "Antes da contratação, vale reunir uma linha do tempo resumida, a questão central, os documentos já disponíveis e o resultado técnico que precisa ser esclarecido. Isso permite estimar escopo, prazo e esforço com mais precisão.",
        ],
      },
    ],
    relatedService: {
      label: "Conheça a atuação em Perícia Contábil",
      path: "/pericia-contabil",
    },
  },
  {
    slug: "diferenca-pericia-documental-grafotecnica",
    category: "Documentoscopia",
    title: "Perícia documental e grafotécnica: qual é a diferença?",
    description:
      "Veja o que cada exame investiga, quando eles podem ser complementares e por que o material original é importante.",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-08",
    readingTime: "6 min de leitura",
    introduction:
      "Embora sejam frequentemente mencionadas em conjunto, a perícia documental e a perícia grafotécnica têm objetos diferentes. Identificar corretamente a dúvida técnica evita pedidos genéricos e ajuda a definir quais materiais devem ser preservados e apresentados ao perito.",
    sections: [
      {
        title: "O que a perícia grafotécnica examina",
        paragraphs: [
          "A grafotécnica concentra-se na escrita. Em uma análise de assinatura ou texto manuscrito, o perito compara características do lançamento questionado com padrões atribuídos à pessoa examinada, considerando aspectos como movimento, ritmo, proporção, ataques e remates.",
          "A comparação exige padrões adequados em quantidade, qualidade e proximidade temporal. Uma imagem de baixa resolução ou poucos padrões podem limitar — e, em certas situações, impedir — uma conclusão tecnicamente segura.",
        ],
      },
      {
        title: "O que a perícia documental examina",
        paragraphs: [
          "A perícia documental, também chamada documentoscopia, investiga o documento como suporte de informação. O exame pode abranger impressão, papel, tintas, rasuras, montagens, substituições, elementos de segurança e compatibilidade entre os componentes observados.",
          "Em documentos digitais, a pergunta também pode exigir análise de arquivo, metadados e histórico de produção. Nesses casos, a documentoscopia pode se relacionar com procedimentos de perícia digital.",
        ],
      },
      {
        title: "Quando os dois exames trabalham juntos",
        paragraphs: [
          "Um contrato pode apresentar simultaneamente uma assinatura questionada e indícios de alteração no documento. A grafotécnica examina o gesto gráfico; a documentoscopia avalia o suporte e os demais elementos. As conclusões são complementares, mas não devem ser confundidas.",
        ],
        bullets: [
          "Preserve o documento original e evite novas anotações, grampos ou plastificação.",
          "Separe padrões de assinatura cuja autoria e data possam ser confirmadas.",
          "Mantenha arquivos digitais em seu formato nativo, com informações de origem.",
          "Informe exatamente o que está sendo contestado e em qual contexto.",
        ],
      },
    ],
    relatedService: {
      label: "Conheça a atuação em Perícia Documental",
      path: "/pericia-documental",
    },
    additionalServicePaths: ["/pericia-grafotecnica"],
  },
  {
    slug: "como-preservar-evidencias-digitais",
    category: "Perícia Digital",
    title: "Como preservar evidências digitais para uma análise técnica?",
    description:
      "Cuidados iniciais para reduzir alterações em celulares, computadores, e-mails, mensagens e arquivos que poderão ser examinados.",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-08",
    readingTime: "6 min de leitura",
    introduction:
      "Evidências digitais são sensíveis: abrir um arquivo, sincronizar uma conta ou continuar usando um dispositivo pode alterar informações relevantes. A preservação busca manter o material disponível, documentar sua origem e reduzir intervenções antes da coleta técnica.",
    sections: [
      {
        title: "Evite mudanças desnecessárias",
        paragraphs: [
          "Ao identificar um possível vestígio digital, não instale programas, não edite arquivos e não apague conversas. Também é importante evitar restaurações, atualizações e tentativas repetidas de acesso sem orientação, pois essas ações podem modificar registros do sistema.",
          "A conduta adequada varia conforme o tipo de dispositivo, o risco de perda remota e o contexto do caso. Por isso, medidas como desligar, isolar da rede ou manter o equipamento ligado devem ser avaliadas tecnicamente, e não aplicadas de forma automática.",
        ],
      },
      {
        title: "Documente a origem e a movimentação do material",
        paragraphs: [
          "Registre quem encontrou o material, onde ele estava, a data, o estado aparente e cada transferência de responsabilidade. Fotografias do contexto e recibos de entrega podem integrar essa documentação.",
          "Na coleta pericial, cópias técnicas e valores de hash ajudam a demonstrar a integridade do conjunto analisado. O hash é um mecanismo de verificação: ele indica se os dados comparados permaneceram iguais, mas não comprova sozinho autoria, autenticidade ou contexto.",
        ],
      },
      {
        title: "Capturas de tela são suficientes?",
        paragraphs: [
          "Capturas de tela podem registrar o que estava visível, porém normalmente não preservam todos os metadados, cabeçalhos e relações existentes na fonte. Sempre que possível, mantenha também os arquivos nativos, exportações completas e os dados da conta ou sistema de origem.",
        ],
        bullets: [
          "Guarde o arquivo original, sem renomear ou converter.",
          "Anote a origem, a data e o responsável por cada item.",
          "Preserve e-mails completos, incluindo cabeçalhos, quando disponíveis.",
          "Solicite orientação antes de manipular dispositivos bloqueados ou danificados.",
        ],
      },
      {
        title: "Planeje a coleta conforme a pergunta técnica",
        paragraphs: [
          "A coleta deve ser proporcional ao que precisa ser esclarecido. Delimitar contas, períodos, usuários, equipamentos e eventos reduz exposição desnecessária de dados e melhora a objetividade da análise. O plano também deve considerar autorização, privacidade e requisitos processuais aplicáveis ao caso.",
        ],
      },
    ],
    relatedService: {
      label: "Conheça a atuação em Perícia Digital",
      path: "/pericia-digital",
    },
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
