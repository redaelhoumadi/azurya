import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { contactSection, needOptions } from "@/config/content";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/section";

export function Contact() {
  const { contact, links } = siteConfig;

  return (
    <Section id="contact" aria-labelledby="contact-title" tone="mist">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" title={contactSection.title} intro={contactSection.text} size="lg" />

          <ul className="mt-10 space-y-4 text-ink">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="group inline-flex items-center gap-4 rounded-md hover:text-brand"
              >
                <span className="grid size-11 place-items-center rounded-full bg-white text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="sr-only">E-mail : </span>
                  {contact.email}
                </span>
              </a>
            </li>
            {contact.phone && contact.phoneDisplay ? (
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="group inline-flex items-center gap-4 rounded-md hover:text-brand"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-white text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Phone className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="sr-only">Téléphone : </span>
                    {contact.phoneDisplay}
                  </span>
                </a>
              </li>
            ) : null}
            <li className="inline-flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-full bg-white text-brand">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <span>Basée à {contact.city}</span>
            </li>
          </ul>

          {/* Visible uniquement lorsqu'une URL de réservation est renseignée dans config/site.ts */}
          {links.booking ? (
            <Button asChild variant="outline" size="lg" className="mt-10">
              <a href={links.booking} target="_blank" rel="noopener noreferrer">
                <CalendarDays aria-hidden="true" />
                Prendre rendez-vous en ligne
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </Button>
          ) : null}
        </div>

        <div className="card-brand border border-border bg-white p-6 shadow-[0_30px_80px_-50px_rgba(58,40,82,0.45)] sm:p-10 lg:col-span-7">
          <ContactForm
            needOptions={needOptions.map(({ value, label }) => ({ value, label }))}
            fallbackEmail={contact.email}
          />
        </div>
      </div>
    </Section>
  );
}
