import Image from "next/image";

import { Glyph } from "@/components/brand/glyph";
import type { GlyphName } from "@/components/brand/logo-paths";
import { cn } from "@/lib/utils";

/**
 * Photographie découpée dans une forme issue du logotype, accompagnée de symboles de la charte.
 *
 * Formes :
 *  - arch    : arche, la courbe haute du « u » retournée
 *  - a       : la lettre « a » du logo, arrondie à gauche et franche à droite
 *  - quarter : un grand quart de cercle, comme les tuiles du motif
 *  - circle  : la pastille des motifs à pois
 */
export type PhotoShape = "arch" | "a" | "quarter" | "circle";

export type Accent =
  | { kind: "dot"; color: string; className: string }
  | { kind: "quarter"; color: string; corner: "tl" | "tr" | "bl" | "br"; className: string }
  | { kind: "diag"; color: string; className: string }
  | { kind: "bar"; color: string; className: string }
  | { kind: "glyph"; letter: GlyphName; color: string; bg: string; className: string };

const shapeClass: Record<PhotoShape, string> = {
  arch: "rounded-t-[999px] rounded-b-[1.25rem]",
  a: "rounded-l-[999px] rounded-r-[1.25rem]",
  quarter: "rounded-tl-[100%] rounded-tr-[1.25rem] rounded-br-[1.25rem] rounded-bl-[1.25rem]",
  circle: "rounded-full",
};

const quarterClass = {
  tl: "rounded-tl-full",
  tr: "rounded-tr-full",
  bl: "rounded-bl-full",
  br: "rounded-br-full",
} as const;

function AccentShape({ accent, index, animate }: { accent: Accent; index: number; animate: boolean }) {
  const motionClass = animate
    ? "animate-in fade-in zoom-in-50 fill-mode-both duration-700 ease-(--ease-brand)"
    : undefined;
  const style = animate ? { animationDelay: `${250 + index * 120}ms` } : undefined;
  const base = cn("pointer-events-none absolute", motionClass, accent.className);

  switch (accent.kind) {
    case "dot":
      return <span className={cn(base, "aspect-square rounded-full")} style={{ ...style, background: accent.color }} />;
    case "quarter":
      return (
        <span
          className={cn(base, "aspect-square", quarterClass[accent.corner])}
          style={{ ...style, background: accent.color }}
        />
      );
    case "diag":
      return (
        <span
          className={cn(base, "aspect-[1/2.4]")}
          style={{ ...style, background: accent.color, clipPath: "polygon(0 0, 46% 0, 100% 100%, 54% 100%)" }}
        />
      );
    case "bar":
      return <span className={cn(base, "shape-a aspect-[2.4/1]")} style={{ ...style, background: accent.color }} />;
    case "glyph":
      return (
        <span
          className={cn(base, "grid aspect-square place-items-center rounded-[22%] p-[20%]")}
          style={{ ...style, background: accent.bg }}
        >
          <Glyph letter={accent.letter} color={accent.color} className="size-full" />
        </span>
      );
  }
}

interface ShapedPhotoProps {
  src: string;
  alt: string;
  shape: PhotoShape;
  accents?: Accent[];
  /** Ratio de la zone photo, ex. "aspect-[4/5]" */
  aspect?: string;
  position?: string;
  sizes: string;
  priority?: boolean;
  /** Apparition des symboles au chargement (à réserver au hero) */
  animate?: boolean;
  /** Photos supplémentaires superposées ; `active` désigne celle affichée (0 = photo principale) */
  alternates?: Array<{ src: string; alt: string; position?: string }>;
  active?: number;
  className?: string;
}

export function ShapedPhoto({
  src,
  alt,
  shape,
  accents = [],
  aspect = "aspect-[4/5]",
  position,
  sizes,
  priority = false,
  animate = false,
  alternates = [],
  active = 0,
  className,
}: ShapedPhotoProps) {
  return (
    <div className={cn("relative isolate", className)}>
      <div className={cn("relative overflow-hidden bg-blush-soft", aspect, shapeClass[shape])}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover transition-opacity duration-700 ease-(--ease-brand)", active !== 0 && "opacity-0")}
          style={position ? { objectPosition: position } : undefined}
        />
        {alternates.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            aria-hidden={active === i + 1 ? undefined : "true"}
            className={cn(
              "object-cover transition-[opacity,scale] duration-700 ease-(--ease-brand)",
              active === i + 1 ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
            style={photo.position ? { objectPosition: photo.position } : undefined}
          />
        ))}
      </div>
      <div aria-hidden="true">
        {accents.map((accent, i) => (
          <AccentShape key={i} accent={accent} index={i} animate={animate} />
        ))}
      </div>
    </div>
  );
}
