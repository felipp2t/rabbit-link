import { Header } from "@/components/header";
import { HiddenInTheXLScreen } from "@/components/screens/hidden-xl-screen";
import { Sidebar } from "@/components/sidebar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <div className="h-full">
        <HiddenInTheXLScreen className="fixed left-0 top-0 h-full">
          <Sidebar />
        </HiddenInTheXLScreen>

        <Header.Root className="fixed left-0 top-0 xl:left-64">
          <Header.Group>
            <Header.SidebarIcon />
            <Header.WebsiteName>Rabbit Link</Header.WebsiteName>
          </Header.Group>
        </Header.Root>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
