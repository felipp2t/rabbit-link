import { cn } from "@/lib/utils";
import { SidebarGenericProps } from "./types/sidebar-generic-props";

export const NavLinkTitle = ({ children, className }: SidebarGenericProps) => {
  return <h2 className={cn("text-sm", className)}>{children}</h2>;
};
