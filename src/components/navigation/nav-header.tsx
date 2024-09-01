import { cn } from "@/lib/utils"
import { SidebarGenericProps } from "./types/sidebar-generic-props"

export const NavHeader = ({ children, className }: SidebarGenericProps) => {
  return <header className={cn("", className)}>{children}</header>
}
