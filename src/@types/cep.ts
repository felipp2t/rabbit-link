import { z } from "zod";

export const cepValidation = z.object({
  cep: z.string().length(9, "CEP inválido"),
});

export type CepSchema = z.infer<typeof cepValidation>;
