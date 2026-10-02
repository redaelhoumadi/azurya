import { ShapedPhoto } from "@/components/brand/shaped-photo";
import { tone } from "@/components/brand/tile";
import { SectionHeading } from "@/components/sections/section-heading";
import { Item, ItemDescription, ItemIcon, ItemTitle } from "@/components/ui/item";
import { Section } from "@/components/ui/section";
import { valueProposition } from "@/config/content";
import { photos } from "@/config/photos";

export function ValueProposition() {
  return (
    <Section tone="mist" aria-labelledby="valeur-title">
      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="order-2 px-6 sm:px-10 lg:order-1 lg:col-span-5 lg:px-0">
          <ShapedPhoto
            src={photos.value.src}
            alt={photos.value.alt}
            position={photos.value.position}
            shape="a"
            aspect="aspect-[5/4]"
            sizes="(min-width: 1024px) 36vw, 90vw"
            className="mx-auto max-w-lg lg:max-w-none"
            accents={[
              { kind: "bar", color: tone.brand, className: "-top-[7%] left-[18%] w-[30%]" },
              { kind: "quarter", corner: "tl", color: tone.blush, className: "-right-[5%] -bottom-[8%] w-[26%]" },
              { kind: "dot", color: tone.deep, className: "right-[16%] -bottom-[4%] w-[9%]" },
            ]}
          />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <SectionHeading id="valeur-title" title={valueProposition.title} intro={valueProposition.intro} />
          <ul className="mt-12">
            {valueProposition.commitments.map(({ icon: Icon, title, text }) => (
              <Item
                key={title}
                className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-haze py-7 sm:gap-x-8"
              >
                <ItemIcon className="row-span-2 bg-white">
                  <Icon className="size-5" />
                </ItemIcon>
                <ItemTitle className="text-ink sm:text-2xl">{title}</ItemTitle>
                <ItemDescription className="max-w-lg">{text}</ItemDescription>
              </Item>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
