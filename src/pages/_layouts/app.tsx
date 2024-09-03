import { Header } from "@/components/header";
import { BlockInTheSMScreen } from "@/components/hidden-and-block/block-sm-screen";
import { BlockInTheXLScreen } from "@/components/hidden-and-block/block-xl-screen";
import { HiddenInTheSMScreen } from "@/components/hidden-and-block/hidden-sm-screen";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Rabbit } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <BlockInTheXLScreen className="fixed left-0 top-0 h-full w-64">
        <Sidebar />
      </BlockInTheXLScreen>

      <div className="xl:ml-64">
        <Header.Root className="flex items-center justify-between">
          <Header.Group>
            <Header.SidebarIcon />
            <Header.Logo>
              <Rabbit className="size-8 text-muted" />
            </Header.Logo>
          </Header.Group>

          <BlockInTheSMScreen className="w-1/3">
            <Header.SearchInput className="w-full" />
          </BlockInTheSMScreen>

          <ThemeToggle />
        </Header.Root>

        <HiddenInTheSMScreen>
          <Header.SearchInput className="mx-auto my-4 w-96" />
        </HiddenInTheSMScreen>

        <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
