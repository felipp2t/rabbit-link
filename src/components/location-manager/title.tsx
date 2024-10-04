import { cn } from "@/lib/utils";
import { DialogTitle } from "@/components/ui/dialog";
import { LocationGenericProps } from "./types/location-generic-props";

export interface TitleProps {
  show: boolean;
}

export function Title({
  children,
  className,
  show = false,
}: LocationGenericProps<TitleProps>) {
  return (
    <DialogTitle className={cn("hidden", show && "block", className)}>
      {children}
    </DialogTitle>
  );
}