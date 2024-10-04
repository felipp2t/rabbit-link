import { Header } from "@/components/header";
import { BlockInTheSMScreen } from "@/components/hidden-and-block/block-sm-screen";
import { BlockInTheXLScreen } from "@/components/hidden-and-block/block-xl-screen";
import { HiddenInTheSMScreen } from "@/components/hidden-and-block/hidden-sm-screen";
import { LocationPanel } from "@/components/location-manager";
import { LocationManagerModal } from "@/components/location-manager-modal";
import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/context/use-user-store";
import { getAddresses } from "@/http/address/get-addresses";
import { getUser } from "@/http/user/get-user";
import { AddressRequest } from "@/types/address/address-request";
import { AddressResponse } from "@/types/address/address-response";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Rabbit } from "lucide-react";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import ProfilePicture from "/imagem-perfil.jpg";

export function AppLayout() {
  const { setUser, setAddresses, user } = useUserStore();

  const token = localStorage.getItem("token");

  const { data: userFound, isLoading: isLoaginGetUser } = useQuery({
    queryKey: ["user", token],
    queryFn: async () => {
      if (token) {
        return await getUser({ token });
      }
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    enabled: !!token,
  });

  useEffect(() => {
    if (userFound && userFound.token !== user.token) {
      setUser(userFound);
    }
  }, [userFound, user, setUser]);

  const { data: addressesFound, isLoading: isLoadingGetAddresses } = useQuery({
    queryKey: ["get-addresses", token],
    queryFn: async () => {
      if (token) {
        return await getAddresses();
      }
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 15,
  });

  useEffect(() => {
    if (addressesFound) {
      const addresses = mapAddresses(addressesFound);

      setAddresses(addresses);
    }
  }, [addressesFound, setAddresses]);

  if (isLoaginGetUser || isLoadingGetAddresses) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
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
            <BlockInTheXLScreen>
              <Header.Logo>
                <Rabbit className="size-8 text-muted" />
              </Header.Logo>
            </BlockInTheXLScreen>
          </Header.Group>

          <BlockInTheSMScreen className="w-1/3">
            <Header.SearchInput className="w-full" />
          </BlockInTheSMScreen>
          <Header.Group className="md:gap-8">
            <LocationPanel.Root>
              <LocationPanel.Trigger>
                <div className="hover: flex cursor-pointer items-center gap-2 text-secondary-foreground">
                  <p className="text-xs md:text-sm">
                    R. Argemiro Frutuoso, 402
                  </p>
                  <ChevronDown className="size-4" />
                </div>
              </LocationPanel.Trigger>
              <LocationManagerModal />
            </LocationPanel.Root>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src={ProfilePicture}
                    alt="Avatar"
                    className="size-9 overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="">Olá, Felipe</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/editar-perfil">Configurações</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

const mapAddresses = (addresses: AddressResponse[]): AddressRequest[] => {
  const addressesMapped: AddressRequest[] = addresses.map(
    (address: AddressResponse) => ({
      id: address.id,
      type: address.type,
      address: {
        cep: address.postalCode,
        city: address.city,
        neighborhood: address.neighborhood,
        state: address.state,
        street: address.street,
        number: address.houseNumber,
      },
      apartmentNumber: address.apartmentNumber,
      apartamentName: address.apartmentName,
    }),
  );

  console.log(addresses)

  return addressesMapped;
}
