import { cn } from "@/lib/utils";
import { DialogTrigger } from "../ui/dialog";
import { LocationGenericProps } from "./types/location-generic-props";

export function Trigger({ children, className }: LocationGenericProps) {
  return (
    <DialogTrigger className={cn("", className)} asChild>{children}</DialogTrigger>
  );
}
