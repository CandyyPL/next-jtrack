'use server';

import { supabase } from '@/lib/supabase';

type Props = {
  table: string;
  filters: Record<string, string>;
};

export async function databaseSelect<T>({ table, filters }: Props): Promise<T> {
  let query = supabase.from(table).select();

  Object.entries(filters).forEach(([key, val]) => {
    query = query.eq(key, val);
  });

  const { data, error } = await query;

  if (error) {
    const errorMessage =
      'An error occurred:\nDetails: ' +
      error?.message +
      '\nCode: ' +
      error?.code +
      '\nHint: ' +
      error?.hint;

    throw new Error(errorMessage);
  }

  return data as T;
}
