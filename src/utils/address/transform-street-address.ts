import { CEP } from "cep-promise";

export function transformStreetAddress(location: CEP) {
  return {
    ...location,
    street: location.street.replace("Rua ", ""),
  };
}
