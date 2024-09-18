import { cn } from "@/lib/utils";
import { DialogDescription } from "../ui/dialog";
import { LocationGenericProps } from "./types/location-generic-props";

export function Desription({ children, className }: LocationGenericProps) {
  return (
    <DialogDescription className={cn("", className)}>
      {children}
    </DialogDescription>
  );
}
