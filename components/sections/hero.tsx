import { ShapedPhoto } from "@/components/brand/shaped-photo";
import { tone } from "@/components/brand/tile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { hero } from "@/config/content";
import { photos } from "@/config/photos";
import { getBookingHref, siteConfig } from "@/config/site";

export function Hero() {
  const booking = getBookingHref();
  const [titleBefore, titleAfter] = hero.title.split(hero.titleHighlight);

  return (
    <section id="accueil" aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      <div className="grid w-full items-center gap-14 px-5 pt-10 pb-20 sm:px-8 sm:pt-14 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:pt-16 lg:pb-28 2xl:px-20">
        <div className="lg:col-span-7">
          <Badge variant="soft" className="animate-appear">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
            {siteConfig.consultant.fullName}, {siteConfig.consultant.role.toLowerCase()} à {siteConfig.contact.city}
          </Badge>

          <h1
            id="hero-title"
            className="display mt-7 text-[clamp(2.5rem,6.4vw,5.25rem)] leading-[1.02] text-ink"
          >
            {titleAfter === undefined ? (
              hero.title
            ) : (
              <>
                {titleBefore}
                <span className="text-brand underline decoration-blush decoration-[0.12em] underline-offset-[0.14em]">
                  {hero.titleHighlight}
                </span>
                {titleAfter}
              </>
            )}
          </h1>

          <p className="prose-body animate-appear mt-7 max-w-xl text-lg leading-relaxed text-graphite [animation-delay:120ms]">
            {hero.subtitle}
          </p>

          <div className="animate-appear mt-10 flex flex-col gap-3 [animation-delay:220ms] sm:flex-row">
            <Button asChild size="lg">
              <a href="#expertises">{hero.primaryCta}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={booking.href}
                {...(booking.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {hero.secondaryCta}
                {booking.external ? <span className="sr-only"> (nouvel onglet)</span> : null}
              </a>
            </Button>
          </div>

          <ul className="mt-10 grid gap-3 border-t border-border pt-6 text-sm text-graphite sm:grid-cols-3 sm:gap-6">
            {hero.reassurance.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-2.5">
                <Icon className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 sm:px-10 lg:col-span-5 lg:w-full lg:max-w-[36rem] lg:justify-self-end lg:px-0">
          <ShapedPhoto
            src={photos.hero.src}
            alt={photos.hero.alt}
            position={photos.hero.position}
            shape="arch"
            aspect="aspect-[4/5]"
            sizes="(min-width: 1536px) 576px, (min-width: 1024px) 40vw, (min-width: 640px) 70vw, 90vw"
            priority
            animate
            className="mx-auto max-w-md lg:max-w-none"
            accents={[
              { kind: "diag", color: tone.blush, className: "top-[34%] -left-[9%] w-[17%]" },
              { kind: "dot", color: tone.brand, className: "-bottom-[6%] -left-[7%] w-[30%]" },
              { kind: "quarter", corner: "bl", color: tone.soft, className: "-top-[3%] -right-[6%] w-[24%]" },
              { kind: "glyph", letter: "y", color: "#ffffff", bg: tone.deep, className: "right-[-6%] bottom-[16%] w-[20%]" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
