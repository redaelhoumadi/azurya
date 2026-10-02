import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Conteneur de section : rythme vertical et fonds communs à toute la page.
 * Inspiré de la primitive Section de Launch UI (MIT, © Mikolaj Dobrucki).
 */
const sectionVariants = cva("relative py-20 sm:py-28", {
  variants: {
    tone: {
      white: "bg-white",
      mist: "bg-mist",
      ink: "on-dark bg-ink text-white",
      brand: "on-dark bg-brand text-white",
    },
  },
  defaultVariants: { tone: "white" },
});

function Section({
  className,
  tone,
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return <section data-slot="section" className={cn(sectionVariants({ tone }), className)} {...props} />;
}

export { Section, sectionVariants };
