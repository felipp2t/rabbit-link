import { DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LocationGenericProps } from "./types/location-generic-props";

export function Title({ children, className }: LocationGenericProps) {
  return <DialogTitle className={cn("", className)}>{children}</DialogTitle>;
}
