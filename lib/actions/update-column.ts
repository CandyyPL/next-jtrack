'use server';

import { Column, ColumnUpdates } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function updateColumn(
  columnId: string,
  updates: ColumnUpdates | Column
) {
  const { error } = await supabase
    .from('column')
    .update(updates)
    .eq('id', columnId);
  console.log(error);
  revalidatePath('/dashboard');
}
