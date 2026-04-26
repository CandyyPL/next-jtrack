'use server';

import { Application, Optional } from '@/lib/types';
import { getSession } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function updateApplication(
  id: string,
  updates: Optional<Application>
) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const { data: rawData, error } = await supabase
    .from('application')
    .select()
    .eq('id', id)
    .single();

  if (error || !rawData) {
    throw new Error(
      error?.details ||
        'An error occurred during recalling current application.'
    );
  }

  const application = rawData as Application;

  const { columnId, listOrder, ...other } = updates;

  const otherUpdates: Optional<Application> = other;

  const currentColumnId = application.columnId;
  const newColumnId = columnId;

  const isMovingToDifferentColumn =
    newColumnId && newColumnId !== currentColumnId;

  // TODO: work in progress
}
