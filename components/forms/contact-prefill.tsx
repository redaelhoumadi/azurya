"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface PrefillState {
  need: string | null;
  setNeed: (need: string | null) => void;
}

const PrefillContext = createContext<PrefillState | null>(null);

/** Permet aux cartes d'expertise de présélectionner le type de besoin dans le formulaire. */
export function ContactPrefillProvider({ children }: { children: ReactNode }) {
  const [need, setNeed] = useState<string | null>(null);
  return <PrefillContext.Provider value={{ need, setNeed }}>{children}</PrefillContext.Provider>;
}

export function useContactPrefill(): PrefillState {
  const ctx = useContext(PrefillContext);
  if (!ctx) throw new Error("useContactPrefill doit être utilisé dans ContactPrefillProvider");
  return ctx;
}
