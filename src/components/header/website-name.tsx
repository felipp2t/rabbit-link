import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { HeaderGenericProps } from "./types/header-generic-props";

export function WebsiteName({ children, className }: HeaderGenericProps) {
  return (
    <h1
      className={cn(
        "cursor-pointer text-xl font-semibold tracking-tight",
        className,
      )}
    >
      <Link to="/">{children}</Link>
    </h1>
  );
}
