import { UUID } from "crypto";
import { Category } from "../category";

export interface ServiceResponse {
  id: string;
  categories: Category[];
  title: string;
  description: string;
  price: string;
  location: string;
  workType: "REMOTE" | "ONSITE" | "HYBRID";
  deadline: string;
  createdAt: string;
  providerId: UUID;
}
