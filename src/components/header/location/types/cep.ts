import { z } from "zod";

export const cepValidation = z.object({
  cep: z
    .string()
    .length(9)
    .transform((value) => value.replace("-", "")),
});

export type CepSchema = z.infer<typeof cepValidation>;
