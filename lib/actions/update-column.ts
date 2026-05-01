'use server';

import { ColumnUpdates, Optional } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function updateColumn(
  columnId: string,
  updates: Optional<ColumnUpdates>
) {
  await supabase.from('column').update(updates).eq('id', columnId);
  revalidatePath('/dashboard');
}
