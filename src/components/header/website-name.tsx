import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { HeaderGenericProps } from "./types/header-generic-props";

export function WebsiteName({ children, className }: HeaderGenericProps) {
  return (
    <h1
      className={cn(
        "font-title cursor-pointer text-2xl font-extrabold text-primary",
        className,
      )}
    >
      <Link to="/">{children}</Link>
    </h1>
  );
}
