import { AddressRequest } from "./address/address-request";

export interface User {
  id: string;
  profilePicture: string | null;
  name: string;
  email: string;
  password: string;
  token: string;
  cpf: string;
  phone: string;
  profession: string | null;
  description: string | null;
  addresses: AddressRequest[];
  birthDate: string;
  role: string;
}
