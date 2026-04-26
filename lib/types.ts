import { z } from 'zod';

export const SignInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const SignUpFormSchema = SignInFormSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  repeatPassword: z.string(),
}).refine((data) => data.password === data.repeatPassword, {
  error: 'Passwords do not match',
  path: ['repeatPassword'],
});

export type SignInFormType = z.infer<typeof SignInFormSchema>;
export type SignUpFormType = z.infer<typeof SignUpFormSchema>;

export type Board = {
  id: string;
  userId: string;
  name: string;
};

export type Column = {
  id: string;
  boardId: string;
  name: string;
  listOrder: number;
};

export type Application = {
  id: string;
  columnId: string;
  company: string;
  position: string;
  location: string;
  listOrder: number;
  salary: string;
  url: string;
  desc: string;
  tags: string;
};

export type ColumnWithApplication = Column & {
  applications: Application[];
};

export type FullBoardData = Board & {
  columns: ColumnWithApplication[];
};

export const JobFormSchema = z.object({
  company: z.string().nonempty(),
  position: z.string().nonempty(),
  location: z.string(),
  salary: z.string(),
  url: z.httpUrl().or(z.literal('')),
  tags: z.string(),
  desc: z.string().max(200),
  notes: z.string().max(100),
});

export type JobFormDataType = z.infer<typeof JobFormSchema>;

export type Optional<T> = {
  [K in keyof T]?: T[K];
};
