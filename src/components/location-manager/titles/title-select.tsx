import { DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LocationGenericProps } from "../types/location-generic-props";

export interface TitleSelectAddressProps {
  show?: boolean;
}

export function TitleSelectAddress({
  children,
  className,
  show = false,
}: LocationGenericProps<TitleSelectAddressProps>) {
  return (
    <DialogTitle className={cn("hidden", show && "block", className)}>
      {children}
    </DialogTitle>
  );
}
