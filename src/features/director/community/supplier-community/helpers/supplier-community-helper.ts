import { z } from 'zod';

export const SupplierCommunityFormSchema = z.object({
  name: z.string({ message: 'Nama Supplier harus diinput' }),
});

export interface ISupplierCommunityInputProps {
  name: string;
}
