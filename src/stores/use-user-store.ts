import { AddressRequest } from '@/@types/address/address-request';
import { User } from '@/@types/user';
import { create } from 'zustand';

interface UserState {
  user: User;

  setUser: (user: User) => void;
  addAddress: (address: AddressRequest) => void;
  setAddresses: (addresses: AddressRequest[]) => void;
  updateAddresses: (addresses: AddressRequest[]) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(set => ({
  user: {
    addresses: [],
    birthDate: '',
    cpf: '',
    description: null,
    email: '',
    name: '',
    password: '',
    phone: '',
    profession: null,
    profilePicture: null,
    role: '',
    token: '',
    id: '',
  },

  setUser: user =>
    set(state => ({
      user: {
        ...state.user,
        token: user.token,
        name: user.name,
        email: user.email,
        addresses: user.addresses,
        birthDate: user.birthDate,
        cpf: user.cpf,
        phone: user.phone,
        description: user.description,
        password: user.password,
        profession: user.profession,
        profilePicture: user.profilePicture,
        role: user.role,
      },
    })),

  addAddress: newAddress =>
    set(state => ({
      user: {
        ...state.user,
        addresses: state.user.addresses
          ? [...state.user.addresses, newAddress]
          : [newAddress],
      },
    })),

  setAddresses: addresses =>
    set(state => ({ user: { ...state.user, addresses } })),

  updateAddresses: addresses =>
    set(state => ({ user: { ...state.user, addresses } })),

  resetUser: () =>
    set(() => ({
      user: {
        addresses: [],
        birthDate: '',
        cpf: '',
        description: null,
        email: '',
        name: '',
        password: '',
        phone: '',
        profession: null,
        profilePicture: null,
        role: '',
        token: '',
        id: '',
      },
    })),
}));
