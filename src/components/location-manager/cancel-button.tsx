import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { LocationGenericProps } from "./types/location-generic-props";

interface CancelButtonProps {
  onClick: () => void;
}

export function CancelButton({
  children,
  className,
  onClick,
}: LocationGenericProps<CancelButtonProps>) {
  return (
    <DialogClose asChild onClick={onClick}>
      <Button variant="outline" className={cn("text-gray-500", className)}>
        {children}
      </Button>
    </DialogClose>
  );
}
