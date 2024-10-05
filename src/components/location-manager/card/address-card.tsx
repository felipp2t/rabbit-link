import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LocationGenericProps } from "../types/location-generic-props";

export function AddressCard({ children, className }: LocationGenericProps) {
  return (
    <Card className={cn("", className)}>
      <form className="h-20 w-full p-4">
        <div className="flex h-full items-center gap-6">{children}</div>
      </form>
    </Card>
  );
}
