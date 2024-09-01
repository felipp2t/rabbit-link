import { cn } from "@/lib/utils"
import { SidebarGenericProps } from "./types/sidebar-generic-props"

export const Logo = ({ children, className }: SidebarGenericProps) => {
  return (
    <div
      className={cn(
        "flex size-8 items-center justify-center rounded-md ",
        className,
      )}
    >
      {children}
    </div>
  )
}
