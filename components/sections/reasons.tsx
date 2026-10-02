import { Check } from "lucide-react";

import { TileShape, tone, type TileSpec } from "@/components/brand/tile";
import { SectionHeading } from "@/components/sections/section-heading";
import { reasons } from "@/config/content";

/** Bande de motif, dans l'esprit de la carte de visite azurya */
const band: TileSpec[] = [
  { kind: "glyph", letter: "a", fg: tone.blush, bg: tone.deep },
  { kind: "quarter", corner: "br", fg: tone.blush, bg: tone.brand },
  { kind: "solid", bg: tone.soft },
  { kind: "glyph", letter: "z", fg: tone.white, bg: tone.brand },
  { kind: "diag", fg: tone.blush, bg: tone.deep },
  { kind: "glyph", letter: "u", fg: tone.brand, bg: tone.soft },
  { kind: "half", side: "top", fg: tone.blush, bg: tone.brand },
  { kind: "glyph", letter: "r", fg: tone.white, bg: tone.deep },
  { kind: "glyph", letter: "y", fg: tone.brand, bg: tone.white },
  { kind: "dot", fg: tone.soft, bg: tone.brand },
  { kind: "glyph", letter: "a", fg: tone.white, bg: tone.deep },
  { kind: "bar", fg: tone.brand, bg: tone.blush },
  { kind: "quarter", corner: "tl", fg: tone.blush, bg: tone.deep },
  { kind: "glyph", letter: "z", fg: tone.brand, bg: tone.soft },
  { kind: "solid", bg: tone.brand },
  { kind: "glyph", letter: "y", fg: tone.white, bg: tone.deep },
];

export function Reasons() {
  return (
    <section aria-labelledby="pourquoi-title" className="on-dark bg-brand text-white">
      <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          id="pourquoi-title"
          title={reasons.title}
          intro={reasons.intro}
          tone="light"
          size="lg"
          className="lg:col-span-5"
        />

        <ul className="lg:col-span-7">
          {reasons.items.map(({ title, text }) => (
            <li
              key={title}
              className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-white/20 py-6 first:border-t-0 first:pt-0"
            >
              <span className="mt-0.5 grid size-8 place-items-center rounded-full bg-white text-brand">
                <Check className="size-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="display text-lg leading-snug sm:text-xl">{title}</h3>
                <p className="prose-body mt-1.5 leading-relaxed text-white/85">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden="true" className="grid grid-cols-8 sm:grid-cols-12 lg:grid-cols-16">
        {band.map((spec, i) => (
          <div
            key={i}
            className={i >= 12 ? "hidden aspect-square lg:block" : i >= 8 ? "hidden aspect-square sm:block" : "aspect-square"}
          >
            <TileShape spec={spec} />
          </div>
        ))}
      </div>
    </section>
  );
}
