import { AddressRequest } from '@/@types/address/address-request';
import { CepSchema } from '@/@types/cep';
import { LocationPanel } from '@/components/location-manager';
import { Replace } from '@/helpers/replace';
import { deleteAddress } from '@/http/address/delete-address';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/stores/use-user-store';
import { handleAddressSearch } from '@/utils/address';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, EllipsisVertical, House, Pen, Trash } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function LocationManagerModal() {
  const [step, setStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addressIdToDelete, setAddressIdToDelete] = useState<string | null>(
    null,
  );
  const [addressDetails, setAddressDetails] = useState<
    Replace<AddressRequest, { id?: string; type?: 'HOUSE' | 'APARTMENT' }>
  >({
    apartmentName: '',
    apartmentNumber: 0,
    id: '',
    address: {
      cep: '',
      city: '',
      neighborhood: '',
      number: 0,
      state: '',
      street: '',
    },
  });

  const { user } = useUserStore();

  const verifyHasAnyAddress = () =>
    Array.isArray(user.addresses) && user.addresses.length > 0;

  const handleSubmit = async (data: CepSchema) =>
    await handleAddressSearch({ data, setAddressDetails, setStep });

  const searchUserAddress = (addressId: string) => {
    const foundAddress = user.addresses.find(
      address => address.id === addressId,
    );

    if (!foundAddress) {
      return;
    }

    setAddressDetails({
      id: foundAddress.id,
      type: 'HOUSE',
      address: {
        cep: foundAddress.address.cep,
        city: foundAddress.address.city,
        neighborhood: foundAddress.address.neighborhood,
        number: foundAddress.address.number,
        state: foundAddress.address.state,
        street: foundAddress.address.street,
      },
      apartmentName: foundAddress.apartmentName,
      apartmentNumber: foundAddress.apartmentNumber,
    });
   
    setStep(3);
  };

  const queryClient = useQueryClient();

  const { mutateAsync: deleteAddressMutation } = useMutation({
    mutationKey: ['delete-address', addressIdToDelete],
    mutationFn: async ({ addressIdToDelete }: { addressIdToDelete: string }) =>
      await deleteAddress(addressIdToDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-addresses'] });
    },
  });

  const handleDeleteAddress = () => {
    setIsDialogOpen(false);
    setAddressIdToDelete(null);

    if (!addressIdToDelete) {
      return;
    }

    deleteAddressMutation({ addressIdToDelete });
  };

  return (
    <LocationPanel.Content>
      <LocationPanel.Header show={!verifyHasAnyAddress() && step === 1}>
        <LocationPanel.Title>
          Parece que você não tem endereço cadastrado
        </LocationPanel.Title>
        <LocationPanel.Description>
          Para continuar, adicione um ou mais endereços à sua conta. Isso
          ajudará a agilizar seu processo de serviço e garantir que suas
          solicitações sejam atendidas de forma eficiente.
        </LocationPanel.Description>
      </LocationPanel.Header>

      <LocationPanel.Header show={verifyHasAnyAddress() && step === 1}>
        <LocationPanel.Title>Seus endereços</LocationPanel.Title>

        <LocationPanel.Description>
          Veja e gerencie seus endereços cadastrados. Adicione, edite ou remova
          endereços para garantir entregas precisas e rápidas.
        </LocationPanel.Description>
      </LocationPanel.Header>

      <LocationPanel.Header show={step === 2}>
        <LocationPanel.Title>
          <div className='flex items-center gap-4'>
            <ChevronLeft
              className='size-6 cursor-pointer text-primary'
              onClick={() => setStep(prev => prev - 1)}
            />
            <h2>Adicionar endereço</h2>
          </div>
        </LocationPanel.Title>
        <LocationPanel.Description className='ml-10'>
          Nesta etapa, você poderá inserir um novo endereço. Certifique-se de
          que a informação esteja correta
        </LocationPanel.Description>
      </LocationPanel.Header>

      <LocationPanel.Header show={!addressDetails.id && step === 3}>
        <LocationPanel.Title>
          <div className='flex items-center gap-4'>
            <ChevronLeft
              className='size-6 cursor-pointer text-primary'
              onClick={() => setStep(prev => prev - 1)}
            />
            <h2>Confirme o endereço</h2>
          </div>
        </LocationPanel.Title>
      </LocationPanel.Header>

      <LocationPanel.Header show={!!addressDetails.id && step === 3}>
        <LocationPanel.Title>
          <h2>Atualize seu endreço</h2>
        </LocationPanel.Title>
        <LocationPanel.Description>
          Revise as informações do endereço atual e faça as alterações
          necessárias para mantê-las sempre atualizadas.
        </LocationPanel.Description>
      </LocationPanel.Header>

      <LocationPanel.SelectAddress show={verifyHasAnyAddress() && step === 1}>
        {user?.addresses?.length > 0 &&
          user.addresses.map(address => (
            <LocationPanel.AddressCard key={address.id}>
              <House className='size-6' />
              <LocationPanel.CardContent>
                <LocationPanel.CardType>
                  {address.type === 'APARTMENT' ? (
                    <span className='capitalize'>
                      {address.type}, ap. {address.apartmentNumber}
                    </span>
                  ) : (
                    <span className='capitalize'>{address.type}</span>
                  )}
                </LocationPanel.CardType>
                <LocationPanel.CardStreetNumber>
                  <p className='line-clamp-2 text-sm'>
                    {address.address.street}, {address.address.number},{' '}
                    {address.address.city} - {address.address.state}
                  </p>
                </LocationPanel.CardStreetNumber>
              </LocationPanel.CardContent>
              <Button
               className='group grid size-8 place-content-center self-start bg-transparent p-0 hover:bg-transparent'
               onClick={(e) => e.preventDefault()}
               >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisVertical className='size-6 self-start border-none text-secondary-foreground hover:text-primary' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className='cursor-pointer'
                      onClick={() => searchUserAddress(address.id)}
                    >
                      <Pen className='mr-2 size-4' />
                      <p>Editar</p>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className='cursor-pointer'
                      onClick={() => {
                        setAddressIdToDelete(address.id);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Trash className='mr-2 size-4' />
                      <p>Excluir</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Button>
            </LocationPanel.AddressCard>
          ))}

        <LocationPanel.AlertDialogToDeleteAddress
          handleDeleteAddress={handleDeleteAddress}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />

        <LocationPanel.Footer>
          <LocationPanel.CancelButton onClick={() => setStep(1)}>
            Cancelar
          </LocationPanel.CancelButton>
          <Button
            className='semibold'
            disabled={user?.addresses?.length >= 3}
            onClick={() => setStep(prev => prev + 1)}
          >
            Adicione um novo endereço
          </Button>
        </LocationPanel.Footer>
      </LocationPanel.SelectAddress>

      <LocationPanel.SearchAddressByCep
        handleSearchAddress={handleSubmit}
        show={step === 2}
        setStep={setStep}
      />

      <LocationPanel.ConfirmAddress
        addressDetails={addressDetails}
        show={step === 3}
        setStep={setStep}
      />

      <LocationPanel.Footer
        className={cn(
          'hidden',
          !verifyHasAnyAddress() && step === 1 && 'block',
        )}
      >
        <LocationPanel.CancelButton onClick={() => setStep(1)}>
          Cancelar
        </LocationPanel.CancelButton>
        <Button className='semibold' onClick={() => setStep(prev => prev + 1)}>
          Adicione um endereço
        </Button>
      </LocationPanel.Footer>
    </LocationPanel.Content>
  );
}
