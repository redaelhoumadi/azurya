import { cn } from "@/lib/utils";
import {
  LOGO_PATH_ACCENT,
  LOGO_PATH_PRIMARY,
  LOGO_TRANSFORM,
  LOGO_VIEWBOX,
} from "@/components/brand/logo-paths";

interface LogoProps {
  /** "brand" sur fond clair, "light" sur fond sombre */
  tone?: "brand" | "light";
  className?: string;
  /** Texte alternatif ; passer null si le logo est décoratif */
  title?: string | null;
}

export function Logo({ tone = "brand", className, title = "azurya" }: LogoProps) {
  const decorative = title === null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={LOGO_VIEWBOX}
      className={cn("h-7 w-auto", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      <g transform={LOGO_TRANSFORM}>
        <path fill={tone === "brand" ? "#74569C" : "#FFFFFF"} d={LOGO_PATH_PRIMARY} />
        <path fill="#CEA6C9" d={LOGO_PATH_ACCENT} />
      </g>
    </svg>
  );
}
