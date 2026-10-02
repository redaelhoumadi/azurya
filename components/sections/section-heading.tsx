import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  size?: "md" | "lg";
  align?: "left" | "center";
}

/** Titre de section H2 + chapeau, avec le trait diagonal du y comme repère. */
export function SectionHeading({
  id,
  title,
  intro,
  tone = "dark",
  className,
  size = "md",
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <span
        aria-hidden="true"
        className={cn("mb-6 block h-8 w-3.5 bg-blush", align === "center" && "mx-auto")}
        style={{ clipPath: "polygon(0 0, 45% 0, 100% 100%, 55% 100%)" }}
      />
      <h2
        id={id}
        className={cn(
          "display leading-[1.08]",
          size === "lg" ? "text-[clamp(2rem,4.6vw,3.5rem)]" : "text-[clamp(1.875rem,3.6vw,2.75rem)]",
          tone === "dark" ? "text-ink" : "text-white",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "prose-body mt-5 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-graphite" : "text-white/80",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
