'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function deleteColumn(id: string) {
  await supabase.from('column').delete().eq('id', id);
  revalidatePath('/dashboard');
}
