import { Glyph } from "@/components/brand/glyph";
import type { GlyphName } from "@/components/brand/logo-paths";
import { cn } from "@/lib/utils";

/**
 * Tuiles du motif de marque azurya, dérivées des formes du logotype :
 * lettres, quarts de cercle, trait diagonal du y, barre arrondie du a, pastilles.
 */
export type TileSpec =
  | { kind: "glyph"; letter: GlyphName; fg: string; bg: string; accent?: string }
  | { kind: "quarter"; corner: "tl" | "tr" | "bl" | "br"; fg: string; bg: string }
  | { kind: "half"; side: "top" | "bottom"; fg: string; bg: string }
  | { kind: "dot"; size?: "sm" | "md"; fg: string; bg: string }
  | { kind: "diag"; fg: string; bg: string }
  | { kind: "bar"; fg: string; bg: string }
  | { kind: "solid"; bg: string };

const quarterRadius: Record<"tl" | "tr" | "bl" | "br", string> = {
  tl: "rounded-tl-full",
  tr: "rounded-tr-full",
  bl: "rounded-bl-full",
  br: "rounded-br-full",
};

export function TileShape({ spec }: { spec: TileSpec }) {
  switch (spec.kind) {
    case "glyph":
      return (
        <div className="grid size-full place-items-center p-[20%]" style={{ background: spec.bg }}>
          <Glyph letter={spec.letter} color={spec.fg} accent={spec.accent} className="size-full" />
        </div>
      );
    case "quarter":
      return (
        <div className="size-full" style={{ background: spec.bg }}>
          <div className={cn("size-full", quarterRadius[spec.corner])} style={{ background: spec.fg }} />
        </div>
      );
    case "half":
      return (
        <div
          className={cn("flex size-full", spec.side === "top" ? "items-end" : "items-start")}
          style={{ background: spec.bg }}
        >
          <div
            className={cn("h-1/2 w-full", spec.side === "top" ? "rounded-t-full" : "rounded-b-full")}
            style={{ background: spec.fg }}
          />
        </div>
      );
    case "dot":
      return (
        <div className="grid size-full place-items-center" style={{ background: spec.bg }}>
          <div
            className={cn("aspect-square rounded-full", spec.size === "sm" ? "w-[34%]" : "w-[62%]")}
            style={{ background: spec.fg }}
          />
        </div>
      );
    case "diag":
      return (
        <div className="size-full" style={{ background: spec.bg }}>
          <div
            className="size-full"
            style={{
              background: spec.fg,
              clipPath: "polygon(14% 0, 46% 0, 86% 100%, 54% 100%)",
            }}
          />
        </div>
      );
    case "bar":
      return (
        <div className="grid size-full place-items-center" style={{ background: spec.bg }}>
          <div className="shape-a h-[38%] w-[78%]" style={{ background: spec.fg }} />
        </div>
      );
    case "solid":
      return <div className="size-full" style={{ background: spec.bg }} />;
  }
}

/** Palette utilisée par les motifs */
export const tone = {
  brand: "var(--color-brand)",
  deep: "var(--color-brand-deep)",
  blush: "var(--color-blush)",
  soft: "var(--color-blush-soft)",
  mist: "var(--color-mist)",
  white: "#ffffff",
  ink: "var(--color-ink)",
} as const;
