import { z } from "zod";

export const sendEmailValidator = z.object({
  email: z.string().email(),
});

export type SendEmailSchema = z.infer<typeof sendEmailValidator>;
