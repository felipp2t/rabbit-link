import { cn } from "@/lib/utils";
import { LocationGenericProps } from "../types/location-generic-props";
import { DialogTitle } from "@/components/ui/dialog";

export interface TitleWithoutContentProps {
  show: boolean;
}

export function TitleWithoutContent({
  children,
  className,
  show = false,
}: LocationGenericProps<TitleWithoutContentProps>) {
  return (
    <DialogTitle className={cn("hidden", show && "block", className)}>
      {children}
    </DialogTitle>
  );
}
