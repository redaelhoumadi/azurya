"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface SliderDotsProps {
  /** id de la liste défilante (ses enfants directs sont les diapositives) */
  listId: string;
  /** Intitulé de chaque diapositive, dans l'ordre */
  labels: string[];
  className?: string;
}

function slidesOf(list: HTMLElement) {
  return Array.from(list.children) as HTMLElement[];
}

/** Points de pagination d'une liste à défilement horizontal. */
export function SliderDots({ listId, labels, className }: SliderDotsProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = document.getElementById(listId);
    if (!list) return;

    const update = () => {
      const slides = slidesOf(list);
      if (slides.length === 0) return;
      if (list.scrollLeft + list.clientWidth >= list.scrollWidth - 2) {
        setActive(slides.length - 1);
        return;
      }
      const origin = slides[0].offsetLeft;
      let closest = 0;
      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.offsetLeft - origin - list.scrollLeft);
        if (
          distance <
          Math.abs(slides[closest].offsetLeft - origin - list.scrollLeft)
        )
          closest = index;
      });
      setActive(closest);
    };

    update();
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      list.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [listId]);

  const goTo = (index: number) => {
    const list = document.getElementById(listId);
    if (!list) return;
    const slides = slidesOf(list);
    if (!slides[index]) return;
    list.scrollTo({
      left: slides[index].offsetLeft - slides[0].offsetLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          onClick={() => goTo(index)}
          aria-label={`Afficher : ${label}`}
          aria-current={index === active ? "true" : undefined}
          className="grid size-7 place-items-center rounded-full"
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-2 rounded-full transition-[width,background-color] duration-300",
              index === active ? "w-6 bg-brand" : "w-2 bg-haze",
            )}
          />
        </button>
      ))}
    </div>
  );
}
