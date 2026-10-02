"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Ajoute un fond et une bordure discrète au header dès que la page défile. */
export function HeaderFrame({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border bg-white/90 shadow-[0_8px_30px_-24px_rgba(58,40,82,0.5)] backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
          : "border-transparent bg-white",
      )}
    >
      {children}
    </header>
  );
}
