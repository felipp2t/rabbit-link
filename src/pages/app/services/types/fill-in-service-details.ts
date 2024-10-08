import { z } from "zod";

export const ServiceDetailsValidation = z
  .object({
    title: z
      .string({ required_error: "Obrigatório" })
      .min(5, "O título deve ter no mínimo 5 caracteres"),
    description: z
      .string({ required_error: "Obrigatório" })
      .min(50, "A descrição deve ter no mínimo 50 caracteres"),
    price: z.object({
      minimum: z.string({ required_error: "Obrigatório" }).refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num) && num >= 1;
        },
        {
          message: "O preço mínimo é 1",
        },
      ),
      maximum: z.string({ required_error: "Obrigatório" }).refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num) && num <= 10000;
        },
        {
          message: "O valor máximo  é 10.000",
        },
      ),
    }),
    location: z.object({
      id: z.string(),
      city: z.string().nonempty({ message: "Cidade é obrigatória" }),
      state: z.string().nonempty({ message: "Estado é obrigatório" }),
    }),
    workType: z.enum(["REMOTE", "ONSITE", "HYBRID"], {
      required_error: "Tipo de trabalho é obrigatório",
    }),
    deadline: z.string()
  })
  .refine(
    (fields) => {
      const min = Number(fields.price.minimum);
      const max = Number(fields.price.maximum);
      return min < max;
    },
    {
      message: "O preço mínimo deve ser menor que o preço máximo",
      path: ["price", "minimum"],
    },
  )
  .refine(
    (fields) => {
      const today = new Date();
      const maxDeadline = new Date(today);
      maxDeadline.setDate(today.getDate() + 7);
      return fields.deadline <= maxDeadline.toISOString();
    },
    {
      message:
        "O prazo para inscrições não pode ser superior a 7 dias a partir de hoje",
      path: ["deadline"],
    },
  );

export type ServiceDetailsSchema = z.infer<typeof ServiceDetailsValidation>;
