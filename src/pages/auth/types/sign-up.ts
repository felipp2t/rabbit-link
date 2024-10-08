import { transformDateToISO, verifyLeepYear } from "@/utils/date";
import { cpf } from "cpf-cnpj-validator";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
import { z } from "zod";

dayjs.extend(isLeapYear);

function isAtLeast18YearsOld(date: string) {
  return dayjs().diff(dayjs(date), "year") >= 18;
}

export const signUpValidation = z
  .object({
    name: z.string().min(10),
    cpf: z
      .string()
      .length(14)
      .refine((value) => cpf.isValid(value), {
        message: "CPF inválido",
      }),
    birthDate: z
      .string()
      .length(10)
      .transform((value) => transformDateToISO(value))
      .refine((value) => dayjs(value).isValid(), {
        message: "Data inválida",
      })
      .refine((value) => verifyLeepYear(value), {
        message: "Data inválida",
      })
      .refine((value) => isAtLeast18YearsOld(value), {
        message: "Precisa se mair de 18 anos",
      }),
    phone: z.string().length(15),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    profilePicture: z.any().optional(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não são iguais",
  });

export type SignUpSchema = z.infer<typeof signUpValidation>;
