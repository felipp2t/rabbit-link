import { cn } from "@/lib/utils";
import { HeaderGenericProps } from "./types/header-generic-props";

export const Group = ({ children, className }: HeaderGenericProps) => {
  return (
    <div className={cn("flex items-center justify-around gap-4", className)}>
      {children}
    </div>
  );
};
