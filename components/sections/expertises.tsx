import { ChevronDown } from "lucide-react";

import { NeedLink } from "@/components/forms/need-link";
import { SectionHeading } from "@/components/sections/section-heading";
import { SliderDots } from "@/components/sections/slider-dots";
import { expertises } from "@/config/content";
import { Section } from "@/components/ui/section";

export function Expertises() {
  return (
    <Section id="expertises" aria-labelledby="expertises-title" tone="white">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="expertises-title"
            title="Six expertises pour faire avancer votre fonction RH."
            className="lg:col-span-7"
          />
          <p className="prose-body max-w-md text-base leading-relaxed text-graphite lg:col-span-5 lg:justify-self-end">
            Un besoin précis ou plusieurs chantiers à mener de front : chaque
            accompagnement se construit à partir de votre situation.
          </p>
        </div>

        {/* Mobile : défilement horizontal avec aperçu de la carte suivante ; grille à partir de md */}
        <div className="relative -mx-5 mt-14 sm:-mx-8 sm:mt-16 md:mx-0">
          <ul
            id="expertises-list"
            className="flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto overscroll-x-contain py-1 pr-14 pl-5 [scrollbar-width:none] sm:scroll-px-8 sm:pl-8 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:p-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
          >
            {expertises.map(({ id, icon: Icon, title, benefit, points }) => (
              <li
                key={id}
                className="card-brand group flex w-[82%] shrink-0 snap-start flex-col border border-border bg-white p-7 transition-[border-color,background-color] duration-300 hover:border-brand/40 hover:bg-mist/60 sm:w-[60%] sm:p-8 md:w-auto"
              >
                <span className="shape-a grid h-11 w-14 place-items-center bg-mist text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="display mt-7 text-xl leading-snug text-ink">
                  {title}
                </h3>
                <p className="prose-body mt-3 leading-relaxed text-graphite">
                  {benefit}
                </p>

                <details className="group/details mt-6 border-t border-border pt-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-md text-sm font-medium text-brand hover:text-brand-deep [&::-webkit-details-marker]:hidden">
                    En savoir plus
                    <ChevronDown
                      className="size-4 transition-transform duration-300 group-open/details:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-graphite">
                    {points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-blush"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </details>

                <NeedLink
                  need={id}
                  className="mt-auto self-start rounded-md pt-6 text-sm font-medium text-ink underline decoration-blush decoration-2 underline-offset-[6px] transition-colors hover:text-brand hover:decoration-brand"
                >
                  Échanger sur ce besoin
                  <span className="sr-only"> : {title}</span>
                </NeedLink>
              </li>
            ))}
          </ul>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/70 to-transparent md:hidden"
          />
        </div>
        <SliderDots
          listId="expertises-list"
          labels={expertises.map(({ title }) => title)}
          className="mt-6 md:hidden"
        />
      </div>
    </Section>
  );
}
