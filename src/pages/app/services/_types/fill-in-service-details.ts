import { z } from "zod";

export const ServiceDetailsValidation = z.object({
  title: z.string().min(5, "O título deve ter no mínimo 5 caracteres"),
  description: z
    .string()
    .min(20, "A descrição deve ter no mínimo 20 caracteres"),
  price: z.string().min(1, "O preço deve ser maior que 0"),
  location: z.string().min(5, "A localização deve ter no mínimo 5 caracteres"),
  availability: z.object({}),
  workType: z.enum(["presencial", "remoto", "híbrido"]),
});

export type ServiceDetailsSchema = z.infer<typeof ServiceDetailsValidation>;
