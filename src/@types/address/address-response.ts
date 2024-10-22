export interface AddressResponse {
  id: string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  postalCode: string;
  houseNumber: number;
  type: "HOUSE" | "APARTMENT";
  apartmentNumber?: number 
  apartmentName?: string
}
