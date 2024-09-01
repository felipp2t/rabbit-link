import { cn } from "@/lib/utils"
import { SidebarGenericProps } from "./types/sidebar-generic-props"

export const Header = ({ children, className }: SidebarGenericProps) => {
  return (
    <header
      className={cn(
        "flex h-16 items-center border-b px-6",
        className,
      )}
    >
      {children}
    </header>
  )
}
