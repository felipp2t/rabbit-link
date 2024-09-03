import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { HeaderGenericProps } from "./types/header-generic-props";

export function Logo({ children, className }: HeaderGenericProps) {
  return (
    <Button
      asChild
      className={cn(
        "flex size-10 items-center justify-center rounded-xl bg-primary p-1.5 hover:bg-primary",
        className,
      )}
    >
      <Link to="/">{children}</Link>
    </Button>
  );
}
