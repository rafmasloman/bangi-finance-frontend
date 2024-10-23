import { z } from 'zod';


export const LoginSchema = z.object({
  //   username: z.string().min(1, { message: 'Username harus diisi' }),
  email: z.string().min(1, { message: 'Email harus diisi' }),
  password: z.string().min(1, { message: 'Password harus diisi' }),
});
