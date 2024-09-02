import { cn } from "@/lib/utils";
import { SidebarGenericProps } from "./types/sidebar-generic-props";

export const Logo = ({ children, className }: SidebarGenericProps) => {
  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-full bg-primary p-1.5",
        className,
      )}
    >
      {children}
    </div>
  );
};
