import { cn } from "@/lib/utils";
import { DialogHeader } from "../ui/dialog";
import { LocationGenericProps } from "./types/location-generic-props";

export function Header({ children, className }: LocationGenericProps) {
  return <DialogHeader className={cn("", className)}>{children}</DialogHeader>;
}
