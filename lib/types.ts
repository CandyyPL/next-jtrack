import { z } from 'zod';
import { type DraggableAttributes } from '@dnd-kit/core';
import { type SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { type Transform } from '@dnd-kit/utilities';

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

export type DemoBoard = {
  columns: ColumnWithDemoApplication[];
};

export type Column = {
  id: string;
  boardId: string;
  name: string;
  listOrder: number;
};

export type DemoColumnData = {
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

export type DemoApplication = {
  id: string;
  columnId: string;
  company: string;
  position: string;
  location: string;
  listOrder: number;
};

export type ColumnWithApplication = Column & {
  applications: Application[];
};

export type ColumnWithDemoApplication = Omit<Column, 'boardId'> & {
  applications: DemoApplication[];
};

export type FullBoardData = Board & {
  columns: ColumnWithApplication[];
};

export type SortableProps = {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
  setNodeRef: (node: HTMLElement | null) => void;
  transform: Transform | null;
  transition: string | undefined;
};

export const JobFormSchema = z.object({
  company: z.string().min(3, { error: 'Enter at least 3 characters' }),
  position: z.string().min(3, { error: 'Enter at least 3 characters' }),
  location: z.string(),
  salary: z.string(),
  url: z.httpUrl({ error: 'Enter a valid URL' }).or(z.literal('')),
  tags: z.string(),
  desc: z.string().max(200, { error: 'Enter no more than 200 characters' }),
});

export type JobFormDataType = z.infer<typeof JobFormSchema>;

export type Optional<T> = {
  [K in keyof T]?: T[K];
};
