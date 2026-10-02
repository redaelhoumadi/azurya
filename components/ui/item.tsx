import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Élément de liste « icône + titre + description ».
 * Adapté de la primitive Item de Launch UI (MIT, © Mikolaj Dobrucki).
 */
function Item({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="item" className={cn("flex flex-col gap-3", className)} {...props} />;
}

function ItemIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="item-icon"
      aria-hidden="true"
      className={cn("shape-a grid h-11 w-14 shrink-0 place-items-center bg-mist text-brand", className)}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="item-title" className={cn("display text-xl leading-snug", className)} {...props} />;
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="item-description" className={cn("prose-body leading-relaxed text-graphite", className)} {...props} />
  );
}

export { Item, ItemDescription, ItemIcon, ItemTitle };
