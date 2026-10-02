"use client";

import { motion, useReducedMotion } from "motion/react";

import { method } from "@/config/content";

const ease = [0.22, 1, 0.36, 1] as const;

/** Frise en quatre étapes. Le fil se trace au défilement, une seule fois. */
export function MethodSteps() {
  const reduce = useReducedMotion();

  return (
    <ol className="relative mt-14 grid gap-0 sm:mt-20 lg:grid-cols-4 lg:gap-8">
      {/* Fil horizontal (desktop) */}
      <motion.span
        aria-hidden="true"
        className="absolute top-6 right-0 left-0 hidden h-px origin-left bg-blush lg:block"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, ease }}
      />
      {/* Fil vertical (mobile et tablette) */}
      <motion.span
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-6 w-px origin-top bg-blush lg:hidden"
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease }}
      />

      {method.steps.map(({ icon: Icon, verb, text }, i) => (
        <motion.li
          key={verb}
          className="relative grid grid-cols-[3rem_1fr] gap-x-6 pb-12 last:pb-0 lg:block lg:pb-0"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.25 + i * 0.18, ease }}
        >
          <span className="relative z-10 grid size-12 place-items-center rounded-full border border-blush bg-white text-brand">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div className="lg:mt-8">
            <p className="text-sm font-medium text-brand">
              <span className="sr-only">Étape </span>
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="display mt-2 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight text-ink">
              {verb}
            </h3>
            <p className="prose-body mt-3 max-w-xs leading-relaxed text-graphite">{text}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
