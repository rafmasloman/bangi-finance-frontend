import { z } from 'zod';

export const ExpenseCategoryFormSchema = z.object({
  name: z.string().min(1, { message: 'Nama Supplier harus diinput' }),
});

export interface IExpenseCategoryInputProps {
  name: string;
}
