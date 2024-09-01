import { cn } from "@/lib/utils"
import { SidebarGenericProps } from "./types/sidebar-generic-props"

export const NavMain = ({ children, className }: SidebarGenericProps) => {
  return <main className={cn("flex flex-col", className)}>{children}</main>
}
