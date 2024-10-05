import { z } from "zod";

export const addressValidation = z.object({
  type: z.enum(["HOUSE", "APARTMENT"]),
  address: z.object({
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    number: z.coerce.number(),
  }),
  apartmentName: z.string().optional(),
  apartmentNumber: z.coerce.number().optional(),
});

export type AddressSchema = z.infer<typeof addressValidation>;
