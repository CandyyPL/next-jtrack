'use server';

import { ColumnUpdates } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

type Props = {
  updates: ColumnUpdates;
};

export async function updateColumn({ updates }: Props) {
  await supabase.from('column').update(updates).eq('id', updates.id);
  revalidatePath('/dashboard');
}
