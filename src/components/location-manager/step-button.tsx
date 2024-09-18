import { cn } from "@/lib/utils";
import { DialogFooter } from "../ui/dialog";
import { LocationGenericProps } from "./types/location-generic-props";

export function StepButton({ children, className }: LocationGenericProps) {
  return <DialogFooter className={cn("font-medium", className)}>{children}</DialogFooter>;
}
