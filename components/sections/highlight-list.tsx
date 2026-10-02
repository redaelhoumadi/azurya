"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HighlightItem {
  title: string;
  text: string;
  icon: ReactNode;
}

/**
 * Liste dont l'élément situé au centre de l'écran est mis en avant pendant le défilement,
 * les autres restant lisibles (contraste AA conservé).
 */
export function HighlightList({
  items,
  onActiveChange,
}: {
  items: HighlightItem[];
  /** Appelé quand l'élément mis en avant change (défilement, survol ou focus) */
  onActiveChange?: (index: number) => void;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(index)) setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  return (
    <ul className="space-y-2">
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <li
            key={item.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            onMouseEnter={() => setActive(i)}
            className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 py-5 sm:gap-x-6"
          >
            <span
              aria-hidden="true"
              className={cn(
                "mt-1.5 h-9 w-4 justify-self-center bg-blush transition-[opacity,transform] duration-500 ease-(--ease-brand)",
                isActive ? "scale-100 opacity-100" : "scale-75 opacity-0",
              )}
              style={{ clipPath: "polygon(0 0, 45% 0, 100% 100%, 55% 100%)" }}
            />
            <div>
              <h3
                className={cn(
                  "display flex items-center gap-3 text-[clamp(1.375rem,2.4vw,2rem)] leading-tight transition-colors duration-500",
                  isActive ? "text-white" : "text-white/55",
                )}
              >
                <span className={cn("transition-colors duration-500", isActive ? "text-blush" : "text-white/40")}>
                  {item.icon}
                </span>
                {item.title}
              </h3>
              <p
                className={cn(
                  "prose-body mt-2 max-w-md leading-relaxed transition-colors duration-500",
                  isActive ? "text-white/85" : "text-white/55",
                )}
              >
                {item.text}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
