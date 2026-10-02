"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !border !border-border !bg-white !text-ink !shadow-[0_12px_40px_-12px_rgba(58,40,82,0.25)] !font-sans",
          description: "!text-graphite",
          success: "[&_[data-icon]]:!text-brand",
          error: "[&_[data-icon]]:!text-destructive",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
