"use client";

import { useState, type ReactNode } from "react";

import { ShapedPhoto } from "@/components/brand/shaped-photo";
import { tone } from "@/components/brand/tile";
import { HighlightList } from "@/components/sections/highlight-list";

interface AudienceShowcaseProps {
  items: Array<{ title: string; text: string; icon: ReactNode }>;
  /** Une photo par élément, dans le même ordre */
  photos: Array<{ src: string; alt: string; position?: string }>;
}

/** Liste des publics et photo associée : la photo change avec l'élément mis en avant. */
export function AudienceShowcase({ items, photos }: AudienceShowcaseProps) {
  const [active, setActive] = useState(0);
  const [first, ...alternates] = photos;

  return (
    <div className="mt-14 grid items-center gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-20">
      <div className="px-8 sm:px-12 lg:col-span-5 lg:px-6">
        <ShapedPhoto
          src={first.src}
          alt={first.alt}
          position={first.position}
          alternates={alternates}
          active={Math.min(active, photos.length - 1)}
          shape="arch"
          aspect="aspect-[4/5]"
          sizes="(min-width: 1024px) 34vw, 85vw"
          className="mx-auto max-w-sm lg:max-w-none"
          accents={[
            { kind: "quarter", corner: "tr", color: tone.blush, className: "top-[46%] -left-[14%] w-[34%]" },
            { kind: "dot", color: tone.brand, className: "-bottom-[7%] -left-[10%] w-[34%]" },
            { kind: "diag", color: tone.soft, className: "-top-[4%] -right-[4%] w-[14%]" },
          ]}
        />
      </div>

      <div className="lg:col-span-7">
        <HighlightList items={items} onActiveChange={setActive} />
      </div>
    </div>
  );
}
