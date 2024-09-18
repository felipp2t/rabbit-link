export interface Address {
  id: string;
  type: "CASA" | "APARTAMENTO";
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
  selected: boolean;
}
