import { cn } from "@/lib/utils";
import { DialogContent } from "../ui/dialog";
import { LocationGenericProps } from "./types/location-generic-props";

export function Content({ children, className }: LocationGenericProps) {
  return (
    <DialogContent className={cn("", className)}>{children}</DialogContent>
  );
}
