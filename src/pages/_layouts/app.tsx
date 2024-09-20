import { Header } from "@/components/header";
import { BlockInTheSMScreen } from "@/components/hidden-and-block/block-sm-screen";
import { BlockInTheXLScreen } from "@/components/hidden-and-block/block-xl-screen";
import { HiddenInTheSMScreen } from "@/components/hidden-and-block/hidden-sm-screen";
import { LocationPanel } from "@/components/location-manager";
import { LocationManagerModal } from "@/components/location-manager-modal";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useUserStore } from "@/context/use-user-store";
import { getUser } from "@/http/user/get-user";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Rabbit } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const { setUser } = useUserStore();

  const token = localStorage.getItem("token");

  const { data: user } = useQuery({
    queryKey: ["user", token],
    queryFn: async () => {
      if (token) {
        return await getUser({ token });
      }
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  if (user) {
    setUser(user);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background antialiased">
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

          <Header.Group className="md:gap-8">
            <LocationPanel.Root>
              <LocationPanel.Trigger>
                <div className="hover: flex cursor-pointer items-center gap-2 text-secondary-foreground">
                  <p className="text-sm">R. Argemiro Frutuoso, 402</p>
                  <ChevronDown className="size-6" />
                </div>
              </LocationPanel.Trigger>
              <LocationManagerModal />
            </LocationPanel.Root>
            <ThemeToggle />
          </Header.Group>
        </Header.Root>

        <HiddenInTheSMScreen>
          <Header.SearchInput className="mx-auto my-4 w-96" />
        </HiddenInTheSMScreen>

        <div className="flex flex-1 flex-col gap-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
