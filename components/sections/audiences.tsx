import { AudienceShowcase } from "@/components/sections/audience-showcase";
import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/ui/section";
import { audiences } from "@/config/content";
import { audiencePhotos } from "@/config/photos";

export function Audiences() {
  return (
    <Section tone="ink" aria-labelledby="audiences-title" className="overflow-hidden">
      <div className="container-page">
        <SectionHeading
          id="audiences-title"
          title={audiences.title}
          intro={audiences.intro}
          tone="light"
          size="lg"
          align="center"
        />

        <AudienceShowcase
          photos={audiencePhotos.map(({ src, alt, position }) => ({ src, alt, position }))}
          items={audiences.items.map(({ icon: Icon, title, text }) => ({
            title,
            text,
            icon: <Icon className="size-6" aria-hidden="true" />,
          }))}
        />
      </div>
    </Section>
  );
}
