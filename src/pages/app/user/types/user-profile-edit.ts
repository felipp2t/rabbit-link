import { z } from "zod";

export const editProfileInfoSchema = z.object({
  profilePicture: z.any(),
  name: z.string({ required_error: "nome é obrigatório" }),
  email: z
    .string({ required_error: "e-mail é obrigatório" })
    .email("e-mail inválido"),
  phone: z.string({ required_error: "telefone é obrigatório" }),
  description: z.string().optional(),
  profession: z.string()
});

export type EditProfileInfoSchema = z.infer<typeof editProfileInfoSchema>;
