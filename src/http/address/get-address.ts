import { AddressResponse } from "@/@types/address/address-response";

interface getAddressProps {
  id: string;
}

export async function getAddress({ id }: getAddressProps) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:80/api/address/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: AddressResponse = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
