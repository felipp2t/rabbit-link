import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BlockInTheMDScreenProps {
  children: ReactNode;
  className?: string;
}

export function BlockInTheMDScreen({
  children,
  className,
}: BlockInTheMDScreenProps) {
  return <div className={cn("hidden md:block", className)}>{children}</div>;
}
