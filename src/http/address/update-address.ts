import { AddressSchema } from "@/types/address/address-schema";

interface updateAddressProps {
  address: AddressSchema;
  addressId: string;
}

export async function updateAddress({
  address,
  addressId,
}: updateAddressProps) {
  const token = localStorage.getItem("token");

  console.log(address)

  await fetch(`http://localhost:80/api/address/${addressId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      type: address.type,
      city: address.address.city,
      state: address.address.state,
      neighborhood: address.address.neighborhood,
      street: address.address.street,
      postalCode: address.address.cep,
      houseNumber: address.address.number,
      apartmentNumber: address.apartmentNumber || null,
      apartmentName: address.apartmentName || null,
    }),
  });
}
