import { Address } from "./address";

export interface User {
  profilePicture: string | null;
  name: string;
  email: string;
  password: string;
  token: string;
  cpf: string;
  phone: string;
  profession: string | null;
  description: string | null;
  addresses: Address[];
  birthDate: string;
  role: string;
}
