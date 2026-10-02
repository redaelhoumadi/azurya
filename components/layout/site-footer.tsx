import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { LinkedInIcon } from "@/components/brand/linkedin-icon";
import { footer } from "@/config/content";
import { navigation, siteConfig } from "@/config/site";

export function SiteFooter() {
  const { contact, links } = siteConfig;
  const year = new Date().getFullYear();

  const linkClass = "rounded-sm text-white/75 transition-colors hover:text-blush";

  return (
    <footer className="on-dark bg-ink text-white">
      <div className="container-page grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo tone="light" className="h-8" />
          <p className="mt-2 text-xs tracking-wide text-blush">{siteConfig.tagline}</p>
          <p className="prose-body mt-6 max-w-sm text-sm leading-relaxed text-white/75">{footer.description}</p>
        </div>

        <nav aria-label="Navigation du pied de page" className="lg:col-span-3">
          <h2 className="text-sm font-medium text-white">Navigation</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="text-sm font-medium text-white">Contact</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={`mailto:${contact.email}`} className={`${linkClass} inline-flex items-center gap-3`}>
                <Mail className="size-4 text-blush" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            {contact.phone && contact.phoneDisplay ? (
              <li>
                <a href={`tel:${contact.phone}`} className={`${linkClass} inline-flex items-center gap-3`}>
                  <Phone className="size-4 text-blush" aria-hidden="true" />
                  {contact.phoneDisplay}
                </a>
              </li>
            ) : null}
            <li className="inline-flex items-center gap-3 text-white/75">
              <MapPin className="size-4 text-blush" aria-hidden="true" />
              {contact.city}
            </li>
          </ul>
          {links.linkedin ? (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-blush hover:text-blush"
            >
              <LinkedInIcon className="size-4" />
              <span className="sr-only">LinkedIn (nouvel onglet)</span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/mentions-legales" className={linkClass}>
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className={linkClass}>
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/confidentialite#cookies" className={linkClass}>
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
