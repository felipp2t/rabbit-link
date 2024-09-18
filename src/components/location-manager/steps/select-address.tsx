import { cn } from "@/lib/utils";
import { LocationGenericProps } from "../types/location-generic-props";

export interface SelectAddressProps {
  show: boolean;
}

export function SelectAddress({
  children,
  className,
  show,
}: LocationGenericProps<SelectAddressProps>) {
  return (
    <div
      className={cn("hidden space-y-4", className, show && "block")}
    >
      {children}
    </div>
  );
}
