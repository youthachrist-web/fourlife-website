/**
 * Single source of truth for site copy.
 *
 * Content is extracted and rewritten from "EcossistemaFourLife.pptx" (Jan 2026),
 * the current authoritative source, with supporting material from the legacy
 * site fourlife.com.br. Nothing here is invented — placeholders that still need
 * client confirmation are marked with NEEDS-CONFIRMATION.
 */

export const site = {
  name: "FourLife",
  legalName: "FourLife — Ecossistema Integrado de Produtividade e Saúde",
  tagline: "Saúde que engaja. Dados que provam.",
  slogan: "Educação que previne. Saúde que transforma.",
  shortDescription:
    "O primeiro ecossistema unificado de produtividade e saúde corporativa do Brasil.",
  description:
    "A FourLife integra saúde preventiva, engenharia de segurança, tecnologia e educação em uma única estratégia para reduzir absenteísmo, garantir conformidade e transformar saúde em ROI mensurável.",
  /** Copy específica do Hero (badge + parágrafo) — não usada em meta/SEO. */
  heroEyebrow: "Saúde Corporativa · Educação · Compliance",
  heroBody:
    "Reduzimos presenteísmo e absenteísmo, garantimos conformidade com NR-01 e SST, e desenvolvemos seus talentos do EJA ao MBA — tudo em uma plataforma integrada.",
  // Set NEXT_PUBLIC_SITE_URL in the environment for the deployed domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fourlife.com.br",
  locale: "pt-BR",
  contact: {
    // From EcossistemaFourLife.pptx, slide 18.
    email: "comercial@fourlife.com.br",
    salesContact: "Frederico Costa",
    salesEmail: "fred@europanegocios.com.br",
    // Official "click to chat" short link supplied by the client.
    whatsappUrl: "https://wa.me/message/G7F4TRTQC5SEA1",
    // NEEDS-CONFIRMATION: number shown for display only (legacy site).
    phoneDisplay: "+55 48 9217-2195",
  },
  social: {
    // NEEDS-CONFIRMATION: no official social handles were supplied.
    instagram: "",
    linkedin: "",
  },
} as const;

export const nav = [
  { label: "Pilares", href: "/#pilares" },
  { label: "Jornada", href: "/#jornada" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Diferenciais", href: "/diferenciais" },
  { label: "Sobre", href: "/sobre" },
] as const;

export const cta = {
  primary: { label: "Solicitar diagnóstico", href: "/contato" },
  secondary: { label: "Falar com especialista", href: "/contato" },
};

/* --------------------------------------------------------------------------- */
/* The problem — presenteeism & absenteeism                                    */
/* --------------------------------------------------------------------------- */

export const realityHeadline = {
  eyebrow: "A realidade invisível",
  title: "O adoecimento no trabalho já é epidemia — e o custo não aparece na planilha",
  body: "Mais de 546 mil afastamentos por saúde mental no Brasil em 2025 — recorde pela segunda vez em 10 anos. Distúrbios osteomusculares e lombares lideram a concessão de auxílio por incapacidade temporária. Antes do afastamento, a sobrecarga já drena foco, decisão e performance.",
};

/** Retratos de quem carrega o custo do adoecimento — usados no storytelling. */
export const workerPhotos = [
  {
    src: "/images/reality-limpeza.jpg",
    alt: "Trabalhadora da limpeza sentada no chão, exausta, ao fim do turno em um escritório vazio à noite.",
    kicker: "Fim de turno",
    caption: "O esgotamento raramente é registrado. Ele aparece no absenteísmo do mês seguinte.",
  },
  {
    src: "/images/reality-fisico.jpg",
    alt: "Operador de empilhadeira em ambiente industrial, em imagem preto e branco.",
    kicker: "O corpo que trabalha",
    caption: "Distúrbios osteomusculares e lombares lideram a concessão de auxílio por incapacidade temporária.",
  },
  {
    src: "/images/reality-burnout.jpg",
    alt: "Profissional com a mão na cabeça diante do notebook, sinal de sobrecarga no trabalho do conhecimento.",
    kicker: "A mente que se esgota",
    caption: "Burnout drena foco, decisão e performance muito antes de virar afastamento.",
  },
  {
    src: "/images/reality-industria.jpg",
    alt: "Operador industrial de colete refletivo e capacete, sentado com a cabeça apoiada na mão, exausto no armazém.",
    kicker: "A pressão do chão de fábrica",
    caption: "Jornada intensa, meta e risco: a fadiga vira presenteísmo e, depois, afastamento.",
  },
];

/** Manchetes reais sobre a epidemia de afastamentos — clippings com motion. */
export const newsClips = [
  {
    source: "g1",
    tag: "Trabalho e Carreira",
    date: "26 jan 2026",
    title:
      "Brasil tem mais de 546 mil afastamentos por saúde mental em 2025 e bate recorde pela 2ª vez em 10 anos",
    excerpt:
      "A alta se repete após o recorde anterior, em um cenário sem ações efetivas para frear o adoecimento mental no trabalho.",
  },
  {
    source: "A Crítica",
    tag: "Análise",
    date: "29 jul 2026",
    title: "Recorde de afastamentos por transtornos mentais acende alerta para empresas",
    excerpt:
      "Especialistas destacam que o cenário exige mudança na cultura organizacional e mais atenção aos riscos psicossociais previstos na NR-1.",
  },
  {
    source: "g1",
    tag: "Notícias gerais",
    date: "jan 2026",
    title:
      "Epidemia invisível: veja os direitos do trabalhador afastado por saúde mental em 2026",
    excerpt:
      "Distúrbios osteomusculares e lombares seguem entre as principais causas de auxílio por incapacidade temporária.",
  },
];

/* --------------------------------------------------------------------------- */
/* O custo de não agir — a dor financeira                                      */
/* --------------------------------------------------------------------------- */

export const cost = {
  eyebrow: "O custo de não agir",
  title: "Cada afastamento tem preço — e ele quase nunca aparece na planilha",
  body: "Dia parado, hora de presenteísmo, processo trabalhista, reposição e retreinamento. O custo do adoecimento é real, recorrente e invisível para a maioria das gestões.",
  points: [
    { value: "92%", label: "das empresas não medem o impacto financeiro do presenteísmo" },
    { value: "2%", label: "dos gestores identificam o presenteísmo precocemente" },
    { value: "19%", label: "da jornada perdida com queda de foco e fadiga" },
    { value: "267%", label: "de alta em processos por burnout em Santa Catarina em 9 anos" },
  ],
};

/* --------------------------------------------------------------------------- */
/* O Custo Invisível → Cenário Atual → Riscos → Solução                        */
/* A narrativa que antecede os 4 pilares na home. Fontes externas (não do      */
/* deck FourLife): Carta Capital, IBGE, Ministério do Trabalho — material de   */
/* apoio da Orion Digital.                                                     */
/* --------------------------------------------------------------------------- */

export type InvisibleCostPoint = {
  value: string;
  label: string;
  /** 0–100 quando o valor é um percentual "de algo" (renderiza como anel). */
  ringPercent?: number;
  /** Estatística mais alarmante do grupo — recebe o tom de alerta (vermelho). */
  critical?: boolean;
};

export const invisibleCost = {
  eyebrow: "O custo invisível",
  title: "O custo invisível nas empresas",
  body: "Antes de olhar para dentro do seu negócio, os números do país já mostram o tamanho do problema.",
  points: [
    { value: "R$ 340 bi/ano", label: "Custo do presenteísmo no Brasil" },
    {
      value: "74%",
      label: "Colaboradores afetados por presenteísmo ou absenteísmo",
      ringPercent: 74,
    },
    {
      value: "267%",
      label: "Aumento de processos por burnout em SC em 9 anos",
      critical: true,
    },
    { value: "3×", label: "Mais caro tratar doenças do que prevenir" },
  ] satisfies InvisibleCostPoint[],
  sources: "Carta Capital, IBGE, Ministério do Trabalho",
};

export const currentScenario = {
  eyebrow: "O cenário atual",
  title: "Já imaginou que esse pode ser o cenário da sua empresa?",
  body: "Colaboradores presentes fisicamente mas improdutivos. Afastamentos frequentes. Talentos saindo. Passivos trabalhistas acumulando.",
};

export type IdentifiedRisk = {
  severity: "Crítica" | "Alta";
  title: string;
  detail: string;
};

export const identifiedRisks: IdentifiedRisk[] = [
  {
    severity: "Alta",
    title: "Presenteísmo silencioso",
    detail:
      "Queda de desempenho, erros frequentes, desmotivação e falta de foco. O colaborador está presente, mas a produtividade foi embora.",
  },
  {
    severity: "Crítica",
    title: "Absenteísmo crescente",
    detail:
      "Transtornos mentais, dores crônicas e estresse são as 3 principais causas de afastamento no Brasil — e são evitáveis com prevenção.",
  },
  {
    severity: "Alta",
    title: "Fuga de talentos",
    detail:
      "Sem desenvolvimento e sem cuidado com bem-estar, colaboradores qualificados migram para empresas que oferecem mais do que salário.",
  },
];

/** Banner de transição exibido no topo da seção dos 4 pilares. */
export const solutionIntro = {
  eyebrow: "A solução FourLife",
  title: "Uma plataforma. Quatro pilares. Resultados reais.",
  body: "A FourLife conecta saúde física e mental, tecnologia de ponta, conformidade regulatória e desenvolvimento educacional em um único ecossistema — pensado para empresas que querem resultados sustentáveis.",
  items: [
    "Checkups físicos e mentais com IA + Analytics preditiva",
    "Plataforma digital de saúde como benefício corporativo",
    "Conformidade NR-01 e SST com painel gerencial",
    "Plano de carreira do EJA ao MBA para retenção de talentos",
  ],
};

export type ResultPoint = {
  value: string;
  label: string;
  direction: "down" | "up" | "flat";
  /** 0–100 para os indicadores comparáveis na mesma escala (barra). */
  barPercent?: number;
};

/** Resultados após a Jornada da Saúde de 6 meses — seção exibida após os pilares. */
export const results = {
  eyebrow: "Resultados",
  title: "O retorno de transformar saúde em estratégia",
  body: "Indicadores medidos após o ciclo de 6 meses da Jornada da Saúde — a prevenção comprovada em números.",
  points: [
    {
      value: "40%",
      label: "Redução média de absenteísmo após 6 meses",
      direction: "down",
      barPercent: 40,
    },
    {
      value: "28%",
      label: "Aumento de produtividade documentado",
      direction: "up",
      barPercent: 28,
    },
    { value: "3×", label: "ROI sobre o investimento em saúde preventiva", direction: "flat" },
    {
      value: "100%",
      label: "Compliance com NR-01 garantido",
      direction: "flat",
      barPercent: 100,
    },
  ] satisfies ResultPoint[],
};

/* --------------------------------------------------------------------------- */
/* The shift — from isolated services to an ecosystem                          */
/* --------------------------------------------------------------------------- */

export const pillars = [
  {
    name: "Saúde física e mental",
    detail: "Investir em educação em saúde não é custo — é estratégia para resultados sustentáveis.",
  },
  {
    name: "Tecnologia e inovação",
    detail: "O que não é medido não pode ser melhorado. Entregamos dados que viram resultados.",
  },
  {
    name: "Normas regulamentadoras",
    detail: "Conformidade não é opção — é blindagem contra riscos e passivos (NRs 01, 05 e 07).",
  },
  {
    name: "Educação",
    detail: "Empresas que educam seus colaboradores criam times mais engajados, produtivos e leais.",
  },
];

export type FourPillar = {
  number: string;
  name: string;
  thesis: string;
  points: string[];
  image?: { src: string; alt: string };
};

/**
 * Detailed version of the four pillars for the homepage section.
 * Content: "Fourlife add.pptx", slides 4, 7–8, 13–18.
 */
export const fourPillars: FourPillar[] = [
  {
    number: "01",
    name: "Saúde física e mental",
    thesis:
      "Investir na educação em saúde não é custo, é estratégia para resultados sustentáveis.",
    points: [
      "Mapeamento do estado de saúde dos colaboradores.",
      "Educação em saúde e hábitos saudáveis.",
      "Monitoramento dos indicadores de saúde física e mental.",
      "Prevenção de doenças, redução de ausências, produtividade e retorno financeiro.",
    ],
  },
  {
    number: "02",
    name: "Tecnologia e inovação",
    thesis:
      "O que não é medido não pode ser melhorado. Nós entregamos dados que viram resultados.",
    points: [
      "IA e analytics para coletar e tratar dados de saúde física e mental.",
      "Relatórios claros para gestores: decisões baseadas em evidências.",
      "Inovação no modelo de intervenção — menos achismo, mais produtividade mensurável.",
      "Educação em saúde como instrumento de gestão estratégica.",
    ],
  },
  {
    number: "03",
    name: "Normas regulamentadoras",
    thesis:
      "Estar em conformidade não é opção — é blindagem contra riscos e passivos.",
    points: [
      "Base para as NRs 01, 05 e 07.",
      "Evidências formais para auditorias e órgãos reguladores.",
      "Redução de riscos trabalhistas e financeiros.",
      "Segurança jurídica para o negócio.",
    ],
  },
  {
    number: "04",
    name: "Educação",
    thesis:
      "Empresas que educam seus colaboradores criam times mais engajados, produtivos e leais.",
    points: [
      "Programa educacional baseado nos dados dos colaboradores.",
      "Workshops, treinamentos e acompanhamento contínuo.",
      "Intervenções práticas de educação em saúde, produtividade e qualidade de vida.",
      "Cultura de prevenção e melhoria contínua.",
    ],
  },
];

export const ecosystemIntro = {
  equation: "Saúde + Segurança + Educação + Tecnologia + Estratégia = Performance com ROI",
};

export const ecosystemStats = [
  { value: "7", label: "soluções integradas" },
  { value: "4", label: "pilares estratégicos" },
  { value: "360º", label: "diagnóstico do negócio" },
  { value: "ROI", label: "mensurável por serviço" },
];

/* --------------------------------------------------------------------------- */
/* Jornada da Saúde — the 6-month health journey                               */
/* Content: "Fourlife add.pptx", slides 5 and 8.                               */
/* --------------------------------------------------------------------------- */

export type HealthJourneyStage = {
  name: string;
  detail: string;
  image?: { src: string; alt: string };
  /** Slugs into `solutions` — rendered as small LogoBadge chips for this stage. */
  logos?: string[];
};

export const healthJourney = {
  eyebrow: "Jornada da Saúde",
  title: "Do diagnóstico inicial ao retorno financeiro",
  body: "Um ciclo de seis meses que começa mapeando a saúde do time e termina com indicadores de prevenção, menos ausências e ROI para a empresa. Saúde física + saúde mental = produtividade.",
  /** Citação de abertura do Pilar 1, no mesmo padrão dos Pilares 2–4 abaixo. */
  quote: "Investir na educação em saúde não é custo, é estratégia para resultados sustentáveis.",
  stages: [
    {
      name: "Check-up inicial",
      detail: "Mapeamento do estado de saúde física e mental dos colaboradores.",
      image: {
        src: "/images/pillar-saude-fisica-mental.jpg",
        alt: "Profissional de saúde afere a pressão arterial de uma paciente durante um check-up.",
      },
      logos: ["labduo", "avallio"],
    },
    {
      name: "Ações integradas",
      detail: "Educação em saúde e construção de hábitos saudáveis.",
      image: {
        src: "/images/journey-acoes-integradas.jpg",
        alt: "Médica em teleconsulta orienta paciente sobre o uso de uma bombinha de inalação.",
      },
      logos: ["zapvida"],
    },
    {
      name: "Acompanhamento",
      detail: "Monitoramento contínuo dos indicadores de saúde física e mental.",
      image: {
        src: "/images/journey-acompanhamento.jpg",
        alt: "Profissional de saúde consulta indicadores em um smartwatch durante o acompanhamento.",
      },
      logos: ["zapvida", "sgg"],
    },
    {
      name: "Resultados",
      detail: "Prevenção de doenças, redução de ausências, produtividade e retorno financeiro para a empresa.",
      image: {
        src: "/images/journey-resultados.jpg",
        alt: "Médica mostra o resultado de um exame de imagem ao paciente.",
      },
      logos: ["fourlife"],
    },
  ] satisfies HealthJourneyStage[],
  timeline: [
    {
      period: "Mês 1",
      title: "Diagnóstico",
      items: [
        "Checkup",
        "Exames clínicos e coleta de sangue",
        "Exames mentais",
        "IA Analytics",
      ],
    },
    {
      period: "Meses 2 a 5",
      title: "Ações multidisciplinares",
      items: [
        "Resultados e diagnósticos individuais",
        "Ações multidisciplinares presenciais",
        "Médicos, nutricionistas, neurologistas e psicólogos",
        "Campanhas, palestras, eventos, plataforma de educação e microlearning",
      ],
    },
    {
      period: "Mês 6",
      title: "Nova medição",
      items: [
        "Novo check-up",
        "Exames clínicos e coleta de sangue",
        "Exames mentais",
      ],
    },
  ],
};

export type TechInnovationItem = {
  name: string;
  detail: string;
  image: { src: string; alt: string };
};

/** Cartão compacto (ícone + título + detalhe), sem foto. */
export type CompactItem = { name: string; detail: string };

/** Grupo de destaques em checklist (ex.: "Conformidade Legal"). */
export type HighlightGroup = { title: string; items: string[] };

/** Shape shared by every "pilar em detalhe" showcase (Pilares 2, 3, 4…). */
export type TechInnovationShowcase = {
  eyebrow: string;
  title: string;
  body: string;
  /** Citação em destaque, exibida em itálico logo abaixo do body. */
  quote?: string;
  /** Trilhas em ícone circular, sem foto (usado no Pilar 4 — EJA, Técnico…). */
  tracks?: CompactItem[];
  items: TechInnovationItem[];
  /** Cartões compactos sem foto, exibidos após os cartões com foto. */
  compactItems?: CompactItem[];
  /** Grupos de checklist (usado no Pilar 3 — Conformidade Legal, etc.). */
  highlights?: HighlightGroup[];
  /** Alerta de atenção (usado no Pilar 3 — risco de não conformidade). */
  warning?: string;
  /** Closing credit logo (used once, on Pilar 4 — from the source deck's last slide). */
  closingLogo?: { src: string; alt: string; caption: string };
};

/**
 * Pilar 2 (Tecnologia e inovação) em detalhe, no mesmo formato visual da
 * Jornada da Saúde — cartão com foto — exibido logo abaixo do Ciclo de 6
 * meses. Content: "Fourlife add.pptx", slides 9–10.
 */
export const techInnovation = {
  eyebrow: "Pilar 2 · Tecnologia e inovação",
  title: "O que não é medido não pode ser melhorado",
  body: "Nossa plataforma digital centraliza checkups, resultados, planos de ação e indicadores de saúde — tudo em um painel gerencial acessível ao RH, com privacidade garantida para cada colaborador.",
  quote: "Saúde digital como benefício corporativo real — plataforma, dados e IA a serviço do seu RH.",
  items: [
    {
      name: "IA e analytics preditiva",
      detail:
        "Uso de IA e analytics para coletar e tratar dados de saúde física e mental, identificando padrões de risco antes que se tornem afastamentos — com recomendações personalizadas por colaborador.",
      image: {
        src: "/images/tech-ia-analytics.jpg",
        alt: "Médico acompanha um procedimento assistido por braço robótico, com um tablet em mãos.",
      },
    },
    {
      name: "Relatórios para gestores",
      detail: "Relatórios claros para gestores: decisões baseadas em evidências.",
      image: {
        src: "/images/tech-relatorios-gestores.jpg",
        alt: "Médico revisa um relatório impresso de análise mineral capilar, com gráficos e indicadores.",
      },
    },
    {
      name: "Inovação no modelo",
      detail: "Inovação no modelo de intervenção — menos achismos, mais produtividade mensurável.",
      image: {
        src: "/images/tech-inovacao-modelo.jpg",
        alt: "Pesquisadores em laboratório analisam amostras e tubos de ensaio para gerar dados de saúde.",
      },
    },
    {
      name: "Educação em saúde",
      detail: "Educação em saúde como instrumento de gestão estratégica.",
      image: {
        src: "/images/tech-educacao-saude.jpg",
        alt: "Equipe médica treina reanimação cardiopulmonar em um manequim, coletando dados clínicos durante a simulação.",
      },
    },
    {
      name: "Dashboard RH em tempo real",
      detail:
        "Indicadores de saúde, afastamentos, retorno sobre investimento e alertas automatizados para tomada de decisão.",
      image: {
        src: "/images/tech-dashboard-ia-preditiva.png",
        alt: "Médico consulta um painel digital com histórico do paciente, gráficos e indicadores em tempo real.",
      },
    },
  ] satisfies TechInnovationItem[],
};

/**
 * Pilar 3 (Normas regulamentadoras) em detalhe — mesmo formato visual da
 * Jornada da Saúde, exibido logo abaixo do Pilar 2. Content: "Fourlife
 * add.pptx", slides 11–12.
 */
export const normasRegulamentadoras = {
  eyebrow: "Pilar 3 · Normas regulamentadoras",
  title: "Estar em conformidade não é opção",
  body: "A nova NR-01 exige Gerenciamento de Riscos Ocupacionais (GRO) e Programa de Gerenciamento de Riscos (PGR). Nossa plataforma gerencial torna o compliance simples, auditável e integrado à cultura da empresa.",
  quote: "Compliance com NR-01 e SST transforma obrigação legal em vantagem competitiva.",
  items: [
    {
      name: "Base para as NRs",
      detail: "Base para as NRs 01, 05 e 07.",
      image: {
        src: "/images/norms-nrs.jpg",
        alt: "Equipe de operários com capacetes e uniformes de segurança trabalha à noite em uma via pública.",
      },
    },
    {
      name: "Evidências para auditorias",
      detail: "Evidências formais para auditorias e órgãos reguladores.",
      image: {
        src: "/images/norms-evidencias-auditorias.jpg",
        alt: "Advogado em seu escritório revisa um livro jurídico ao lado de uma estátua da balança da justiça.",
      },
    },
    {
      name: "Redução de riscos",
      detail: "Redução de riscos trabalhistas e financeiros.",
      image: {
        src: "/images/norms-riscos-financeiros.jpg",
        alt: "Profissional analisa relatórios financeiros com gráficos, calculadora e notebook.",
      },
    },
    {
      name: "Segurança jurídica",
      detail: "Segurança jurídica para o negócio.",
      image: {
        src: "/images/norms-seguranca-juridica.jpg",
        alt: "Advogada revisa um documento assinado em um escritório, com a estátua da balança da justiça ao lado.",
      },
    },
  ] satisfies TechInnovationItem[],
  highlights: [
    {
      title: "Plataforma NR-01 & SST",
      items: [
        "GRO — Gerenciamento de Riscos Ocupacionais",
        "PGR — Programa de Gerenciamento de Riscos",
        "PCMSO integrado",
        "Laudos e ASOs digitais",
      ],
    },
    {
      title: "Conformidade legal",
      items: [
        "Conformidade com legislação trabalhista vigente",
        "Redução de passivo trabalhista",
        "Documentação auditável e rastreável",
        "Prevenção proativa de acidentes",
      ],
    },
    {
      title: "Vantagem competitiva",
      items: [
        "Score ESG elevado",
        "Reputação como empregador responsável",
        "Redução de multas e notificações",
        "Cultura de segurança consolidada",
      ],
    },
  ] satisfies HighlightGroup[],
  warning:
    "Empresas não conformes com a nova NR-01 estão sujeitas a embargos, multas e ações trabalhistas. A FourLife garante que você esteja sempre à frente da fiscalização.",
};

/**
 * Pilar 4 (Educação) em detalhe — mesmo formato visual da Jornada da Saúde,
 * exibido logo abaixo do Pilar 3. Fecha a sequência dos 4 pilares com o
 * crédito de fechamento do deck original. Content: "Fourlife add.pptx",
 * slides 13–14.
 */
export const educacao = {
  eyebrow: "Pilar 4 · Educação",
  title: "Empresas que educam seus colaboradores",
  body: "Oferecemos trilhas educacionais completas como benefício corporativo — do ensino fundamental (EJA) à especialização, graduação e MBA — criando vínculos de longo prazo entre o colaborador e a empresa.",
  quote: "Do EJA ao MBA — plano de carreira com formação formal que retém e desenvolve talentos.",
  tracks: [
    {
      name: "EJA",
      detail: "Educação de Jovens e Adultos — alfabetização e ensino fundamental/médio.",
    },
    {
      name: "Técnico",
      detail: "Cursos técnicos profissionalizantes alinhados à área de atuação.",
    },
    {
      name: "Graduação",
      detail: "Ensino superior com flexibilidade de horários para o trabalhador.",
    },
    {
      name: "Pós / MBA",
      detail: "Especializações, MBAs e pós-graduações para líderes e gestores.",
    },
  ] satisfies CompactItem[],
  items: [
    {
      name: "Programa educacional",
      detail: "Programa educacional baseado nos dados dos colaboradores.",
      image: {
        src: "/images/edu-programa-dados.jpg",
        alt: "Equipe de um ateliê de moda trabalha em conjunto no desenvolvimento de peças, com fichas técnicas na parede.",
      },
    },
    {
      name: "Workshops e treinamentos",
      detail: "Workshops, treinamentos e acompanhamento contínuo.",
      image: {
        src: "/images/edu-workshops-treinamentos.jpg",
        alt: "Plateia acompanha uma palestra corporativa em um auditório amplo.",
      },
    },
    {
      name: "Intervenções práticas",
      detail: "Intervenções práticas de educação em saúde, produtividade e qualidade de vida.",
      image: {
        src: "/images/edu-intervencoes-praticas.jpg",
        alt: "Colaboradora sorri enquanto trabalha em um computador no chão de fábrica.",
      },
    },
    {
      name: "Cultura de prevenção",
      detail: "Cultura de prevenção e melhoria contínua.",
      image: {
        src: "/images/edu-cultura-prevencao.jpg",
        alt: "Dois operários com capacete e óculos de proteção examinam juntos uma máquina industrial.",
      },
    },
  ] satisfies TechInnovationItem[],
  compactItems: [
    {
      name: "Retenção de talentos",
      detail: "Colaboradores que se desenvolvem dentro da empresa permanecem até 2× mais.",
    },
    {
      name: "Benefício diferenciado",
      detail: "Educação formal como benefício é um dos mais valorizados na pesquisa de clima.",
    },
    {
      name: "Aumento de produtividade",
      detail: "Equipes mais capacitadas cometem menos erros e entregam mais resultado.",
    },
    {
      name: "Compliance trabalhista",
      detail: "Treinamentos e capacitações documentados reduzem o risco de ações judiciais.",
    },
  ] satisfies CompactItem[],
  closingLogo: {
    src: "/brand/gen-logo.png",
    alt: "Logo do Grupo Europa de Negócios (GEN)",
    caption: "Grupo Europa de Negócios",
  },
};

/** Citação de fechamento da Jornada/Pilares — material de apoio Orion Digital. */
export const provenResult = {
  badge: "Resultado comprovado",
  quote:
    "Investir na saúde do colaborador não é custo. É a estratégia de negócio mais rentável que sua empresa pode adotar.",
  attribution: "Filosofia FourLife",
};

/* --------------------------------------------------------------------------- */
/* Por que a FourLife — 6 diferenciais do ecossistema, nível C-Level.          */
/* Exibido na home, no lugar antes ocupado pela prévia de Diferenciais Carlos  */
/* Chagas (que segue intacta e completa em /diferenciais).                    */
/* Material de apoio Orion Digital.                                           */
/* --------------------------------------------------------------------------- */

export const ecosystemDifferentials = {
  eyebrow: "Por que a FourLife",
  title: "Seis motivos para o C-Level escolher a FourLife",
  body: "Não é só compliance — é uma plataforma que transforma saúde ocupacional em vantagem competitiva mensurável.",
  items: [
    {
      title: "Da burocracia ao ROI",
      detail:
        "Transformamos o custo compulsório de SST em métricas claras de retorno financeiro, produtividade e rentabilidade para o C-Level.",
    },
    {
      title: "People Analytics integrado",
      detail:
        "O fim dos dados isolados: conectamos laudos médicos, SST, clima mental e educação em uma inteligência centralizada para tomada de decisão.",
    },
    {
      title: "Atendimento in company & saúde digital",
      detail:
        "Cuidado médico preventivo direto na sua empresa combinado a suporte digital contínuo, reduzindo o absenteísmo e aumentando o comprometimento da equipe.",
    },
    {
      title: "Blindagem ativa da NR-01",
      detail:
        "Mapeamento anônimo de riscos psicossociais e burnout, antecipando e neutralizando crises antes que virem licenças médicas ou acionamentos judiciais.",
    },
    {
      title: "Cashback social único",
      detail:
        "O único ecossistema que converte a prevenção em saúde e os hábitos saudáveis dos colaboradores em bolsas de estudo e qualificação profissional.",
    },
    {
      title: "Faturamento inteligente & incentivo fiscal",
      detail:
        "Flexibilidade para alocar custos nos centros de receita certos da sua empresa e aproveitar benefícios tributários como a Lei do Bem.",
    },
  ],
};

/* --------------------------------------------------------------------------- */
/* Diferenciais Carlos Chagas                                                  */
/* Content: "Fourlife add.pptx", slide 6. Página própria: /diferenciais.       */
/* --------------------------------------------------------------------------- */

export const differentials = {
  eyebrow: "Diferenciais Carlos Chagas",
  title: "Por que empresas líderes escolhem a nossa assessoria",
  body: "A operação de saúde ocupacional que sustenta o ecossistema: exames, ASOs e laudos com estrutura própria, agilidade e segurança jurídica.",
  items: [
    {
      title: "Tudo no mesmo dia",
      detail:
        "Exames clínicos (ASO) e complementares — audiometria, laboratoriais, ECG, EEG, espirometria e raio-X — no mesmo atendimento. O colaborador se desloca uma única vez e o RH ganha tempo.",
    },
    {
      title: "Resultados em até 48 horas",
      detail:
        "Liberação rápida de ASOs e exames complementares — e até 72 horas para exames toxicológicos.",
    },
    {
      title: "Atendimento por ordem de chegada",
      detail:
        "Sem necessidade de agendamento prévio nas unidades. A demanda é atendida no momento em que surge.",
    },
    {
      title: "Estrutura própria e capilaridade nacional",
      detail:
        "4 unidades no Rio Grande do Sul (atendimento em Porto Alegre, Canoas e Cachoeirinha; unidade administrativa em Porto Alegre) e ampla rede credenciada em todo o território nacional.",
    },
    {
      title: "Corpo técnico 100% CLT",
      detail:
        "Todo o quadro funcional é vinculado via CLT, o que assegura comprometimento, alinhamento técnico e segurança jurídica para o contrato.",
    },
    {
      title: "Atendimento in company e unidade móvel",
      detail:
        "Equipe multidisciplinar na sua empresa em horários agendados, eliminando o deslocamento do time.",
    },
  ],
};

/* --------------------------------------------------------------------------- */
/* The 7 solutions                                                             */
/* --------------------------------------------------------------------------- */

export type Solution = {
  slug: string;
  name: string;
  order: number;
  category: string;
  role: string;
  partnerNote?: string;
  logo?: string;
  accent: "brand" | "lime" | "slate";
  whatIs: string;
  delivers: string;
  contributes: string;
};

export const solutions: Solution[] = [
  {
    slug: "fourlife",
    name: "FourLife",
    order: 1,
    category: "Gestão do ecossistema",
    role: "Núcleo inteligente que conecta, orquestra e mensura todo o ecossistema.",
    logo: "/brand/fourlife-wordmark.png",
    accent: "brand",
    whatIs:
      "A inteligência estratégica e gestora do primeiro ecossistema unificado de produtividade e saúde corporativa.",
    delivers:
      "People Analytics preditivo, gestão integrada do ecossistema e a transformação dos custos burocráticos de SST em investimento com ROI mensurável.",
    contributes:
      "Conecta e orquestra todas as soluções, transformando dados dispersos em decisões estratégicas.",
  },
  {
    slug: "avallio",
    name: "AVall.iÔ",
    order: 2,
    category: "Saúde mental & riscos psicossociais",
    role: "Inteligência em riscos psicossociais e clima organizacional.",
    partnerNote: "by Esphera Academy",
    logo: "/partners/avallio.png",
    accent: "lime",
    whatIs:
      "Plataforma especializada na gestão de riscos psicossociais, clima organizacional e inteligência em segurança do trabalho.",
    delivers:
      "Mapeamento de riscos mentais e emocionais, transformando treinamentos e dados de convivência em indicadores preventivos para evitar conflitos, burnout e adoecimentos.",
    contributes:
      "Antecipa conflitos e adoecimentos, fortalecendo a performance emocional das equipes.",
  },
  {
    slug: "sgg",
    name: "SGG",
    order: 3,
    category: "Compliance regulatório — SST & eSocial",
    role: "Gestão tecnológica de Medicina e Engenharia de Segurança do Trabalho.",
    accent: "brand",
    whatIs:
      "Plataforma tecnológica integrada para gestão de Medicina e Engenharia de Segurança do Trabalho.",
    delivers:
      "Automação e controle total do PGR, PCMSO, laudos, emissão de ASOs e envio simplificado de eventos de SST ao eSocial, com total compliance regulatório.",
    contributes:
      "Garante conformidade com NRs e ISOs, eliminando passivos e riscos regulatórios.",
  },
  {
    slug: "labduo",
    name: "Grupo LabDuo",
    order: 4,
    category: "Medicina ocupacional & diagnósticos",
    role: "Braço de medicina ocupacional, exames e diagnósticos do ecossistema.",
    partnerNote: "Medicina Diagnóstica",
    logo: "/partners/labduo.png",
    accent: "brand",
    whatIs:
      "O braço de medicina ocupacional, exames e diagnósticos do ecossistema.",
    delivers:
      "Exames laboratoriais e complementares com rigor técnico, atendimento presencial ágil e suporte médico preventivo para a saúde física do colaborador.",
    contributes:
      "Fornece precisão diagnóstica que alimenta a prevenção e o checkup estratégico do ecossistema.",
  },
  {
    slug: "zapvida",
    name: "ZapVida",
    order: 5,
    category: "Telemedicina preventiva",
    role: "Saúde digital e telemedicina preventiva de alta escala.",
    partnerNote: "Saúde",
    logo: "/partners/zapvida.png",
    accent: "brand",
    whatIs: "Plataforma de saúde digital e telemedicina preventiva de alta escala.",
    delivers:
      "1 consulta médica ou psicológica mensal por colaborador, sem coparticipação, cobrindo clínico geral, psicologia, nutrição e 15 especialidades para cuidado contínuo.",
    contributes:
      "Leva cuidado contínuo e acessível a toda a equipe, em escala, reduzindo absenteísmo.",
  },
  {
    slug: "uninovia",
    name: "Uninovia",
    order: 6,
    category: "Educação corporativa & capital humano",
    role: "Educação corporativa, desenvolvimento de carreira e inclusão social.",
    partnerNote: "real learning experience.",
    logo: "/partners/uninovia.png",
    accent: "lime",
    whatIs:
      "Vertente de educação corporativa, desenvolvimento de carreira e inclusão social.",
    delivers:
      "Microlearning em saúde, programas de Upskilling e Reskilling e formação continuada — EJA, Técnico e Ensino Superior em Administração — viabilizados via Cashback Social.",
    contributes:
      "Educa, capacita e retém talentos, criando consciência empreendedora e impacto social.",
  },
  {
    slug: "agencia-orion",
    name: "Agência Orion",
    order: 7,
    category: "Estratégia & inteligência comercial",
    role: "Agência parceira de estratégia, posicionamento de marca e inteligência comercial.",
    partnerNote: "Soluções integradas para marcas que querem liderar",
    logo: "/partners/orion.png",
    accent: "slate",
    whatIs:
      "Agência parceira de estratégia, posicionamento de marca e inteligência comercial do ecossistema.",
    delivers:
      "Comunicação institucional assertiva, estratégias de aquisição B2B, arquitetura do CRM e materiais de engajamento para potencializar os resultados.",
    contributes:
      "Posiciona e faz crescer o ecossistema, convertendo estratégia em aquisição e engajamento.",
  },
];

/* --------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* --------------------------------------------------------------------------- */

/** FAQ organizada pelas 5 dores mais comuns de quem gere SST e RH. */
export const faq = [
  {
    pain: "Dor 1 — Absenteísmo alto e sem causa clara",
    question: "Minha empresa tem muitos afastamentos e eu não sei o motivo real. Como a FourLife ajuda?",
    answer:
      "O diagnóstico gratuito e o People Analytics da FourLife cruzam dados de saúde física, saúde mental, clima e conformidade para revelar as causas ocultas do absenteísmo — de risco psicossocial a dor osteomuscular — e apontam as 3 frentes de maior impacto na receita pelo menor esforço.",
  },
  {
    pain: "Dor 2 — Gasto com SST sem retorno visível",
    question: "Pago medicina, segurança e exames e continuo enxergando isso só como custo. Dá para medir retorno?",
    answer:
      "Sim. Cada solução do ecossistema gera indicadores comparáveis que a FourLife transforma em ROI: quanto a prevenção reduziu de afastamento e reposição de mão de obra, quanto a conformidade evitou de passivo e multa, e qual o retorno por real investido em cada frente.",
  },
  {
    pain: "Dor 3 — Risco de passivo trabalhista e pendências no eSocial",
    question: "Tenho medo de multa, ação trabalhista e evento de SST atrasado no eSocial. Como fico coberto?",
    answer:
      "A plataforma SGG automatiza e controla PGR, PCMSO, laudos, emissão de ASOs e o envio de eventos de SST ao eSocial, mantendo conformidade com as NRs e ISOs aplicáveis e eliminando pendências antes que virem passivo.",
  },
  {
    pain: "Dor 4 — Turnover, baixo engajamento e dificuldade de reter talento",
    question: "Perco gente boa e o time está desengajado. O que o ecossistema faz por retenção?",
    answer:
      "AVall.iÔ antecipa conflitos e riscos emocionais; ZapVida leva 1 consulta médica ou psicológica por mês a cada colaborador, sem coparticipação; e a Uninovia oferece formação continuada (microlearning, Upskilling, Reskilling, EJA, técnico e superior) via Cashback Social — cuidado e desenvolvimento que sustentam o engajamento.",
  },
  {
    pain: "Dor 5 — Muitos fornecedores desconectados",
    question: "Tenho um fornecedor para cada coisa e nenhum conversa entre si. Como a FourLife resolve?",
    answer:
      "A FourLife é o núcleo que conecta as 7 soluções — gestão inteligente, saúde mental, compliance de SST, medicina ocupacional, telemedicina, educação e estratégia — em uma única estratégia orquestrada por dados. Um contrato, um painel, uma direção. Começa por um diagnóstico gratuito.",
  },
];

/* --------------------------------------------------------------------------- */
/* Testimonials — from the legacy site fourlife.com.br                         */
/* --------------------------------------------------------------------------- */

export const testimonials = [
  {
    quote:
      "Conseguimos identificar causas de afastamento que estavam invisíveis e reduzir custos quase de imediato.",
    name: "Ana Paula Silva",
    role: "Gestora de RH · Indústria automotiva",
  },
  {
    quote:
      "A abordagem integrada de dados nos permitiu montar estratégias preventivas baseadas em evidência, não em achismo.",
    name: "Carlos Eduardo Mendes",
    role: "Diretor de Operações · Logística e transporte",
  },
  {
    quote:
      "A redução de custos foi rápida e veio junto com melhora real na qualidade de vida das equipes.",
    name: "Mariana Costa",
    role: "Gerente de Saúde Ocupacional · Setor químico",
  },
];

export const interestOptions = [
  "Diagnóstico gratuito",
  "Diferenciais Carlos Chagas (saúde ocupacional)",
  "Ecossistema completo",
  "Saúde mental & riscos psicossociais (AVall.iÔ)",
  "Compliance SST & eSocial (SGG)",
  "Medicina ocupacional & exames (LabDuo)",
  "Telemedicina (ZapVida)",
  "Educação corporativa (Uninovia)",
  "Estratégia & marketing (Agência Orion)",
  "Outro / não sei ainda",
] as const;
