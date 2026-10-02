import { cn } from "@/lib/utils";
import {
  GLYPH_VIEWBOXES,
  LOGO_PATH_ACCENT,
  LOGO_PATH_PRIMARY,
  LOGO_TRANSFORM,
  type GlyphName,
} from "@/components/brand/logo-paths";

interface GlyphProps {
  letter: GlyphName;
  /** Couleur du tracé principal (valeur CSS) */
  color?: string;
  /** Couleur du trait diagonal du y */
  accent?: string;
  className?: string;
}

/** Une lettre isolée du logotype, pour composer les motifs de marque. Toujours décorative. */
export function Glyph({
  letter,
  color = "var(--color-brand)",
  accent = "var(--color-blush)",
  className,
}: GlyphProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={GLYPH_VIEWBOXES[letter]}
      className={cn("block", className)}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform={LOGO_TRANSFORM}>
        <path fill={color} d={LOGO_PATH_PRIMARY} />
        {letter === "y" ? <path fill={accent} d={LOGO_PATH_ACCENT} /> : null}
      </g>
    </svg>
  );
}
