import { Category } from "../category";

export interface Location {
  id: string;
  city: string;
  state: string;
}

export interface ServiceRequest {
  id: string;
  categories: Category[];
  title: string;
  description: string;
  price: {
    minimum: string;
    maximum: string;
  };
  location: Location;
  workType: "REMOTE" | "ONSITE";
  deadline: string;
}
