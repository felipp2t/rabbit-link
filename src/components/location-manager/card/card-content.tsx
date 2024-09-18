import { cn } from "@/lib/utils";
import { LocationGenericProps } from "../types/location-generic-props";

export function CardContent({ children, className }: LocationGenericProps) {
  return (
    <div className={cn("pointer-events-none flex-grow select-none", className)}>
      {children}
    </div>
  );
}
