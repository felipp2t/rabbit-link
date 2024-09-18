import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { LocationGenericProps } from "../types/location-generic-props";

export interface AddressCardProps extends ComponentProps<"div"> {
  selected?: boolean;
}

export function AddressCard({
  children,
  className,
  selected,
  onClick
}: LocationGenericProps<AddressCardProps>) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer",
        selected ? "ring-2 ring-primary" : "hover:border-gray-500",
        className,
      )}
    >
      <form className="h-20 w-full p-4">
        <div className="flex h-full items-center gap-6">{children}</div>
      </form>
    </Card>
  );
}
