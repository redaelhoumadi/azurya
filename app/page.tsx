import { ContactPrefillProvider } from "@/components/forms/contact-prefill";
import { About } from "@/components/sections/about";
import { Audiences } from "@/components/sections/audiences";
import { CallToAction } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";
import { Expertises } from "@/components/sections/expertises";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Partners } from "@/components/sections/partners";
import { Method } from "@/components/sections/method";
import { Reasons } from "@/components/sections/reasons";
import { Testimonials } from "@/components/sections/testimonials";
import { ValueProposition } from "@/components/sections/value-proposition";
import { expertises, faq } from "@/config/content";
import { siteConfig } from "@/config/site";

/** Données structurées : uniquement des informations réelles issues de la configuration. */
function StructuredData() {
  const { consultant, contact, links } = siteConfig;
  const sameAs = [links.linkedin].filter((v): v is string => Boolean(v));

  const graph = [
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#cabinet`,
      name: siteConfig.name,
      description: "Cabinet de conseil en ressources humaines",
      url: siteConfig.url,
      email: contact.email,
      ...(contact.phone ? { telephone: contact.phone } : {}),
      address: { "@type": "PostalAddress", addressLocality: contact.city, addressCountry: "FR" },
      founder: { "@id": `${siteConfig.url}/#consultante` },
      knowsAbout: expertises.map((e) => e.title),
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#consultante`,
      name: consultant.fullName,
      jobTitle: consultant.role,
      worksFor: { "@id": `${siteConfig.url}/#cabinet` },
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.items.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function HomePage() {
  return (
    <ContactPrefillProvider>
      <StructuredData />
      <main>
        <Hero />
        <Partners />
        <ValueProposition />
        <Expertises />
        <Audiences />
        <Method />
        <CallToAction />
        <About />
        <Reasons />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
    </ContactPrefillProvider>
  );
}
