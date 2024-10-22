import { ServiceResponse } from '@/@types/service/service-response';

export const getServicesByRegion = async (): Promise<
  ServiceResponse[] | undefined
> => {
  try {
    const response = await fetch(
      'http://localhost:80/api/services/categories/dbd56a8d-8731-4094-9be3-5e824e9f7387',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data: ServiceResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
