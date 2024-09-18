import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LocationGenericProps } from "../types/location-generic-props";

export function CardOptions({ children, className }: LocationGenericProps) {
  return (
    <Button
      className={cn(
        "group grid size-8 place-content-center self-start bg-transparent p-0 text-muted-foreground hover:bg-transparent",
        className,
      )}
    >
      {children}
    </Button>
  );
}
