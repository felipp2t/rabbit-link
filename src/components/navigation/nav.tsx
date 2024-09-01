import { cn } from "@/lib/utils"
import { SidebarGenericProps } from "./types/sidebar-generic-props"

export const Nav = ({ children, className }: SidebarGenericProps) => {
  return <nav className={cn("space-y-4", className)}>{children}</nav>
}
