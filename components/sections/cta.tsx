import { ShapedPhoto } from "@/components/brand/shaped-photo";
import { tone } from "@/components/brand/tile";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { photos } from "@/config/photos";
import { getBookingHref } from "@/config/site";

/**
 * Bandeau d'appel à l'action entre la méthode et la présentation.
 * Reprend le principe du bloc CTA de Launch UI (MIT) ; le halo lumineux est remplacé
 * par les symboles de la charte, qui se déplacent légèrement au survol.
 */
export function CallToAction() {
  const booking = getBookingHref();

  return (
    <Section tone="white" aria-labelledby="cta-title" className="pt-0 sm:pt-0">
      <div className="container-page">
        <div className="card-brand group relative grid items-center gap-10 overflow-hidden bg-brand p-8 text-white sm:p-12 lg:grid-cols-12 lg:gap-12 lg:p-16">
          <span
            aria-hidden="true"
            className="absolute -top-16 -left-16 size-48 rounded-br-full bg-brand-deep transition-transform duration-700 ease-(--ease-brand) group-hover:translate-x-3 group-hover:translate-y-3"
          />
          <span
            aria-hidden="true"
            className="absolute right-[38%] -bottom-10 h-40 w-16 bg-blush/70 transition-transform duration-700 ease-(--ease-brand) group-hover:-translate-y-4"
            style={{ clipPath: "polygon(0 0, 46% 0, 100% 100%, 54% 100%)" }}
          />

          <div className="on-dark relative lg:col-span-7">
            <h2 id="cta-title" className="display text-[clamp(1.875rem,4vw,3rem)] leading-[1.08]">
              Un projet RH en tête ? Commençons par en parler.
            </h2>
            <p className="prose-body mt-5 max-w-lg text-lg leading-relaxed text-white/85">
              Un premier échange permet de clarifier votre besoin et de voir comment avancer ensemble.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="light">
                <a href="#contact">Échanger sur votre projet</a>
              </Button>
              <Button asChild size="lg" variant="outline-light">
                <a
                  href={booking.href}
                  {...(booking.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  Prendre rendez-vous
                  {booking.external ? <span className="sr-only"> (nouvel onglet)</span> : null}
                </a>
              </Button>
            </div>
          </div>

          <div className="relative px-6 sm:px-10 lg:col-span-5 lg:px-4">
            <ShapedPhoto
              src={photos.cta.src}
              alt={photos.cta.alt}
              position={photos.cta.position}
              shape="circle"
              aspect="aspect-square"
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="mx-auto max-w-xs lg:max-w-sm"
              accents={[
                { kind: "glyph", letter: "a", color: tone.brand, bg: "#ffffff", className: "-top-[2%] -right-[2%] w-[26%]" },
                { kind: "dot", color: tone.blush, className: "bottom-[2%] -left-[4%] w-[18%]" },
              ]}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
