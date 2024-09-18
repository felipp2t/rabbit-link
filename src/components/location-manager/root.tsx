import { Dialog } from "../ui/dialog";
import { LocationGenericProps } from "./types/location-generic-props";

export function Root({ children }: LocationGenericProps) {
  return <Dialog>{children}</Dialog>;
}
