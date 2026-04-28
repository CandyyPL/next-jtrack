'use server';

import { ColumnUpdates } from '@/lib/context/columns-context/ColumnsProvider';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function bulkUpdateApplications(updates: ColumnUpdates[]) {
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
