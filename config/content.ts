/**
 * Contenus éditoriaux du site. Chaque texte se modifie ici sans toucher aux composants.
 * Les passages signalés « À valider » décrivent des modalités de travail :
 * relisez-les pour vous assurer qu'ils correspondent à votre pratique.
 */
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building,
  Compass,
  Ear,
  Handshake,
  HeartHandshake,
  Layers,
  ChartLine,
  MessagesSquare,
  Route,
  Scale,
  ScanSearch,
  ShieldCheck,
  Sprout,
  Target,
  UserRound,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

export const hero = {
  title: "Donnons à vos enjeux humains une nouvelle dimension.",
  /** Mot du titre mis en valeur dans le hero */
  titleHighlight: "humains",
  subtitle:
    "J'accompagne les entreprises dans leurs enjeux RH, le développement des compétences et la structuration de leurs pratiques pour concilier performance organisationnelle et épanouissement humain.",
  primaryCta: "Découvrir mes expertises",
  secondaryCta: "Prendre rendez-vous",
  reassurance: [
    { icon: MessagesSquare, label: "Un premier échange pour cerner votre besoin" },
    { icon: UserRound, label: "Une interlocutrice unique" },
    { icon: ShieldCheck, label: "Des échanges confidentiels" },
  ],
} as const;

export const valueProposition = {
  title: "Les ressources humaines au service de votre stratégie.",
  intro:
    "Une fonction RH solide ne se résume pas à des procédures. Elle aide l'entreprise à recruter, fidéliser, faire grandir ses équipes et prendre de meilleures décisions. azurya vous apporte un regard extérieur et des outils concrets, à la mesure de votre organisation.",
  commitments: [
    {
      icon: HeartHandshake,
      title: "Une approche humaine et personnalisée",
      text: "Chaque entreprise a sa culture, son histoire et ses contraintes. L'accompagnement part de votre réalité, pas d'un modèle standard.",
    },
    {
      icon: Target,
      title: "Des solutions concrètes, adaptées à vos enjeux",
      text: "Des recommandations applicables par vos équipes, avec des outils et des documents que vous pouvez faire vivre au quotidien.",
    },
    {
      icon: ChartLine,
      title: "Un accompagnement pragmatique, orienté résultats",
      text: "Des priorités claires, des étapes définies ensemble et un suivi de ce qui change réellement dans votre organisation.",
    },
  ],
} as const;

export interface Expertise {
  id: string;
  icon: LucideIcon;
  title: string;
  benefit: string;
  points: readonly string[];
}

export const expertises: readonly Expertise[] = [
  {
    id: "strategie-rh",
    icon: Compass,
    title: "Conseil et stratégie RH",
    benefit: "Donner à votre fonction RH un cap clair, aligné sur les priorités de l'entreprise.",
    points: [
      "Structuration des pratiques RH",
      "Accompagnement des dirigeants",
      "Optimisation des processus RH",
    ],
  },
  {
    id: "entretiens-professionnels",
    icon: Route,
    title: "Entretiens et parcours professionnels",
    benefit: "Faire des entretiens un vrai temps d'échange, utile aux collaborateurs comme à l'entreprise.",
    points: [
      "Préparation et organisation des campagnes d'entretiens",
      "Accompagnement des managers et des collaborateurs",
      "Analyse des besoins en compétences",
      "Identification des perspectives d'évolution",
    ],
  },
  {
    id: "competences-formation",
    icon: Sprout,
    title: "Gestion des compétences et formation",
    benefit: "Développer les compétences dont votre organisation aura besoin demain.",
    points: [
      "Identification des besoins en formation",
      "Construction de plans de développement des compétences",
      "Accompagnement des parcours professionnels",
    ],
  },
  {
    id: "rh-externalisee",
    icon: Handshake,
    title: "Accompagnement RH externalisé",
    benefit: "Disposer d'une expertise RH quand vous en avez besoin, sans alourdir votre structure.",
    points: [
      "Appui opérationnel aux équipes RH",
      "Gestion de projets RH",
      "Renfort ponctuel ou accompagnement régulier",
    ],
  },
  {
    id: "conformite-rh",
    icon: Scale,
    title: "Conformité et structuration RH",
    benefit: "Sécuriser vos obligations et poser des bases RH solides et lisibles.",
    points: [
      "Accompagnement sur les obligations RH",
      "Structuration des documents et processus",
      "Mise en place de démarches RH adaptées à l'entreprise",
    ],
  },
  {
    id: "remuneration",
    icon: Wallet,
    title: "Rémunération et politique RH",
    benefit: "Construire des pratiques de rémunération cohérentes, compréhensibles et équitables.",
    points: [
      "Accompagnement sur les enjeux de rémunération",
      "Transparence salariale",
      "Structuration des pratiques et dispositifs RH",
    ],
  },
];

/** Options du champ « Type de besoin » du formulaire */
export const needOptions = [
  ...expertises.map((e) => ({ value: e.id, label: e.title })),
  { value: "autre", label: "Autre besoin ou projet spécifique" },
] as const;

export const audiences = {
  title: "Pour qui ?",
  intro:
    "Des organisations de tailles et de maturités différentes, avec un point commun : le besoin d'un regard RH expert et d'un accompagnement à leur mesure.",
  items: [
    {
      icon: Building,
      title: "TPE et PME",
      text: "Vous n'avez pas de service RH dédié et souhaitez vous appuyer sur une expertise fiable.",
    },
    {
      icon: Layers,
      title: "Entreprises en croissance",
      text: "Vos effectifs évoluent et vos pratiques RH doivent suivre le rythme.",
    },
    {
      icon: Users,
      title: "Directions des ressources humaines",
      text: "Vous cherchez un appui sur un projet précis ou un regard extérieur sur vos pratiques.",
    },
    {
      icon: Compass,
      title: "Dirigeants qui structurent leur fonction RH",
      text: "Vous voulez poser des bases claires avant de recruter ou de réorganiser.",
    },
    {
      icon: Wrench,
      title: "Organisations en besoin de renfort",
      text: "Une période chargée, une absence, un projet : vous avez besoin de bras et d'expertise, rapidement.",
    },
  ],
} as const;

export const method = {
  title: "Un accompagnement structuré, du diagnostic à l'action.",
  intro:
    "Quatre temps pour avancer avec méthode, sans perdre de vue la réalité du terrain.",
  steps: [
    { icon: Ear, verb: "Écouter", text: "Comprendre votre organisation, vos enjeux et vos besoins." },
    { icon: ScanSearch, verb: "Analyser", text: "Identifier les priorités et les axes d'amélioration." },
    { icon: Layers, verb: "Construire", text: "Définir une stratégie et des solutions adaptées." },
    { icon: BadgeCheck, verb: "Accompagner", text: "Déployer les actions et suivre les résultats." },
  ],
} as const;

/**
 * Section À propos.
 * `highlights` : parcours, diplômes, certifications… Laisser vide tant qu'ils ne sont pas fournis ;
 * la liste n'apparaît que si elle contient au moins un élément.
 */
export const about = {
  title: "Une partenaire RH, à vos côtés.",
  paragraphs: [
    "Je suis Romane Lancien, consultante en ressources humaines. J'ai créé azurya avec une conviction : les questions RH se traitent mieux lorsqu'on prend le temps de comprendre l'entreprise, ses équipes et ce qui les fait avancer.",
    "Mon rôle est de vous apporter à la fois une vision stratégique et un appui opérationnel : clarifier les priorités, construire les bons outils et vous accompagner dans leur mise en œuvre, avec la discrétion que ces sujets exigent.",
  ],
  highlights: [] as readonly string[],
} as const;

export const reasons = {
  title: "Pourquoi choisir azurya ?",
  intro:
    "Un accompagnement pensé pour s'adapter à votre organisation, et non l'inverse.",
  items: [
    {
      title: "Une approche adaptée à chaque organisation",
      text: "Le périmètre, le rythme et les outils s'ajustent à votre taille et à votre maturité RH.",
    },
    {
      title: "Une vision globale des enjeux humains et organisationnels",
      text: "Compétences, management, conformité et rémunération sont abordés comme un ensemble cohérent.",
    },
    {
      title: "Des recommandations concrètes et applicables",
      text: "Chaque préconisation est pensée pour être mise en œuvre par vos équipes.",
    },
    {
      title: "Une interlocutrice dédiée",
      text: "Vous échangez avec la même personne du premier rendez-vous jusqu'au suivi.",
    },
    {
      title: "Une relation fondée sur la confiance et la confidentialité",
      text: "Les informations sur vos équipes et votre organisation restent strictement confidentielles.",
    },
  ],
} as const;

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

/**
 * Témoignages clients réels uniquement, avec l'accord des personnes citées.
 * La section reste masquée tant que la liste est vide.
 */
export const testimonials: readonly Testimonial[] = [];

export const faq = {
  title: "Questions fréquentes",
  intro: "Vous ne trouvez pas votre réponse ? Posez directement votre question.",
  items: [
    {
      question: "À quelles entreprises s'adressent vos prestations ?",
      answer:
        "Aux TPE et PME, aux entreprises en croissance, aux directions RH qui ont besoin d'un appui et aux dirigeants qui souhaitent structurer leur fonction RH. L'accompagnement s'adapte à la taille et à l'organisation de chaque structure.",
    },
    {
      question: "Comment se déroule un premier échange ?",
      answer:
        "C'est un temps d'écoute pour comprendre votre contexte, vos priorités et vos contraintes. À l'issue de cet échange, je vous indique comment je peux vous accompagner et quelles pourraient être les prochaines étapes.",
    },
    {
      question: "Proposez-vous des missions ponctuelles ou un accompagnement régulier ?",
      answer:
        "Les deux. Il peut s'agir d'une mission ciblée sur un projet précis ou d'un accompagnement dans la durée. Le format est défini ensemble en fonction de vos besoins.",
    },
    {
      question: "Peut-on faire appel à vous pour un projet RH spécifique ?",
      answer:
        "Oui. Campagne d'entretiens professionnels, plan de développement des compétences, mise en conformité, réflexion sur la rémunération : un projet précis peut faire l'objet d'un accompagnement dédié.",
    },
    {
      question: "Comment obtenir un devis ?",
      answer:
        "Décrivez votre besoin via le formulaire de contact ou par e-mail. Après un premier échange, vous recevez une proposition détaillée, construite à partir de vos besoins.",
    },
    {
      question: "Intervenez-vous à distance ou sur site ?",
      // À valider selon votre pratique.
      answer:
        "Le cabinet est basé à Rouen. Les modalités d'intervention, à distance, sur site ou en format mixte, sont définies avec vous en fonction de la mission.",
    },
  ],
} as const;

export const contactSection = {
  title: "Parlons de vos enjeux RH.",
  text: "Vous avez un projet, un besoin ponctuel ou souhaitez structurer votre organisation RH ? Échangeons sur vos besoins et identifions ensemble les solutions adaptées.",
} as const;

export const footer = {
  description:
    "Cabinet de conseil en ressources humaines. Stratégie RH, compétences, conformité et accompagnement opérationnel des entreprises.",
} as const;
