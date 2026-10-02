import { Check } from "lucide-react";

import { LinkedInIcon } from "@/components/brand/linkedin-icon";
import { ShapedPhoto } from "@/components/brand/shaped-photo";
import { TileShape, tone, type TileSpec } from "@/components/brand/tile";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { about } from "@/config/content";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/section";

const placeholderTiles: TileSpec[] = [
  { kind: "glyph", letter: "a", fg: tone.white, bg: tone.brand },
  { kind: "quarter", corner: "tl", fg: tone.blush, bg: tone.white },
  { kind: "diag", fg: tone.brand, bg: tone.soft },
  { kind: "glyph", letter: "y", fg: tone.brand, bg: tone.white },
];

export function About() {
  const { consultant, links } = siteConfig;

  return (
    <Section id="a-propos" aria-labelledby="a-propos-title" tone="mist">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          {consultant.photo ? (
            <ShapedPhoto
              src={consultant.photo.src}
              alt={consultant.photo.alt}
              shape="quarter"
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 28rem, 90vw"
              accents={[
                { kind: "diag", color: tone.blush, className: "-top-[4%] right-[10%] w-[13%]" },
                { kind: "dot", color: tone.brand, className: "-right-[6%] -bottom-[5%] w-[24%]" },
                { kind: "glyph", letter: "a", color: "#ffffff", bg: tone.deep, className: "bottom-[14%] -left-[7%] w-[20%]" },
              ]}
            />
          ) : (
            <div className="card-brand relative aspect-[4/5] overflow-hidden bg-white">
              {/* Composition de marque affichée tant que la photo n'est pas fournie (voir config/site.ts). */}
              <div aria-hidden="true" className="grid size-full grid-cols-2 grid-rows-2">
                {placeholderTiles.map((spec, i) => (
                  <TileShape key={i} spec={spec} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <SectionHeading id="a-propos-title" title={about.title} />
          <div className="mt-6 space-y-5 text-base leading-relaxed text-graphite sm:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="prose-body max-w-2xl">
                {p}
              </p>
            ))}
          </div>

          {about.highlights.length > 0 ? (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {about.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-ink">
                  <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-10 flex flex-col gap-6 border-t border-haze pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="display text-xl text-ink">{consultant.fullName}</p>
              <p className="text-sm text-graphite">
                {consultant.role}, fondatrice d&apos;{siteConfig.name}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {links.linkedin ? (
                <Button asChild variant="outline">
                  <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon className="size-4" />
                    LinkedIn
                    <span className="sr-only"> (nouvel onglet)</span>
                  </a>
                </Button>
              ) : null}
              <Button asChild>
                <a href="#contact">Échanger avec {consultant.firstName}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
