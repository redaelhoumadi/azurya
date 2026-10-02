"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";

import { useContactPrefill } from "@/components/forms/contact-prefill";
import { Button } from "@/components/ui/button";
import { Input, fieldBase } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  contactSchema,
  type ContactApiResponse,
  type ContactFormValues,
} from "@/lib/validations";

interface ContactFormProps {
  needOptions: ReadonlyArray<{ value: string; label: string }>;
  fallbackEmail: string;
}

type Status = "idle" | "sent" | "unavailable";

/** Temps écoulé depuis l'ouverture du formulaire (signal anti-spam). */
const elapsedSince = (start: number) => Math.max(0, Date.now() - start);

const defaultValues: ContactFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  need: "",
  message: "",
  consent: false,
};

export function ContactForm({ needOptions, fallbackEmail }: ContactFormProps) {
  const uid = useId();
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const { need } = useContactPrefill();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onTouched",
  });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Présélection depuis une carte d'expertise
  useEffect(() => {
    if (need) setValue("need", need, { shouldValidate: true });
  }, [need, setValue]);

  const onSubmit = async (values: ContactFormValues, antiSpam: { website: string; elapsedMs: number }) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          ...antiSpam,
        }),
      });
      const data = (await res.json()) as ContactApiResponse;

      if (data.ok) {
        setStatus("sent");
        reset(defaultValues);
        toast.success("Message envoyé", {
          description: "Votre demande a bien été transmise.",
        });
        return;
      }

      if (data.code === "not_configured") {
        setStatus("unavailable");
        toast.error("Envoi en ligne indisponible", {
          description: `Écrivez directement à ${fallbackEmail}.`,
        });
        return;
      }

      if (data.code === "invalid" && data.fieldErrors) {
        const entries = Object.entries(data.fieldErrors) as Array<[keyof ContactFormValues, string[] | undefined]>;
        entries.forEach(([field, messages]) => {
          if (messages?.[0]) setError(field, { message: messages[0] });
        });
        const first = entries.find(([, m]) => m?.length)?.[0];
        if (first) setFocus(first);
      }

      toast.error(data.message, {
        description:
          data.code === "send_failed"
            ? `Réessayez dans un instant ou écrivez à ${fallbackEmail}.`
            : undefined,
      });
    } catch {
      toast.error("Connexion impossible", {
        description: `Vérifiez votre connexion puis réessayez, ou écrivez à ${fallbackEmail}.`,
      });
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start py-6">
        <span className="grid size-14 place-items-center rounded-full bg-mist text-brand">
          <CircleCheck className="size-7" aria-hidden="true" />
        </span>
        <h3 className="display mt-6 text-2xl text-ink">Message envoyé.</h3>
        <p className="prose-body mt-3 max-w-md leading-relaxed text-graphite">
          Merci pour votre demande. Elle a bien été transmise et vous recevrez une réponse par
          e-mail.
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
          Envoyer une autre demande
        </Button>
      </div>
    );
  }

  const fieldId = (name: keyof ContactFormValues) => `${uid}-${name}`;
  const errorId = (name: keyof ContactFormValues) => `${uid}-${name}-error`;
  const a11y = (name: keyof ContactFormValues) => ({
    id: fieldId(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
  });
  const renderError = (name: keyof ContactFormValues) =>
    errors[name]?.message ? (
      <p id={errorId(name)} className="flex items-start gap-1.5 text-sm text-destructive">
        <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {errors[name]?.message}
      </p>
    ) : null;

  return (
    <form
      onSubmit={(event) => {
        const antiSpam = {
          website: honeypot.current?.value ?? "",
          elapsedMs: elapsedSince(startedAt.current),
        };
        void handleSubmit((values) => onSubmit(values, antiSpam))(event);
      }}
      noValidate className="relative" aria-label="Formulaire de contact">
      {status === "unavailable" ? (
        <div role="alert" className="mb-8 rounded-2xl border border-blush bg-mist p-5 text-sm leading-relaxed text-ink">
          L&apos;envoi en ligne n&apos;est pas encore activé. Votre saisie est conservée :
          écrivez directement à{" "}
          <a className="font-medium text-brand underline underline-offset-4" href={`mailto:${fallbackEmail}`}>
            {fallbackEmail}
          </a>
          .
        </div>
      ) : null}

      {/* Champ piège pour les robots : invisible et ignoré par les technologies d'assistance */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Ne pas remplir ce champ</label>
        <input ref={honeypot} id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="mb-6 text-sm text-graphite">Les champs marqués d&apos;un astérisque sont obligatoires.</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={fieldId("name")}>Nom et prénom *</Label>
          <Input {...register("name")} {...a11y("name")} autoComplete="name" />
          {renderError("name")}
        </div>

        <div className="grid gap-2">
          <Label htmlFor={fieldId("company")}>Entreprise *</Label>
          <Input {...register("company")} {...a11y("company")} autoComplete="organization" />
          {renderError("company")}
        </div>

        <div className="grid gap-2">
          <Label htmlFor={fieldId("email")}>E-mail professionnel *</Label>
          <Input
            {...register("email")}
            {...a11y("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="prenom.nom@entreprise.fr"
          />
          {renderError("email")}
        </div>

        <div className="grid gap-2">
          <Label htmlFor={fieldId("phone")}>
            Téléphone <span className="font-normal text-graphite">(facultatif)</span>
          </Label>
          <Input {...register("phone")} {...a11y("phone")} type="tel" inputMode="tel" autoComplete="tel" />
          {renderError("phone")}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor={fieldId("need")}>Type de besoin *</Label>
          <div className="relative">
            <select
              {...register("need")}
              {...a11y("need")}
              className={cn(fieldBase, "h-12 cursor-pointer appearance-none pr-11")}
            >
              <option value="" disabled>
                Choisissez un besoin
              </option>
              {needOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-graphite"
              aria-hidden="true"
            />
          </div>
          {renderError("need")}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor={fieldId("message")}>Message *</Label>
          <Textarea
            {...register("message")}
            {...a11y("message")}
            placeholder="Votre contexte, votre besoin, vos délais…"
          />
          {renderError("message")}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              {...register("consent")}
              {...a11y("consent")}
              type="checkbox"
              className="mt-1 size-5 shrink-0 cursor-pointer rounded border-input accent-brand"
            />
            <label htmlFor={fieldId("consent")} className="cursor-pointer text-sm leading-relaxed text-graphite">
              J&apos;accepte que les informations saisies soient utilisées pour répondre à ma demande,
              conformément à la{" "}
              <Link href="/confidentialite" className="text-brand underline underline-offset-4">
                politique de confidentialité
              </Link>
              . *
            </label>
          </div>
          {renderError("consent")}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden="true" />
              Envoi en cours…
            </>
          ) : (
            "Envoyer ma demande"
          )}
        </Button>
        <p className="text-xs text-graphite sm:max-w-56 sm:text-right">
          Vos données ne servent qu&apos;à traiter votre demande.
        </p>
      </div>
    </form>
  );
}
