import "server-only";

import { createResendProvider } from "@/lib/mail/resend";
import type { MailProvider } from "@/lib/mail/types";

export interface MailSetup {
  provider: MailProvider;
  to: string;
}

/**
 * Retourne le fournisseur d'e-mails configuré, ou null si aucun ne l'est.
 * Pour brancher un autre service (Brevo, Postmark, SMTP…), créer un fichier
 * sur le modèle de resend.ts et l'ajouter ici.
 */
export function getMailSetup(): MailSetup | null {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;

  if (!to || !from) return null;
  if (resendKey) return { provider: createResendProvider(resendKey, from), to };

  return null;
}
