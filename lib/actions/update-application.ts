'use server';

import { Application, Optional } from '@/lib/types';
import { getSession } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function updateApplication(
  applicationId: string,
  updates: Optional<Application>
) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const { id, columnId, listOrder, ...other } = updates;

  const newApplication = { columnId, listOrder, ...other };

  await supabase
    .from('application')
    .update(newApplication)
    .eq('id', applicationId);

  revalidatePath('/dashboard');
}
