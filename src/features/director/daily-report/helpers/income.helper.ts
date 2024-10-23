import { z } from 'zod';

export const IncomeFormSchema = z.object({
  //   username: z.string().min(1, { message: 'Username harus diisi' }),
  date: z.date({ required_error: `Tanggal harus dipilih` }),
  itemSales: z.number().min(1, { message: 'Item sales harus diisi' }),
  itemDiscount: z.number().optional(),
  billDiscount: z.number().optional(),
  focItem: z.number().optional(),
  focBill: z.number().optional(),
  service: z.number().min(1, { message: 'Biaya Service harus diisi' }),
});

export interface IIncomeFormInputData {
  date: Date;
  itemSales: number;
  itemDiscount?: number;
  billDiscount?: number;
  focItem?: number;
  focBill: number;
  service: number;
  historyId: string;
  userId: string;
}
