import type { Metadata } from "next";
import Link from "next/link";

import { Field, LegalPage } from "@/components/layout/legal-page";
import { audiencePhotos, photos } from "@/config/photos";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site azurya, cabinet de conseil en ressources humaines.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  const { legal, contact } = siteConfig;

  return (
    <LegalPage title="Mentions légales" updatedAt="à compléter lors de la mise en ligne">
      <section>
        <h2>Éditeur du site</h2>
        <ul>
          <li>
            Dénomination : <Field value={legal.companyName} />
          </li>
          <li>
            Forme juridique : <Field value={legal.legalForm} />
          </li>
          <li>
            SIRET : <Field value={legal.siret} />
          </li>
          <li>
            Adresse : <Field value={legal.address} />
          </li>
          <li>
            E-mail : <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          {contact.phone && contact.phoneDisplay ? (
            <li>
              Téléphone : <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
            </li>
          ) : null}
          <li>
            Directrice de la publication : <Field value={legal.publicationDirector} />
          </li>
        </ul>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          <Field value={legal.host ? `${legal.host.name}, ${legal.host.address}` : null} />
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus de ce site (textes, logotype, éléments graphiques) est la
          propriété de {siteConfig.name}, sauf mention contraire. Toute reproduction sans
          autorisation préalable est interdite.
        </p>
      </section>

      <section>
        <h2>Crédits photographiques</h2>
        <p>Photographies d&apos;illustration issues d&apos;Unsplash :</p>
        <ul>
          {[...new Map([...Object.values(photos), ...audiencePhotos].map((p) => [p.src, p])).values()].map((photo) => (
            <li key={photo.src}>
              <a href={photo.credit.url} target="_blank" rel="noopener noreferrer">
                {photo.credit.author}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Le traitement des données transmises via le formulaire de contact est décrit dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
