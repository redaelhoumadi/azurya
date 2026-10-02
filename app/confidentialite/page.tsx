import type { Metadata } from "next";

import { Field, LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment azurya traite les données personnelles transmises via son site.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  const { legal, contact, consultant } = siteConfig;

  return (
    <LegalPage title="Politique de confidentialité" updatedAt="à compléter lors de la mise en ligne">
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          <Field value={legal.companyName} />, représentée par {consultant.fullName}. Contact :{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </section>

      <section>
        <h2>Données collectées</h2>
        <p>
          Via le formulaire de contact : nom et prénom, entreprise, adresse e-mail professionnelle,
          téléphone (facultatif), type de besoin et message. Aucune autre donnée n&apos;est
          collectée à votre insu.
        </p>
      </section>

      <section>
        <h2>Finalité et base légale</h2>
        <p>
          Ces données servent uniquement à répondre à votre demande et, le cas échéant, à
          préparer une proposition d&apos;accompagnement. Le traitement repose sur votre
          consentement, exprimé en cochant la case prévue à cet effet, et sur les mesures
          précontractuelles prises à votre demande.
        </p>
      </section>

      <section>
        <h2>Destinataires</h2>
        <p>
          Vos données sont destinées exclusivement à {siteConfig.name}. Elles transitent par le
          prestataire technique d&apos;envoi d&apos;e-mails et l&apos;hébergeur du site, qui les
          traitent pour notre compte. Elles ne sont ni vendues ni cédées.
        </p>
      </section>

      <section>
        {/* À valider : durée alignée sur la recommandation de la CNIL pour les prospects. */}
        <h2>Durée de conservation</h2>
        <p>
          Les données sont conservées pendant la durée nécessaire au traitement de votre demande,
          puis au maximum trois ans après le dernier échange, sauf relation contractuelle.
        </p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
          limitation, d&apos;opposition et de portabilité de vos données, ainsi que du droit de
          retirer votre consentement à tout moment. Pour les exercer, écrivez à{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>. Vous pouvez également
          introduire une réclamation auprès de la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          ).
        </p>
      </section>

      <section id="cookies" className="scroll-mt-24">
        <h2>Cookies</h2>
        <p>
          Ce site n&apos;utilise aucun cookie de mesure d&apos;audience, publicitaire ou de réseau
          social. Aucun consentement n&apos;est donc demandé. Si un outil de ce type est ajouté,
          un bandeau de consentement devra être mis en place avant son activation.
        </p>
      </section>
    </LegalPage>
  );
}
