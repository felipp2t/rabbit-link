import { cn } from "@/lib/utils";
import { HeaderGenericProps } from "./types/header-generic-props";

export const Root = ({ children, className }: HeaderGenericProps) => {
  return (
    <header
      className={cn(
        "flex w-full h-16 items-center gap-6 px-6 border-b",
        className,
      )}
    >
      {children}
    </header>
  );
};
