import { AddressRequest } from "@/types/address/address-request";

export async function createAddress(address: Omit<AddressRequest, "id">) {
  console.log(address);

  const token = localStorage.getItem("token");

  console.log(token);

  if (!token) {
    throw new Error("Token not found");
  }

  await fetch("http://localhost:80/api/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      state: address.address.state,
      city: address.address.city,
      neighborhood: address.address.neighborhood,
      street: address.address.street,
      postalCode: address.address.cep,
      houseNumber: Number(address.address.number),
      type: address.type,
      apartmentNumber: Number(address.apartmentNumber),
      apartmentName: address.apartamentName,
    }),
  });
}
