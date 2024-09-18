import { cn } from "@/lib/utils";
import { DialogFooter } from "../ui/dialog";
import { LocationGenericProps } from "./types/location-generic-props";

export function Footer({ children, className }: LocationGenericProps) {
  return <DialogFooter className={cn("", className)}>{children}</DialogFooter>;
}
