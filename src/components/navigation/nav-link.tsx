import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { SidebarGenericProps } from "./types/sidebar-generic-props";

type NavLinkProps = {
  to: string;
};

export const NavLink = ({
  children,
  className,
  to,
}: SidebarGenericProps<NavLinkProps>) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-1.5 px-3 py-2 text-base",
        className,
        pathname === to && "bg-muted rounded"
      )}
    >
      {children}
    </Link>
  );
};
