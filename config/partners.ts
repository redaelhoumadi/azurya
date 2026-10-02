import type { StaticImageData } from "next/image";

import afpa from "@/public/images/partners/afpa.png";
import cecopRh from "@/public/images/partners/cecop-rh.png";
import mcdonalds from "@/public/images/partners/mcdonalds.png";
import psg from "@/public/images/partners/paris-saint-germain.png";
import schneider from "@/public/images/partners/schneider-electric.png";
import sncf from "@/public/images/partners/sncf.png";
import visionInterim from "@/public/images/partners/vision-interim.png";

export interface Partner {
  name: string;
  logo: StaticImageData;
  /** Hauteur d'affichage (classes Tailwind), ajustée selon les marges internes de chaque logo */
  height: string;
}

/**
 * Logos du bandeau « Nos partenaires ».
 * Pour en ajouter un : déposer le fichier dans public/images/partners/, l'importer ici et l'ajouter à la liste.
 */
export const partners: Partner[] = [
  { name: "Paris Saint-Germain", logo: psg, height: "h-14 sm:h-16" },
  { name: "Schneider Electric", logo: schneider, height: "h-12 sm:h-14" },
  { name: "SNCF", logo: sncf, height: "h-9 sm:h-10" },
  { name: "McDonald's", logo: mcdonalds, height: "h-12 sm:h-14" },
  { name: "CECOP-RH", logo: cecopRh, height: "h-7 sm:h-8" },
  { name: "Afpa", logo: afpa, height: "h-12 sm:h-14" },
  { name: "Vision Intérim", logo: visionInterim, height: "h-28 sm:h-32" },
];
