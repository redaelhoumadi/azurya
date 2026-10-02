import Image from "next/image";

import { partners } from "@/config/partners";

/** Bandeau défilant des logos partenaires, estompé sur les bords. */
export function Partners() {
  // Liste doublée dans chaque groupe pour couvrir les très grands écrans sans trou.
  const logos = [...partners, ...partners];

  return (
    <section aria-labelledby="partners-title" className="bg-white py-12 sm:py-16">
      <h2
        id="partners-title"
        className="container-page text-center text-sm font-medium tracking-[0.18em] text-graphite uppercase"
      >
        Nos partenaires
      </h2>

      <div className="group mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:overflow-x-auto sm:mt-10">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="animate-marquee flex h-20 shrink-0 items-center gap-12 pr-12 group-hover:[animation-play-state:paused] sm:gap-20 sm:pr-20"
          >
            {logos.map(({ name, logo, height }, index) => (
              <li key={`${name}-${index}`} className="shrink-0">
                <Image
                  src={logo}
                  alt={copy === 0 && index < partners.length ? name : ""}
                  sizes="200px"
                  className={`${height} w-auto opacity-60 mix-blend-multiply grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0`}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
