import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BlockInTheSMScreenProps {
  children: ReactNode;
  className?: string;
}

export function BlockInTheSMScreen({
  children,
  className,
}: BlockInTheSMScreenProps) {
  return <div className={cn("hidden sm:block", className)}>{children}</div>;
}
