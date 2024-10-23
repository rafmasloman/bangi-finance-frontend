import { z } from 'zod';

export const UserFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email harus diinput' })
    .email({ message: `Email harus sesuai format` }),
  username: z.string().min(1, { message: `Username harus diinput` }),
  password: z.string().min(6, { message: `Password minimal 6 huruf` }),
  firstname: z.string().min(1, { message: `Nama Depan harus diinput` }),
  lastname: z.string().min(1, { message: `Nama Belakang harus diinput` }),
  phoneNumber: z.string().optional(),
});

export interface IUserInputFormProps {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
}
