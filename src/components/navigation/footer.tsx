import { cn } from "@/lib/utils"
import { SidebarGenericProps } from "./types/sidebar-generic-props"

export const Footer = ({ children, className }: SidebarGenericProps) => {
  return <footer className={cn("mt-auto border-t border-border p-4", className)}>{children}</footer>
}
