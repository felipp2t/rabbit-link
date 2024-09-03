import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BlockInTheXLScreenProps {
  children: ReactNode;
  className?: string;
}

export function BlockInTheXLScreen({
  children,
  className,
}: BlockInTheXLScreenProps) {
  return <div className={cn("hidden xl:block", className)}>{children}</div>;
}
