import { cn } from "@/lib/utils";
import { SidebarGenericProps } from "./types/sidebar-generic-props";

export const Main = ({ children, className }: SidebarGenericProps) => {
  return (
    <main className={cn("flex flex-grow flex-col px-3", className)}>
      {children}
    </main>
  );
};
