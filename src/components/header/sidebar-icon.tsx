import { AlignLeft } from "lucide-react";
import { Sidebar } from "../sidebar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export function SidebarIcon() {
  return (
    <div className="flex items-center xl:hidden">
      <Sheet>
        <SheetTrigger>
          <AlignLeft className="cursor-poiner size-5" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="h-full w-3/5 bg-slate-100 p-0 xl:w-2/5"
        >
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
}
