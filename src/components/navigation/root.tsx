import { cn } from "@/lib/utils";
import { SidebarGenericProps } from "./types/sidebar-generic-props";

export const Root = ({ children, className }: SidebarGenericProps) => {
  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col space-y-6 border-r bg-background",
        className,
      )}
    >
      {children}
    </aside>
  );
};
