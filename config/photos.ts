/**
 * Photographies d'illustration (Unsplash, licence libre d'usage commercial, sans mention obligatoire).
 * Elles sont créditées dans les mentions légales.
 *
 * Pour la mise en production, il est conseillé de télécharger les fichiers dans /public/images
 * et de remplacer `src` par un chemin local (ex. "/images/hero.jpg").
 * `position` règle le cadrage dans la forme (équivalent de CSS object-position).
 */
export interface Photo {
  src: string;
  alt: string;
  position?: string;
  credit: { author: string; url: string };
}

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1600`;

export const photos = {
  hero: {
    src: unsplash("photo-1590649681928-4b179f773bd5"),
    alt: "Deux femmes échangent debout autour d'un bureau dans un espace de travail lumineux",
    position: "50% 40%",
    credit: { author: "LinkedIn Sales Solutions", url: "https://unsplash.com/photos/qbDiSp5IqxA" },
  },
  value: {
    src: unsplash("photo-1553028826-f4804a6dba3b"),
    alt: "Une équipe réunie autour d'une table en bois pour un temps de travail",
    position: "50% 50%",
    credit: { author: "CoWomen", url: "https://unsplash.com/photos/ZKHksse8tUU" },
  },
  audiences: {
    src: unsplash("photo-1681949270990-cecd4728d2e0"),
    alt: "Un groupe de collaboratrices réfléchit ensemble devant un tableau blanc",
    position: "45% 50%",
    credit: { author: "Sable Flow", url: "https://unsplash.com/photos/pNodosEZ5Oc" },
  },
  cta: {
    src: unsplash("photo-1646296066880-c61cac79470b"),
    alt: "Deux femmes travaillent côte à côte sur un ordinateur portable",
    position: "50% 45%",
    credit: { author: "CoWomen", url: "https://unsplash.com/photos/YqBORf3ggKA" },
  },
} satisfies Record<string, Photo>;

/**
 * Section « Pour qui ? » : une photo par public, dans l'ordre de `audiences.items` (config/content.ts).
 * La photo affichée suit l'élément survolé dans la liste.
 */
export const audiencePhotos: Photo[] = [
  {
    src: unsplash("photo-1522071820081-009f0129c71c"),
    alt: "Une petite équipe travaille sur des ordinateurs portables autour d'une même table",
    position: "50% 50%",
    credit: { author: "Annie Spratt", url: "https://unsplash.com/photos/QckxruozjRg" },
  },
  {
    src: unsplash("photo-1552664730-d307ca884978"),
    alt: "Une collaboratrice organise des notes de couleur sur un mur pendant une réunion d'équipe",
    position: "50% 50%",
    credit: { author: "Jason Goodman", url: "https://unsplash.com/photos/Oalh2MojUuk" },
  },
  photos.audiences,
  {
    src: unsplash("photo-1542744173-8e7e53415bb0"),
    alt: "Un dirigeant présente un projet à son équipe réunie autour d'une table de réunion",
    position: "25% 50%",
    credit: { author: "Campaign Creators", url: "https://unsplash.com/photos/gMsnXqILjp4" },
  },
  {
    src: unsplash("photo-1517245386807-bb43f82c33c4"),
    alt: "Gros plan sur les mains d'une personne qui explique un sujet à une collègue devant un ordinateur",
    position: "40% 50%",
    credit: { author: "Headway", url: "https://unsplash.com/photos/5QgIuuBxKwM" },
  },
];
