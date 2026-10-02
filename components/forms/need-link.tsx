"use client";

import type { ReactNode } from "react";

import { useContactPrefill } from "@/components/forms/contact-prefill";
import { cn } from "@/lib/utils";

interface NeedLinkProps {
  need: string;
  className?: string;
  children: ReactNode;
}

/** Lien vers le formulaire qui présélectionne le besoin correspondant. Fonctionne aussi sans JavaScript. */
export function NeedLink({ need, className, children }: NeedLinkProps) {
  const { setNeed } = useContactPrefill();
  return (
    <a href="#contact" onClick={() => setNeed(need)} className={cn(className)}>
      {children}
    </a>
  );
}
