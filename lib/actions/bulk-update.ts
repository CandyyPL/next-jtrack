'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { ApplicationUpdates } from '@/lib/types';

export async function bulkUpdateApplications(updates: ApplicationUpdates[]) {
  if (updates.length === 0) return;

  for (const update of updates) {
    const { jobId, columnId, listOrder } = update;

    await supabase
      .from('application')
      .update({ columnId, listOrder })
      .eq('id', jobId);
  }

  revalidatePath('/dashboard');
}
