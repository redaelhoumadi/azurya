import localFont from "next/font/local";

/**
 * Poppins, auto-hébergée : aucun appel à un service tiers, aucun décalage de mise en page.
 */
export const poppins = localFont({
  src: [
    { path: "../app/fonts/Poppins-300.woff2", weight: "300", style: "normal" },
    { path: "../app/fonts/Poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/Poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/Poppins-600.woff2", weight: "600", style: "normal" },
    { path: "../app/fonts/Poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

/**
 * Surgena SemiBold (police de titrage de la charte), utilisée par --font-display.
 * Le fichier fourni est la version « Personal Use Only » : une licence commerciale
 * est nécessaire avant la mise en ligne du site.
 */
export const surgena = localFont({
  src: [
    {
      path: "../app/fonts/surgenapersonaluseonlysembd-q2qwd.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-surgena",
  display: "swap",
});
