import { ServiceResponse } from '@/@types/service/service-response';

interface getServicesByCategoryProps {
  categoryId: string;
}

export async function getServicesByCategory({
  categoryId,
}: getServicesByCategoryProps) {
  try {
    const services = await fetch(
      `http://localhost:80/api/services/categories/${categoryId}`,
    );
    const data: ServiceResponse[] = await services.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
