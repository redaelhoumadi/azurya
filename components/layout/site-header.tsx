import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { HeaderFrame } from "@/components/layout/header-frame";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { navigation, siteConfig } from "@/config/site";

const cta = { label: "Échanger sur votre projet", href: "/#contact" };

export function SiteHeader() {
  return (
    <HeaderFrame>
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Link href="/" className="rounded-md py-2" aria-label="azurya, retour à l'accueil">
          <Logo title={null} className="h-6 sm:h-7" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative rounded-full px-4 py-2 text-sm text-graphite transition-colors hover:bg-mist hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <a href={cta.href}>{cta.label}</a>
          </Button>
          <MobileNav
            logo={<Logo title={null} className="h-6" />}
            links={navigation}
            cta={cta}
            contact={siteConfig.contact}
          />
        </div>
      </div>
    </HeaderFrame>
  );
}
