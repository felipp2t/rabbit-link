import { AddressRequest } from '@/@types/address/address-request';
import { AddressResponse } from '@/@types/address/address-response';
import { Header } from '@/components/header';
import { BlockInTheSMScreen } from '@/components/hidden-and-block/block-sm-screen';
import { BlockInTheXLScreen } from '@/components/hidden-and-block/block-xl-screen';
import { HiddenInTheSMScreen } from '@/components/hidden-and-block/hidden-sm-screen';
import { LocationPanel } from '@/components/location-manager';
import { LocationManagerModal } from '@/components/location-manager-modal';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { getAddresses } from '@/http/address/get-addresses';
import { getUser } from '@/http/user/get-user';
import { useUserStore } from '@/stores/use-user-store';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, LogIn, Rabbit } from 'lucide-react';
import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ProfilePicture from '/imagem-perfil.jpg';

export function AppLayout() {
  const navigate = useNavigate();
  const { setUser, setAddresses, resetUser, user } = useUserStore();

  const { toast } = useToast();

  useEffect(() => {
    if (user?.addresses?.length === 0) {
      toast({
        title: 'Importante!',
        description:
          'Adicione um endereço para ver os serviços disponíveis na sua região.',
        variant: 'destructive',
        duration: 1000 * 7,
      });
    }
  }, [user, toast]);

  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    resetUser();
    navigate('/auth');
  };

  const { data: userFound, isLoading: isLoadinGetUser } = useQuery({
    queryKey: ['get-user-by-token', token],
    queryFn: async () => await getUser(),
    staleTime: 1000 * 60 * 15,
    enabled: !!token,
  });

  useEffect(() => {
    if (userFound && userFound.token !== user.token) {
      setUser(userFound);
    }
  }, [userFound, user, setUser]);

  const { data: addressesFound, isLoading: isLoadingGetAddresses } = useQuery({
    queryKey: ['get-addresses-by-token', token],
    queryFn: async () => await getAddresses(),
    staleTime: 1000 * 60 * 15,
    enabled: !!token,
  });

  useEffect(() => {
    if (addressesFound && addressesFound.length > 0) {
      const addresses = mapAddresses(addressesFound);

      setAddresses(addresses);
    }
  }, [addressesFound, setAddresses]);

  if (isLoadinGetUser || isLoadingGetAddresses) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col bg-background antialiased'>
      <BlockInTheXLScreen className='fixed left-0 top-0 h-full w-64'>
        <Sidebar />
      </BlockInTheXLScreen>

      <div className='xl:ml-64'>
        <Header.Root className='flex items-center justify-between'>
          <Header.Group>
            <Header.SidebarIcon />
            <BlockInTheXLScreen>
              <Header.Logo>
                <Rabbit className='size-8 text-muted' />
              </Header.Logo>
            </BlockInTheXLScreen>
          </Header.Group>

          <BlockInTheSMScreen className='w-1/3'>
            <Header.SearchInput className='w-full' />
          </BlockInTheSMScreen>
          <Header.Group className='md:gap-4'>
            {user && (
              <LocationPanel.Root>
                <LocationPanel.Trigger>
                  <Button variant='outline' className='space-x-2'>
                    <p className='text-xs md:text-sm'>Seus Endereços</p>
                    <ChevronDown className='size-5' />
                  </Button>
                </LocationPanel.Trigger>
                <LocationManagerModal />
              </LocationPanel.Root>
            )}
            <ThemeToggle />
            {!token ? (
              <Button
                variant='outline'
                className='aspect-square p-0'
                onClick={() => navigate('/auth')}
              >
                <LogIn className='size-5' />
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='overflow-hidden rounded-full'
                  >
                    <img
                      src={ProfilePicture}
                      alt='Avatar'
                      className='size-9 overflow-hidden rounded-full'
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel className=''>
                    Olá, Felipe
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='cursor-pointer'>
                    <Link to='/editar-perfil'>Configurações</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='cursor-pointer' onClick={logout}>
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </Header.Group>
        </Header.Root>

        <HiddenInTheSMScreen>
          <div className='px-8'>
            <Header.SearchInput className='mx-auto my-4 w-full' />
          </div>
        </HiddenInTheSMScreen>

        <div className='mt-4 xl:mt-16'>
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
      apartmentName: address.apartmentName,
    }),
  );

  return addressesMapped;
};
