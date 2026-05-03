'use server';

import { Column } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function createColumn(
  boardId: string,
  data: Omit<Column, 'id' | 'boardId'>
) {
  const newColumn = { ...data, boardId };

  await supabase.from('column').insert(newColumn);
  revalidatePath('/dashboard');
}
