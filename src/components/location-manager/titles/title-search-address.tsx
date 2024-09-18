import { cn } from "@/lib/utils";
import { DialogTitle } from "../../ui/dialog";
import { LocationGenericProps } from "../types/location-generic-props";

export interface TitleSearchAddressProps {
  show: boolean;
}

export function TitleSearchAddress({
  children,
  className,
  show,
}: LocationGenericProps<TitleSearchAddressProps>) {
  return (
    <DialogTitle
      className={cn("hidden", show && "block", className)}
    >
      {children}
    </DialogTitle>
  );
}
