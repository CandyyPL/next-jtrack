'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function deleteApplication(id: string) {
  await supabase.from('application').delete().eq('id', id);
  revalidatePath('/dashboard');
}
