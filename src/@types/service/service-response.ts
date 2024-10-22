import { UUID } from 'node:crypto';
import { Category } from '../category';

export interface ServiceResponse {
  id: string;
  categories: Category[];
  title: string;
  description: string;
  budget: string;
  location: string;
  workType: 'REMOTO' | 'PRESENCIAL';
  deadline: string;
  createdAt: string;
  providerId: UUID;
}
