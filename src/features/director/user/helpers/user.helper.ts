import { z } from 'zod';

const baseUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email harus diinput' })
    .email({ message: `Email harus sesuai format` }),
  username: z.string().min(1, { message: `Username harus diinput` }),
  firstname: z.string().min(1, { message: `Nama Depan harus diinput` }),
  lastname: z.string().min(1, { message: `Nama Belakang harus diinput` }),
  phoneNumber: z.string().optional(),
});

// Schema untuk membuat pengguna
const createUserSchema = baseUserSchema.extend({
  password: z.string().min(6, { message: `Password minimal 6 huruf` }),
});

// Schema untuk memperbarui pengguna
const updateUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(6, { message: `Password minimal 6 huruf` })
    .optional(),
});

export interface IUserInputFormProps {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  role: string;
}

export { createUserSchema, updateUserSchema };
