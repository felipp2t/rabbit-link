import { ServiceResponse } from "@/@types/service/service-response";

interface getServiceByIdProps {
  id: string
}

export async function getServiceById({ id }: getServiceByIdProps) {
  try {
    const response = await fetch(`http://localhost:80/api/services/${id}`);
    const data: ServiceResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
