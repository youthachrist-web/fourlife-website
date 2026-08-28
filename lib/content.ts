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
  slogan: "Educação que previne, saúde que transforma.",
  shortDescription:
    "O primeiro ecossistema unificado de produtividade e saúde corporativa do Brasil.",
  description:
    "A FourLife integra saúde preventiva, engenharia de segurança, tecnologia e educação em uma única estratégia para reduzir absenteísmo, garantir conformidade e transformar saúde em ROI mensurável.",
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
  { label: "Ecossistema", href: "/#ecossistema" },
  { label: "Soluções", href: "/solucoes" },
  { label: "Método", href: "/metodo" },
  { label: "Diagnóstico 360º", href: "/diagnostico" },
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
  sources: [
    { label: "g1 · 26/01/2026", detail: "546 mil afastamentos por saúde mental em 2025" },
    { label: "INSS", detail: "Perfil epidemiológico — auxílio-doença" },
    { label: "OMS / ISST 2024", detail: "Burnout no trabalho do conhecimento" },
  ],
};

export const presenteeismStats: { value: string; label: string }[] = [
  { value: "34%", label: "dos colaboradores apresentam sinais de presenteísmo" },
  { value: "74%", label: "dos afastamentos ligados a transtornos mentais e dores crônicas" },
  { value: "19%", label: "das jornadas perdidas com queda de foco e fadiga" },
  { value: "92%", label: "das empresas não medem o impacto financeiro do presenteísmo" },
  { value: "2%", label: "dos gestores identificam o presenteísmo precocemente" },
  { value: "267%", label: "de alta em processos por burnout em SC em 9 anos" },
];

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
    // Coloque o arquivo em public/images/reality-industria.jpg — o SafeImage
    // mostra um placeholder elegante enquanto ele não existir.
    src: "/images/reality-industria.jpg",
    alt: "Operador industrial com colete refletivo sentado, cabeça apoiada na mão, ao lado do capacete.",
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
  turn: {
    title: "A FourLife transforma esse custo em investimento com retorno mensurável",
    items: [
      "Prevenção que reduz afastamento e reposição de mão de obra.",
      "Conformidade (SGG + eSocial) que elimina passivo e multa.",
      "People Analytics que mostra, em números, o retorno de cada frente.",
    ],
  },
};

/* --------------------------------------------------------------------------- */
/* The shift — from isolated services to an ecosystem                          */
/* --------------------------------------------------------------------------- */

export const pillars = [
  { name: "Prevenção", detail: "Antecipa o adoecimento antes do afastamento." },
  { name: "Conformidade", detail: "Garante NRs e eventos de SST no eSocial." },
  { name: "Educação", detail: "Capacita e retém talento de forma contínua." },
  { name: "Performance", detail: "Transforma saúde em ROI mensurável." },
];

export const ecosystemIntro = {
  eyebrow: "A nova visão",
  title: "De soluções isoladas para um ecossistema",
  body: "Saúde, segurança, educação, tecnologia e estratégia trabalhando juntas. A empresa deixa de reagir aos problemas e passa a antecipar resultados.",
  equation: "Saúde + Segurança + Educação + Tecnologia + Estratégia = Performance com ROI",
};

export const ecosystemStats = [
  { value: "7", label: "soluções integradas" },
  { value: "4", label: "pilares estratégicos" },
  { value: "360º", label: "diagnóstico do negócio" },
  { value: "ROI", label: "mensurável por serviço" },
];

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
/* The method                                                                  */
/* --------------------------------------------------------------------------- */

export const method = {
  eyebrow: "O Método Orion",
  title: "A engenharia de crescimento do ecossistema",
  body: "A marca vende antes do vendedor, o marketing prova com dados, a venda converte com perguntas e a base expande com o próximo produto.",
  note: "IA com direção humana: alavanca de produção, nunca substituta da tese.",
  steps: [
    {
      number: "01",
      name: "Marca",
      headline: "Saúde vira marca empregadora",
      detail: "Audiência e desejo antes da oferta.",
    },
    {
      number: "02",
      name: "Marketing",
      headline: "Educação que previne",
      detail: "Consciência de graça, consequência paga.",
    },
    {
      number: "03",
      name: "Vendas",
      headline: "Diagnóstico que converte",
      detail: "Perguntas antes de pitch; qualificação radical.",
    },
    {
      number: "04",
      name: "Expansão",
      headline: "Próximo produto em escala",
      detail: "10% da base compra 10x. Cashback Social multiplica.",
    },
  ],
};

/* --------------------------------------------------------------------------- */
/* Diagnóstico 360º                                                            */
/* --------------------------------------------------------------------------- */

export const diagnostico = {
  eyebrow: "Diagnóstico 360º",
  title: "Oito blocos antes da solução",
  body: "O diagnóstico mapeia o dinheiro oculto do seu negócio. A entrega são 3 prioridades — as de maior impacto na receita pelo menor esforço. Não 30 páginas: 3 prioridades que vendem o plano.",
  blocks: [
    { number: "01", name: "Fundamentos", detail: "Problema real e meta de 12 meses." },
    { number: "02", name: "Marca", detail: "“Somos os únicos que…” + arquétipo." },
    { number: "03", name: "Público", detail: "Perfil que converte + medo e ambição." },
    { number: "04", name: "Aquisição", detail: "Canais por % e dependência." },
    { number: "05", name: "Conversão", detail: "Funil, script de perguntas, fugas." },
    { number: "06", name: "Retenção", detail: "LTV e o próximo produto (10% / 10x)." },
    { number: "07", name: "Números", detail: "Kit de 6 métricas · CAC × LTV ≥ 3×." },
    { number: "08", name: "IA & Automação", detail: "Voz documentada + último olho humano." },
  ],
};

export const metricsKit = {
  eyebrow: "O Kit de 6 métricas",
  title: "O que importa vira número no caixa",
  body: "Nada de likes e impressões como resultado. Toda ação com indicador definido antes de começar.",
  footnote:
    "Acrescido de CAC × LTV ≥ 3× por canal — a conta que define se dá para escalar.",
  metrics: [
    { name: "Receita", detail: "Crescimento real no papel, sem receita que esconde prejuízo." },
    { name: "Lucro", detail: "Margem por serviço — há quem venda e perca dinheiro." },
    { name: "Quota de mercado", detail: "Tração no segmento-alvo vs. concorrência." },
    { name: "Saúde da marca", detail: "Busca orgânica, % de vendas do orgânico, seguidores." },
    { name: "NPS / Reviews", detail: "Satisfação + avaliações Google — 1 melhoria por mês." },
    { name: "Gargalos", detail: "Onde a operação trava a promessa do marketing." },
  ],
};

/* --------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* --------------------------------------------------------------------------- */

/** FAQ organizada pelas 5 dores mais comuns de quem gere SST e RH. */
export const faq = [
  {
    pain: "Dor 1 — Absenteísmo alto e sem causa clara",
    question: "Minha empresa tem muitos afastamentos e eu não sei o motivo real. Como a FourLife ajuda?",
    answer:
      "O Diagnóstico 360º e o People Analytics da FourLife cruzam dados de saúde física, saúde mental, clima e conformidade para revelar as causas ocultas do absenteísmo — de risco psicossocial a dor osteomuscular — e apontam as 3 frentes de maior impacto na receita pelo menor esforço.",
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
      "A FourLife é o núcleo que conecta as 7 soluções — gestão inteligente, saúde mental, compliance de SST, medicina ocupacional, telemedicina, educação e estratégia — em uma única estratégia orquestrada por dados. Um contrato, um painel, uma direção. Começa pelo Diagnóstico 360º.",
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
  "Diagnóstico 360º",
  "Ecossistema completo",
  "Saúde mental & riscos psicossociais (AVall.iÔ)",
  "Compliance SST & eSocial (SGG)",
  "Medicina ocupacional & exames (LabDuo)",
  "Telemedicina (ZapVida)",
  "Educação corporativa (Uninovia)",
  "Estratégia & marketing (Agência Orion)",
  "Outro / não sei ainda",
] as const;
