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
  seoTitle?: string;
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
    slug: "documentos-necessarios-pericia-contabil",
    category: "Perícia Contábil",
    title: "Quais documentos são necessários para uma perícia contábil?",
    seoTitle: "Documentos para Perícia Contábil | Vértice",
    description:
      "Veja como organizar contratos, extratos, livros, planilhas e comprovantes para tornar a análise contábil mais objetiva e verificável.",
    publishedAt: "2026-10-09",
    updatedAt: "2026-10-09",
    readingTime: "7 min de leitura",
    introduction:
      "Não existe uma lista universal de documentos para toda perícia contábil. O conjunto adequado depende da pergunta técnica, do período examinado e da forma como os fatos foram registrados. Ainda assim, organizar as fontes por categoria ajuda a definir o escopo e a identificar lacunas antes do início dos cálculos.",
    sections: [
      {
        title: "Comece pela controvérsia e pelo período",
        paragraphs: [
          "Antes de reunir arquivos, formule com clareza o que precisa ser apurado: saldo de contrato, haveres societários, prejuízo, prestação de contas, verbas trabalhistas ou outro objeto. A pergunta determina quais registros têm relação com o caso.",
          "Também é importante delimitar datas. Um período excessivamente amplo aumenta custo e tempo sem necessariamente melhorar a resposta. Quando há processo judicial, petições, decisões, quesitos e demonstrativos apresentados pelas partes ajudam a compreender os critérios em discussão.",
        ],
      },
      {
        title: "Documentos financeiros e contábeis mais frequentes",
        paragraphs: [
          "Contratos e aditivos mostram obrigações e critérios pactuados. Extratos, comprovantes e documentos fiscais ajudam a verificar a movimentação efetiva. Livros e demonstrações contábeis permitem relacionar os fatos aos registros da entidade.",
        ],
        bullets: [
          "Contratos, aditivos, termos de rescisão e comunicações relacionadas.",
          "Extratos bancários completos e comprovantes de pagamento ou recebimento.",
          "Balancetes, razão, diário, demonstrações e planos de contas.",
          "Notas fiscais, folhas de pagamento, recibos e relatórios operacionais.",
          "Planilhas nativas com fórmulas, bases de dados e memória dos cálculos.",
        ],
      },
      {
        title: "Preserve origem, formato e contexto",
        paragraphs: [
          "Sempre que possível, mantenha os arquivos em formato nativo. Converter uma planilha em PDF, por exemplo, elimina fórmulas, vínculos e propriedades que podem ser importantes. Cópias digitalizadas devem ser relacionadas ao documento de origem e identificadas por data e responsável.",
          "Uma planilha produzida por uma das partes pode ser útil, mas não deve ser tratada automaticamente como registro independente. O perito precisa compreender quem a elaborou, quais fontes foram utilizadas e se os resultados podem ser reproduzidos.",
        ],
      },
      {
        title: "Como preparar a entrega ao profissional",
        paragraphs: [
          "Organize os arquivos por assunto e período, evite nomes genéricos e prepare uma relação descritiva. Informe quais documentos não foram localizados e quais dependem de terceiros. Essa transparência permite avaliar limitações e diligências necessárias.",
          "O envio inicial não precisa conter todo o acervo. Uma conversa de escopo pode indicar uma amostra ou relação mínima para estimar o trabalho, preservando informações sensíveis até a definição de um canal apropriado.",
        ],
      },
    ],
    relatedService: {
      label: "Solicite uma avaliação de Perícia Contábil",
      path: "/pericia-contabil",
    },
  },
  {
    slug: "auditoria-ou-pericia-contabil-entenda-diferencas",
    category: "Auditoria",
    title: "Auditoria ou perícia contábil: qual serviço contratar?",
    seoTitle: "Auditoria ou Perícia Contábil? | Vértice",
    description:
      "Compare objetivos, escopo e entregas de auditoria e perícia contábil para direcionar corretamente uma investigação ou controvérsia.",
    publishedAt: "2026-10-09",
    updatedAt: "2026-10-09",
    readingTime: "6 min de leitura",
    introduction:
      "Auditoria e perícia contábil utilizam documentos, testes e análise profissional, mas respondem a necessidades diferentes. A escolha deve considerar a pergunta central, o destinatário do trabalho e o tipo de conclusão esperado.",
    sections: [
      {
        title: "A perícia parte de uma questão técnica delimitada",
        paragraphs: [
          "Na perícia contábil, o trabalho costuma estar ligado a uma controvérsia concreta. O profissional examina registros, aplica critérios e responde a quesitos, seja em processo judicial, arbitragem, negociação ou avaliação extrajudicial.",
          "O laudo ou parecer precisa demonstrar fontes, método, cálculos e limitações. A conclusão fica restrita ao objeto definido e ao material efetivamente disponível para exame.",
        ],
      },
      {
        title: "A auditoria examina processos, controles ou ocorrências",
        paragraphs: [
          "Uma auditoria pode avaliar se controles internos funcionam, se operações seguem critérios definidos ou se existem exceções que exigem investigação. Em uma auditoria especial, o escopo pode ser direcionado a pagamentos, estoques, acessos, fornecedores ou outro risco específico.",
          "O relatório apresenta procedimentos executados, evidências, achados e recomendações compatíveis com o alcance. Ele não substitui automaticamente uma perícia quando a demanda exige resposta formal a quesitos de um litígio.",
        ],
      },
      {
        title: "Perguntas que ajudam a escolher",
        paragraphs: [
          "Se a necessidade é quantificar um valor controvertido ou responder a uma pergunta técnica em processo, a perícia tende a ser o caminho. Se o objetivo é avaliar controles, reconstruir uma ocorrência ou identificar vulnerabilidades, a auditoria pode ser mais adequada.",
        ],
        bullets: [
          "Existe processo, quesito ou valor específico a ser demonstrado?",
          "O objetivo é avaliar uma transação ou revisar um processo inteiro?",
          "Quem utilizará o relatório: juiz, advogados, administração ou investidores?",
          "Há suspeita delimitada ou busca-se uma avaliação preventiva de riscos?",
        ],
      },
      {
        title: "Os trabalhos podem ser complementares",
        paragraphs: [
          "Uma auditoria pode identificar eventos que depois demandem cálculo ou exame pericial individualizado. De forma inversa, uma perícia pode revelar fragilidades de controle que mereçam avaliação mais ampla. O importante é manter objetos, métodos e conclusões separados.",
        ],
      },
    ],
    relatedService: {
      label: "Conheça a atuação em Auditoria Especial",
      path: "/auditoria",
    },
    additionalServicePaths: ["/pericia-contabil"],
  },
  {
    slug: "como-funciona-pericia-grafotecnica",
    category: "Perícia Grafotécnica",
    title: "Como funciona uma perícia grafotécnica de assinatura?",
    seoTitle: "Como Funciona a Perícia Grafotécnica | Vértice",
    description:
      "Conheça as etapas do exame grafotécnico, a importância dos padrões de confronto e os limites de análises feitas apenas por imagem.",
    publishedAt: "2026-10-09",
    updatedAt: "2026-10-09",
    readingTime: "7 min de leitura",
    introduction:
      "A perícia grafotécnica avalia características do gesto gráfico para investigar se uma assinatura ou escrita questionada é compatível com padrões atribuídos a determinada pessoa. O exame não se resume a comparar o desenho aparente: considera dinâmica, hábitos gráficos e condições do material.",
    sections: [
      {
        title: "Definição do objeto e do material questionado",
        paragraphs: [
          "O primeiro passo é identificar exatamente qual lançamento deve ser examinado, em qual documento ele aparece e qual pergunta precisa ser respondida. Um contrato com várias rubricas, por exemplo, exige individualização para evitar conclusões genéricas.",
          "O documento original costuma oferecer mais possibilidades de exame porque preserva aspectos físicos que uma reprodução pode reduzir ou eliminar. Quando só existem cópias, o profissional deve avaliar se a qualidade permite o confronto e registrar as limitações.",
        ],
      },
      {
        title: "Seleção dos padrões de confronto",
        paragraphs: [
          "Padrões são assinaturas ou escritas usadas como referência. Eles precisam ter autoria confiável, quantidade suficiente, qualidade adequada e, sempre que possível, proximidade temporal com o lançamento questionado.",
        ],
        bullets: [
          "Documentos oficiais e fichas cadastrais com origem verificável.",
          "Assinaturas produzidas em documentos habituais e contemporâneos.",
          "Padrões coletados tecnicamente, quando cabíveis.",
          "Exemplares variados para observar constâncias e variações naturais.",
        ],
      },
      {
        title: "Análise e confronto das características",
        paragraphs: [
          "O exame observa elementos como ritmo, velocidade, pressão aparente, proporções, inclinação, ligações, ataques, remates e organização espacial. Cada característica ganha significado dentro do conjunto; coincidências isoladas não devem sustentar uma conclusão sozinhas.",
          "O perito também considera variações naturais, limitações motoras, suporte, instrumento escritor e possíveis condições de produção. O método precisa ser descrito de modo que o raciocínio técnico possa ser compreendido e discutido.",
        ],
      },
      {
        title: "Resultado e limites da conclusão",
        paragraphs: [
          "A conclusão deve refletir a força dos elementos observados e a qualidade do material. Em alguns casos é possível sustentar compatibilidade ou incompatibilidade; em outros, a insuficiência de padrões ou a baixa qualidade impede uma resposta segura.",
          "Uma conclusão inconclusiva não significa ausência de trabalho: pode ser o resultado tecnicamente responsável diante das limitações encontradas. A coleta de novos padrões ou a apresentação do original pode permitir uma reavaliação.",
        ],
      },
    ],
    relatedService: {
      label: "Conheça a atuação em Perícia Grafotécnica",
      path: "/pericia-grafotecnica",
    },
    additionalServicePaths: ["/pericia-documental"],
  },
  {
    slug: "validade-evidencias-digitais",
    category: "Perícia Digital",
    title: "O que dá confiabilidade a uma evidência digital?",
    seoTitle: "Confiabilidade da Evidência Digital | Vértice",
    description:
      "Entenda o papel da origem, integridade, contexto, cadeia de custódia e método técnico na avaliação de arquivos, mensagens e registros digitais.",
    publishedAt: "2026-10-09",
    updatedAt: "2026-10-09",
    readingTime: "7 min de leitura",
    introduction:
      "A existência de um arquivo, captura de tela ou valor de hash não resolve sozinha questões de autenticidade, autoria ou contexto. A confiabilidade de uma evidência digital resulta da combinação entre origem documentada, preservação, método de coleta e coerência com outras fontes.",
    sections: [
      {
        title: "Origem e contexto vêm antes da interpretação",
        paragraphs: [
          "É necessário saber de qual dispositivo, conta, sistema ou mídia o dado foi obtido, quem tinha acesso e em quais circunstâncias ocorreu a coleta. Sem essas informações, o conteúdo pode até ser legível, mas sua relação com o fato investigado permanece limitada.",
          "Datas exibidas por aplicativos também precisam ser interpretadas com cuidado. Fuso horário, relógio incorreto, sincronização e exportação podem alterar a forma como o tempo aparece.",
        ],
      },
      {
        title: "Integridade e cadeia de custódia",
        paragraphs: [
          "A preservação busca reduzir alterações e registrar todas as etapas de manuseio. Identificação do item, responsável, datas, acondicionamento, transferências e procedimentos aplicados formam a cadeia de custódia do material.",
          "Valores de hash permitem verificar se dois conjuntos de dados são idênticos no nível calculado. Eles são importantes para controle de integridade, mas não demonstram por si mesmos quem criou o arquivo, se o conteúdo é verdadeiro ou em qual contexto foi produzido.",
        ],
      },
      {
        title: "Captura de tela, exportação e arquivo nativo",
        paragraphs: [
          "Uma captura de tela documenta o que estava visível naquele momento, porém normalmente não contém todos os metadados ou relações da fonte. Exportações completas e arquivos nativos podem preservar informações adicionais, como cabeçalhos, identificadores, estrutura e histórico.",
        ],
        bullets: [
          "Mantenha o dispositivo ou a conta de origem disponível quando possível.",
          "Evite editar, converter ou reenviar arquivos antes da preservação.",
          "Registre como, quando e por quem o conteúdo foi obtido.",
          "Preserve também dados que possam contradizer a hipótese inicial.",
        ],
      },
      {
        title: "Conclusão técnica não substitui a decisão jurídica",
        paragraphs: [
          "A perícia pode descrever achados, compatibilidades, inconsistências e limitações. A admissibilidade e o peso jurídico da evidência dependem do contexto processual e da avaliação da autoridade competente.",
          "Por isso, a pergunta técnica deve ser delimitada sem prometer que determinado arquivo será automaticamente aceito ou rejeitado. O exame responsável separa o que os dados demonstram, o que apenas sugerem e o que não pode ser concluído.",
        ],
      },
    ],
    relatedService: {
      label: "Conheça a atuação em Perícia Digital",
      path: "/pericia-digital",
    },
  },
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
    seoTitle: "Perícia Documental x Grafotécnica | Vértice",
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
    seoTitle: "Como Preservar Evidências Digitais | Vértice",
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
