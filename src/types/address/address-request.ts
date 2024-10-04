export interface AddressRequest {
  id: string;
  type: "HOUSE" | "APARTAMENT";
  address: {
    cep: string;
    city: string;
    neighborhood: string;
    state: string;
    street: string;
    number: number;
  };
  apartmentNumber?: number;
  apartamentName?: string;
}
