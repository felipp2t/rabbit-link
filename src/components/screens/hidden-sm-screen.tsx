import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HiddenInTheSMScreenProps {
  children: ReactNode;
  className?: string;
}

export function HiddenInTheSMScreen({
  children,
  className,
}: HiddenInTheSMScreenProps) {
  return <div className={cn("block sm:hidden", className)}>{children}</div>;
}
