import { Address } from "@/types/address";
import { User } from "@/types/user";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

interface UserState {
  user: User;

  setUser: (user: User) => void;
  addAddress: (address: Address) => void;
  updateAddresses: (addresses: Address[]) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: {
    addresses: [
      {
        id: uuidv4(),
        type: "APARTAMENTO",
        address: {
          cep: "88804100",
          city: "Criciúma",
          state: "SC",
          neighborhood: "Santa Bárbara",
          street: "Rua Argemiro Frutuoso",
          number: 385,
        },
        apartmentNumber: 201,
        apartamentName: "Edifício Santa Bárbara",
        selected: true,
      },
      {
        id: uuidv4(),
        type: "CASA",
        address: {
          cep: "88804100",
          neighborhood: "Santa Bárbara",
          city: "Siderópolis",
          state: "SC",
          street: "Rua Argemiro Frutuoso",
          number: 385,
        },
        apartmentNumber: 201,
        apartamentName: "Edifício Santa Bárbara",
        selected: false,
      },
    ],
    birthDate: "",
    cpf: "",
    description: null,
    email: "",
    name: "",
    password: "",
    phone: "",
    profession: null,
    profilePicture: null,
    role: "",
    token: "",
  },

  setUser: (user) => set({ ...user, user }),

  addAddress: (newAddress) =>
    set((state) => ({
      user: {
        ...state.user,
        addresses: state.user.addresses
          ? [...state.user.addresses, newAddress]
          : [newAddress],
      },
    })),

  updateAddresses: (addresses) =>
    set((state) => ({ user: { ...state.user, addresses } })),
}));
