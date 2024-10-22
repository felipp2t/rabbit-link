import { ServiceResponse } from "@/@types/service/service-response";

export async function getServicesByUser() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch('http://localhost:80/api/services/user', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: ServiceResponse[] = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
}
