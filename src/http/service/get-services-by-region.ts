import { ServiceResponse } from '@/@types/service/service-response';

export const getServicesByRegion = async (): Promise<
  ServiceResponse[] | undefined
> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:80/api/services/location', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data: ServiceResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
