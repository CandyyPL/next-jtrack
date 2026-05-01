import { z } from 'zod';
import { type DraggableAttributes } from '@dnd-kit/core';
import { type SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { type Transform } from '@dnd-kit/utilities';
import type { IconName } from 'lucide-react/dynamic';

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

export const ColumnFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  color: z.string(),
  icon: z.string(),
  listOrder: z.number(),
});

export type ColumnFormType = z.infer<typeof ColumnFormSchema>;

export type Board = {
  id: string;
  userId: string;
  name: string;
  desc: string;
};

export type BoardUpdates = {
  id: string;
  name: string;
  description: string;
};

export type Column = {
  id: string;
  boardId: string;
  name: string;
  listOrder: number;
  color: string;
  icon: string;
};

export type ColumnConfig = {
  color: string;
  icon: React.ReactNode;
};

export type ColumnUpdates = {
  name: string;
  color: string;
  icon: string;
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

export type ApplicationUpdates = {
  jobId: string;
  columnId: string;
  listOrder: number;
};

export type ColumnWithApplication = Column & {
  applications: Application[];
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

export type Color = {
  id: string;
  name: string;
  tw: string;
  hex: string;
};

export type Icon = {
  id: string;
  name: string;
  value: IconName;
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
