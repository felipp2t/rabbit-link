import { cn } from "@/lib/utils"
import { SidebarGenericProps } from "./types/sidebar-generic-props"

export const NavHeaderTitle = ({
  children,
  className,
}: SidebarGenericProps) => {
  return (
    <h4
      className={cn(
        "ml-3 text-sm font-semibold uppercase text-muted-foreground",
        className,
      )}
    >
      {children}
    </h4>
  )
}
