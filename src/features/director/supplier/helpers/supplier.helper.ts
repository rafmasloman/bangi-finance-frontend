import { z } from 'zod';

export const SupplierInputSchema = z.object({
  evidence: z.string().min(1, { message: 'Keterangan harus diinput' }),
  quantity: z.number().min(1, { message: 'Jumlah harus diinput' }),
  price: z.number().min(1, { message: 'Harga harus diinput' }),
  discount: z.number(),
  date: z.date({ message: 'Tanggal harus diinput' }),
  ppn: z.number(),
});

export const tableHeadSuppliers = [
  {
    label: 'No',
  },
  { label: 'Tanggal' },
  { label: 'Supplier' },
  { label: 'Keterangan' },
  { label: 'Jumlah' },
  { label: 'Harga' },
  { label: 'Discount' },
  { label: 'PPN' },
  { label: 'Total' },
  { label: 'Status' },
  { label: 'Action' },
];

export const tableHeadSupplierCompany = [
  {
    label: 'No',
  },
  { label: 'Supplier Name' },
  { label: 'Action' },
];
