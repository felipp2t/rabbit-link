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
  birthDate: string;
  role: string;
}
