import { AddressRequest } from '@/@types/address/address-request';
import { CepSchema } from '@/@types/cep';
import { Replace } from '@/helpers/replace';
import { Dispatch } from 'react';
import { searchAddressByCEP } from './search-address-by-cep';
import { transformStreetAddress } from './transform-street-address';

interface handleAddressSearchProps {
  data: CepSchema;
  setAddressDetails: Dispatch<
    React.SetStateAction<
      Replace<AddressRequest, { id?: string; type?: 'HOUSE' | 'APARTMENT' }>
    >
  >;
  setStep: Dispatch<React.SetStateAction<number>>;
}

export async function handleAddressSearch({
  data,
  setAddressDetails,
  setStep,
}: handleAddressSearchProps) {
  const location = await searchAddressByCEP(data.cep);
  const transformedAddress = transformStreetAddress(location);
  setAddressDetails({
    address: {
      cep: transformedAddress.cep,
      city: transformedAddress.city,
      neighborhood: transformedAddress.neighborhood,
      number: 0,
      state: transformedAddress.state,
      street: transformedAddress.street,
    },
    type: 'HOUSE',
  });
  setStep(prev => prev + 1);
}
