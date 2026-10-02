import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/sections/section-heading";
import { faq } from "@/config/content";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/section";

export function Faq() {
  return (
    <Section aria-labelledby="faq-title" tone="white">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" title={faq.title} intro={faq.intro} />
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="mt-6 inline-block rounded-sm font-medium text-brand underline decoration-blush decoration-2 underline-offset-[6px] hover:decoration-brand"
          >
            {siteConfig.contact.email}
          </a>
        </div>
        <Accordion type="single" collapsible className="border-t border-border lg:col-span-8">
          {faq.items.map((item, i) => (
            <AccordionItem key={item.question} value={`q-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
