'use server';

import { supabase } from '@/lib/supabase';
import { BoardUpdates } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function updateBoard(boardId: string, updates: BoardUpdates) {
  await supabase.from('board').update(updates).eq('id', boardId);
  revalidatePath('/dashboard');
}
