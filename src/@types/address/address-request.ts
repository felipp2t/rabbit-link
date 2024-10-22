export interface AddressRequest {
  id: string;
  type: "HOUSE" | "APARTMENT";
  address: {
    cep: string;
    city: string;
    neighborhood: string;
    state: string;
    street: string;
    number: number;
  };
  apartmentNumber?: number;
  apartmentName?: string;
}
