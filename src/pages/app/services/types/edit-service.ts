import { z } from 'zod';

export const editServiceSchema = z
  .object({
    title: z
      .string({ required_error: 'Obrigatório' })
      .min(5, 'O título deve ter no mínimo 5 caracteres'),
    description: z
      .string({ required_error: 'Obrigatório' })
      .min(50, 'A descrição deve ter no mínimo 50 caracteres'),
    price: z.object({
      minimum: z.string({ required_error: 'Obrigatório' }).refine(
        val => {
          const num = Number(val);
          return !Number.isNaN(num) && num >= 1;
        },
        {
          message: 'O preço mínimo é 1',
        },
      ),
      maximum: z.string({ required_error: 'Obrigatório' }).refine(
        val => {
          const num = Number(val);
          return !Number.isNaN(num) && num <= 10000;
        },
        {
          message: 'O valor máximo  é 10.000',
        },
      ),
    }),
    location: z.object({
      id: z.string(),
      city: z.string({ required_error: 'Cidade é obrigatória' }),
      state: z.string({ required_error: 'Estado é obrigatório' }),
    }),
    workType: z.enum(['REMOTE', 'ONSITE'], {
      required_error: 'Tipo de trabalho é obrigatório',
    }),
    categories: z.array(
      z.object({
        id: z.string(),
      }),
      { required_error: 'Selecione ao menos uma categoria' },
    ),
  })
  .refine(
    fields => {
      const min = Number(fields.price.minimum);
      const max = Number(fields.price.maximum);
      return min < max;
    },
    {
      message: 'O preço mínimo deve ser menor que o preço máximo',
      path: ['price', 'minimum'],
    },
  );

export type EditServiceSchema = z.infer<typeof editServiceSchema>;
