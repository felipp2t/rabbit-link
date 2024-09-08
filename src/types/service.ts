export type Availability = {
  [key: string]: { start: string; end: string } | null
};

export interface Service {
  id: string;
  categories: string[];
  title: string;
  description: string;
  price: string;
  location: string;
  workType: "remoto" | "presencial" | "híbrido";
  availability: Availability;
}
