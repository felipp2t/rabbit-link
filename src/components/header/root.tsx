import { cn } from "@/lib/utils";
import { HeaderGenericProps } from "./types/header-generic-props";

export const Root = ({ children, className }: HeaderGenericProps) => {
  return (
    <header
      className={cn(
        "xl:fixed xl:left-64 xl:top-0 flex h-16 w-full items-center gap-6 border-b px-6 bg-background",
        "xl:w-[calc(100%-16rem)] xl:z-50",
        className,
      )}
    >
      {children}
    </header>
  );
};
