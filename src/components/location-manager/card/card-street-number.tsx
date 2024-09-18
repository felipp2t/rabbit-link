import { cn } from "@/lib/utils";
import { LocationGenericProps } from "../types/location-generic-props";

export function CardStreetNumber({
  children,
  className,
}: LocationGenericProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
