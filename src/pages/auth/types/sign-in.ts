import { z } from "zod";

export const signInValidation = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInSchema = z.infer<typeof signInValidation>;
