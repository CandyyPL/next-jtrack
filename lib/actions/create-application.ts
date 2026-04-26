'use server';

import { supabase } from '@/lib/supabase';
import { Application, JobFormDataType, Optional } from '@/lib/types';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createApplication(
  formData: JobFormDataType,
  columnId: string
) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const { count } = await supabase
    .from('application')
    .select('*', { count: 'exact', head: true })
    .eq('columnId', columnId);

  const application: Omit<Application, 'id'> = {
    ...formData,
    columnId,
    listOrder: count ?? 0,
  };

  revalidatePath('/dashboard');

  return supabase.from('application').insert(application);
}
