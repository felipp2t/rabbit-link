export interface Availability {
  [key: string]: { start: string; end: string } | null;
}

export interface Location {
  id: string;
  city: string;
  state: string;
}

export interface Service {
  id: string;
  categories: string[];
  title: string;
  description: string;
  price: string;
  location: Location;
  workType: "REMOTO" | "PRESENCIAL" | "HÍBRIDO";
  availability: Availability;
}
