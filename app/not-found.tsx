import Link from "next/link";

import { Glyph } from "@/components/brand/glyph";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[70vh] flex-col items-start justify-center py-24">
      <Glyph letter="y" className="h-20 w-auto" />
      <h1 className="display mt-10 text-4xl text-ink sm:text-5xl">Cette page n&apos;existe pas.</h1>
      <p className="mt-4 max-w-md text-graphite">
        Le lien est peut-être incorrect ou la page a été déplacée.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </main>
  );
}
