export type Availability = {
  [key: string]: { start: string; end: string } | null;
};

export interface FormDataProps {
  categories: string[];
  title: string;
  description: string;
  price: string;
  location: string;
  workType: "remoto" | "presencial" | "ambos";
  availability: Availability;
}
