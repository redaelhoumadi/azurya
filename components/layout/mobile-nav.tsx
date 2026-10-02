"use client";

import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileNavProps {
  logo: ReactNode;
  links: ReadonlyArray<{ label: string; href: string }>;
  cta: { label: string; href: string };
  contact: { email: string; phone: string | null; phoneDisplay: string | null };
}

export function MobileNav({ logo, links, cta, contact }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
          <Menu className="size-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent aria-describedby="mobile-nav-description" className="px-6 pt-5 pb-8">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription id="mobile-nav-description" className="sr-only">
          Navigation principale du site
        </SheetDescription>
        <div className="flex h-11 items-center">{logo}</div>

        <nav aria-label="Navigation mobile" className="mt-10">
          <ul className="flex flex-col">
            {links.map((link, i) => (
              <li
                key={link.href}
                className="animate-in fade-in slide-in-from-right-4 fill-mode-both duration-500"
                style={{ animationDelay: `${80 + i * 45}ms` }}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display flex items-center justify-between border-b border-border py-4 text-2xl text-ink transition-colors hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <Button asChild size="lg" className="w-full">
            <a href={cta.href} onClick={() => setOpen(false)}>
              {cta.label}
            </a>
          </Button>
          <div className="flex flex-col gap-1 text-sm text-graphite">
            <a className="rounded-sm hover:text-brand" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            {contact.phone && contact.phoneDisplay ? (
              <a className="rounded-sm hover:text-brand" href={`tel:${contact.phone}`}>
                {contact.phoneDisplay}
              </a>
            ) : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
