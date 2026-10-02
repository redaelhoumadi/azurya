import { MethodSteps } from "@/components/sections/method-steps";
import { SectionHeading } from "@/components/sections/section-heading";
import { method } from "@/config/content";
import { Section } from "@/components/ui/section";

export function Method() {
  return (
    <Section id="approche" aria-labelledby="approche-title" tone="white">
      <div className="container-page">
        <SectionHeading id="approche-title" title={method.title} intro={method.intro} size="lg" />
        <MethodSteps />
      </div>
    </Section>
  );
}
