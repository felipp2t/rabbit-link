import { DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { LocationGenericProps } from "../types/location-generic-props";

export interface TitleConfirmAddressProps {
  show: boolean;
}

export function TitleConfirmAddress({
  children,
  className,
  show = false,
}: LocationGenericProps<TitleConfirmAddressProps>) {
  return (
    <DialogTitle
      className={cn("hidden", show && "block", className)}
    >
      {children}
    </DialogTitle>
  );
}
