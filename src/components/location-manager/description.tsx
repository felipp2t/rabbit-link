import { cn } from "@/lib/utils";
import { DialogDescription } from "../ui/dialog";
import { LocationGenericProps } from "./types/location-generic-props";

interface DescriptionProps {
  show: boolean;
}

export function Description({
  children,
  className,
  show = false,
}: LocationGenericProps<DescriptionProps>) {
  return (
    <DialogDescription className={cn("hidden", className, show && "block")}>
      {children}
    </DialogDescription>
  );
}
