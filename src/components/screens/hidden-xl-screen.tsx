import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HiddenInTheXLScreenProps {
  children: ReactNode;
  className?: string;
}

export function HiddenInTheXLScreen({
  children,
  className,
}: HiddenInTheXLScreenProps) {
  return <div className={cn("hidden xl:block", className)}>{children}</div>;
}
