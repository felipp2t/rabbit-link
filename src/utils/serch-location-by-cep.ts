import cep from "cep-promise";

export async function searchLocationByCEP(numbers: string) {
  if (numbers.includes("-")) {
    numbers = numbers.replace("-", "");
  }

  const location = await cep(numbers);

  return location;
}
