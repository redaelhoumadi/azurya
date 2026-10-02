import { NextResponse } from "next/server";
import { z } from "zod";

import { needOptions } from "@/config/content";
import { getMailSetup } from "@/lib/mail";
import { buildContactEmail } from "@/lib/mail/templates";
import { rateLimit } from "@/lib/rate-limit";
import { contactPayloadSchema, type ContactApiResponse } from "@/lib/validations";

const MAX_BODY_BYTES = 16_000;
const MIN_FILL_TIME_MS = 2_500;

const reply = (body: ContactApiResponse, status: number) => NextResponse.json(body, { status });

export async function POST(request: Request) {
  // 1. Requêtes provenant d'un autre site
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host) {
    let originHost: string | null = null;
    try {
      originHost = new URL(origin).host;
    } catch {
      originHost = null;
    }
    if (originHost !== host) {
      return reply({ ok: false, code: "forbidden", message: "Requête refusée." }, 403);
    }
  }

  // 2. Format et taille
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return reply({ ok: false, code: "bad_request", message: "Format de requête non pris en charge." }, 415);
  }
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return reply({ ok: false, code: "bad_request", message: "Votre message est trop volumineux." }, 413);
  }

  // 3. Limitation du nombre d'envois
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonyme";
  if (!rateLimit(`contact:${ip}`)) {
    return reply(
      {
        ok: false,
        code: "rate_limited",
        message: "Plusieurs demandes ont déjà été envoyées. Réessayez dans quelques minutes.",
      },
      429,
    );
  }

  // 4. Validation (même schéma que côté client)
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return reply({ ok: false, code: "bad_request", message: "Requête mal formée." }, 400);
  }

  const parsed = contactPayloadSchema.safeParse(json);
  const need = parsed.success ? needOptions.find((o) => o.value === parsed.data.need) : undefined;

  if (!parsed.success || !need) {
    return reply(
      {
        ok: false,
        code: "invalid",
        message: "Certains champs sont incomplets ou invalides.",
        fieldErrors: parsed.success
          ? { need: ["Choisissez un besoin dans la liste."] }
          : z.flattenError(parsed.error).fieldErrors,
      },
      422,
    );
  }

  const { website, elapsedMs, ...data } = parsed.data;

  // 5. Anti-spam : champ piège rempli ou envoi instantané. On répond « ok » sans rien transmettre.
  if ((website && website.length > 0) || elapsedMs < MIN_FILL_TIME_MS) {
    return reply({ ok: true }, 200);
  }

  // 6. Envoi
  const mail = getMailSetup();
  if (!mail) {
    return reply(
      {
        ok: false,
        code: "not_configured",
        message: "L'envoi en ligne n'est pas encore activé.",
      },
      503,
    );
  }

  try {
    const email = buildContactEmail(data, need.label);
    await mail.provider.send({ to: mail.to, replyTo: data.email, ...email });
  } catch (error) {
    // Aucune donnée personnelle dans les journaux
    console.error("[contact] échec d'envoi", mail.provider.name, error instanceof Error ? error.message : "");
    return reply(
      { ok: false, code: "send_failed", message: "Le message n'a pas pu être transmis." },
      502,
    );
  }

  return reply({ ok: true }, 200);
}
