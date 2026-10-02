import Link from "next/link";
import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  updatedAt: string;
  children: ReactNode;
}

export function LegalPage({ title, updatedAt, children }: LegalPageProps) {
  return (
    <main className="bg-white py-16 sm:py-24">
      <article className="container-page max-w-3xl">
        <Link href="/" className="rounded-sm text-sm text-brand underline underline-offset-4">
          Retour à l&apos;accueil
        </Link>
        <h1 className="display mt-8 text-[clamp(2.25rem,5vw,3.5rem)] leading-tight text-ink">{title}</h1>
        <p className="mt-3 text-sm text-graphite">Dernière mise à jour : {updatedAt}</p>
        <div className="mt-12 space-y-10 leading-relaxed text-graphite [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 [&_h2]:display [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
          {children}
        </div>
      </article>
    </main>
  );
}

/** Affiche une valeur de configuration, ou un repère visible tant qu'elle n'est pas renseignée. */
export function Field({ value }: { value: string | null }) {
  return value ? (
    <>{value}</>
  ) : (
    <mark className="rounded bg-blush-soft px-1.5 text-ink">à compléter</mark>
  );
}
