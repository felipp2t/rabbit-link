import { cn } from "@/lib/utils";
import { LocationGenericProps } from "../types/location-generic-props";

export function CardType({ children, className }: LocationGenericProps) {
  return <h4 className={cn("font-medium lowercase", className)}>{children}</h4>;
}
