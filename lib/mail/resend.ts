import "server-only";

import type { MailProvider, OutgoingMail } from "@/lib/mail/types";

/** Envoi via l'API REST de Resend (https://resend.com/docs/api-reference/emails/send-email). */
export function createResendProvider(apiKey: string, from: string): MailProvider {
  return {
    name: "resend",
    async send(mail: OutgoingMail) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [mail.to],
          reply_to: mail.replyTo,
          subject: mail.subject,
          text: mail.text,
          html: mail.html,
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) {
        throw new Error(`Resend a répondu ${res.status}`);
      }
    },
  };
}
