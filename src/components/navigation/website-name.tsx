import { cn } from "@/lib/utils";
import { SidebarGenericProps } from "./types/sidebar-generic-props";

export const WebsiteName = ({ children, className }: SidebarGenericProps) => {
  return (
    <div
      className={cn(
        "cursor-pointer font-title text-2xl font-extrabold text-primary",
        className,
      )}
    >
      {children}
    </div>
  );
};
