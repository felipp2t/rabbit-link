import { cn } from "@/lib/utils";
import { DialogHeader } from "../ui/dialog";
import { LocationGenericProps } from "./types/location-generic-props";

export interface HeaderProps {
  show: boolean;
}

export function Header({
  children,
  className,
  show = false,
}: LocationGenericProps<HeaderProps>) {
  return (
    <DialogHeader className={cn("hidden space-y-1", show && "block", className)}>
      {children}
    </DialogHeader>
  );
}
