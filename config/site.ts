/**
 * Configuration centrale du site azurya.
 *
 * Toutes les informations d'identité, de contact et les liens se modifient ici.
 * Une valeur `null` masque proprement l'élément correspondant sur le site :
 * aucun lien fictif n'est jamais affiché.
 */

export interface SiteConfig {
  /** Nom commercial du cabinet, tel qu'il apparaît dans le logo */
  name: string;
  /** Signature sous le logo */
  tagline: string;
  /** URL publique de production, sans slash final (utilisée pour le SEO) */
  url: string;
  locale: string;
  consultant: {
    fullName: string;
    /** Prénom utilisé dans les tournures personnelles */
    firstName: string;
    role: string;
    /**
     * Photo professionnelle : placer le fichier dans /public/images puis
     * renseigner le chemin, par exemple "/images/romane-lancien.jpg".
     */
    photo: { src: string; alt: string } | null;
  };
  contact: {
    email: string;
    /** Format E.164 pour les liens tel: */
    phone: string | null;
    /** Format lisible pour l'affichage */
    phoneDisplay: string | null;
    city: string;
  };
  links: {
    linkedin: string | null;
    /** Page de prise de rendez-vous (Calendly, Cal.com, Google Agenda…) */
    booking: string | null;
  };
  legal: {
    /** Raison sociale, forme juridique, SIRET, etc. À compléter avant la mise en ligne. */
    companyName: string | null;
    legalForm: string | null;
    siret: string | null;
    address: string | null;
    publicationDirector: string | null;
    host: { name: string; address: string } | null;
  };
}

export const siteConfig: SiteConfig = {
  name: "azurya",
  tagline: "Consulting ressources humaines",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.azuryarh.fr",
  locale: "fr_FR",
  consultant: {
    fullName: "Romane Lancien",
    firstName: "Romane",
    role: "Consultante RH",
    photo: null,
  },
  contact: {
    email: "contact@azuryarh.fr",
    phone: "+33698354071",
    phoneDisplay: "+33 6 98 35 40 71",
    city: "Rouen",
  },
  links: {
    linkedin: null, // [À RENSEIGNER] ex. "https://www.linkedin.com/in/…"
    booking: null, // [À RENSEIGNER] ex. "https://cal.com/azurya/premier-echange"
  },
  legal: {
    companyName: null, // [À RENSEIGNER]
    legalForm: null, // [À RENSEIGNER]
    siret: null, // [À RENSEIGNER]
    address: null, // [À RENSEIGNER]
    publicationDirector: "Romane Lancien",
    host: null, // [À RENSEIGNER] ex. { name: "Vercel Inc.", address: "…" }
  },
};

/** Cible du bouton « Prendre rendez-vous » : la page de réservation si elle existe, sinon le formulaire. */
export function getBookingHref(): { href: string; external: boolean } {
  return siteConfig.links.booking
    ? { href: siteConfig.links.booking, external: true }
    : { href: "/#contact", external: false };
}

export const navigation = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Expertises", href: "/#expertises" },
  { label: "Approche", href: "/#approche" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Contact", href: "/#contact" },
] as const;
