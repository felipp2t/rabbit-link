import { z } from "zod";

export const resetPasswordValidation = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais.",
    path: ["confirmPassword"],
  });

  export type ResetPasswordSchema = z.infer<typeof resetPasswordValidation>