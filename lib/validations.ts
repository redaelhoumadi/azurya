import { z } from "zod";

/** Schéma partagé entre le formulaire (client) et l'API (serveur). */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom et prénom.")
    .max(120, "Ce champ est limité à 120 caractères."),
  company: z
    .string()
    .trim()
    .min(2, "Indiquez le nom de votre entreprise.")
    .max(160, "Ce champ est limité à 160 caractères."),
  email: z
    .string()
    .trim()
    .min(1, "Indiquez votre adresse e-mail professionnelle.")
    .max(254, "Cette adresse e-mail est trop longue.")
    .pipe(z.email("Cette adresse e-mail n'est pas valide. Exemple : prenom.nom@entreprise.fr")),
  phone: z
    .string()
    .trim()
    .max(30, "Ce numéro est trop long.")
    .refine(
      (v) => v === "" || (/^[+()\d\s.-]+$/.test(v) && v.replace(/\D/g, "").length >= 9),
      "Ce numéro ne semble pas valide. Exemple : 06 12 34 56 78",
    ),
  need: z.string().min(1, "Choisissez le besoin qui correspond le mieux à votre demande."),
  message: z
    .string()
    .trim()
    .min(20, "Décrivez votre besoin en quelques phrases (20 caractères minimum).")
    .max(3000, "Votre message est limité à 3 000 caractères."),
  consent: z
    .boolean()
    .refine((v) => v, "Cochez cette case pour que nous puissions traiter votre demande."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/** Données reçues par l'API : formulaire + signaux anti-spam. */
export const contactPayloadSchema = contactSchema.extend({
  /** Champ piège invisible : doit rester vide */
  website: z.string().max(200).optional(),
  /** Temps passé sur le formulaire, en millisecondes */
  elapsedMs: z.number().int().nonnegative().max(86_400_000),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;

export type ContactApiResponse =
  | { ok: true }
  | {
      ok: false;
      code: "invalid" | "not_configured" | "rate_limited" | "send_failed" | "forbidden" | "bad_request";
      message: string;
      fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
    };
