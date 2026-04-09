import { z } from 'zod';

export const SignInFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const SignUpFormSchema = SignInFormSchema.extend({
  repeatPassword: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
  error: 'Passwords do not match',
  path: ['repeatPassword'],
});

export type SignInFormType = z.infer<typeof SignInFormSchema>;
export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
