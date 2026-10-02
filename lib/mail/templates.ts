import "server-only";

import type { ContactFormValues } from "@/lib/validations";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export function buildContactEmail(data: ContactFormValues, needLabel: string) {
  const rows: Array<[string, string]> = [
    ["Nom", data.name],
    ["Entreprise", data.company],
    ["E-mail", data.email],
    ["Téléphone", data.phone || "Non renseigné"],
    ["Besoin", needLabel],
  ];

  const subject = singleLine(`Nouvelle demande de contact : ${data.company} (${needLabel})`).slice(0, 180);

  const text = [
    ...rows.map(([k, v]) => `${k} : ${v}`),
    "",
    "Message :",
    data.message,
    "",
    "Consentement au traitement des données : oui",
  ].join("\n");

  const html = `<!doctype html><html lang="fr"><body style="font-family:Arial,sans-serif;color:#74569c;line-height:1.5">
<h1 style="font-size:18px;color:#74569C">Nouvelle demande via le site azurya</h1>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#57505f;vertical-align:top">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join("")}</table>
<h2 style="font-size:15px;margin-top:20px">Message</h2>
<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
<p style="color:#57505f;font-size:12px">Consentement au traitement des données : oui</p>
</body></html>`;

  return { subject, text, html };
}
