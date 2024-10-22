import { AddressResponse } from "@/@types/address/address-response";

export async function getAddresses() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:80/api/address", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: AddressResponse[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
