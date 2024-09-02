import { Header } from "@/components/header";
import { HiddenInTheXLScreen } from "@/components/screens/hidden-xl-screen";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <HiddenInTheXLScreen className="fixed left-0 top-0 h-full w-64">
        <Sidebar />
      </HiddenInTheXLScreen>

      <div className="xl:ml-64">
        <Header.Root className="flex items-center justify-between">
          <Header.Group>
            <Header.SidebarIcon />
            <Header.WebsiteName>Rabbit Link</Header.WebsiteName>
          </Header.Group>

          <ThemeToggle />
        </Header.Root>

        <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
