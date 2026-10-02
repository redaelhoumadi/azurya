import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** Adapté du Badge de Launch UI (MIT, © Mikolaj Dobrucki). */
const badgeVariants = cva("inline-flex items-center gap-2 rounded-full text-sm", {
  variants: {
    variant: {
      outline: "border border-border bg-white px-3 py-1.5 text-graphite",
      brand: "bg-brand px-3 py-1.5 text-white",
      soft: "bg-mist px-3 py-1.5 text-brand",
    },
  },
  defaultVariants: { variant: "outline" },
});

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
