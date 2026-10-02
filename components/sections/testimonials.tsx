import { SectionHeading } from "@/components/sections/section-heading";
import { testimonials } from "@/config/content";
import { Section } from "@/components/ui/section";

/**
 * Témoignages clients. La section ne s'affiche que lorsque config/content.ts
 * contient au moins un témoignage réel.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section aria-labelledby="temoignages-title" tone="white">
      <div className="container-page">
        <SectionHeading id="temoignages-title" title="Ils témoignent." />
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.author} className="card-brand border border-border bg-mist p-8 sm:p-10">
              <figure>
                <blockquote className="display text-xl leading-snug text-ink sm:text-2xl">
                  <p>« {t.quote} »</p>
                </blockquote>
                <figcaption className="mt-6 text-sm text-graphite">
                  <span className="font-medium text-ink">{t.author}</span>, {t.role}
                  {t.company ? `, ${t.company}` : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
