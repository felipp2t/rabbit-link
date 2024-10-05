import cep from "cep-promise";
import { validateCEP } from "./validate-cep";

export async function searchAddressByCEP(numbers: string) {
  const cepTransformedToOnlyNumbers = validateCEP(numbers);
  const address = await cep(cepTransformedToOnlyNumbers);

  return address;
}
