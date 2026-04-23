'use server';

import { supabase } from '@/lib/supabase';
import { Board } from '@/lib/types';
import { DEFAULT_COLUMNS } from '@/lib/default-columns';

async function initColumns(boardId: string) {
  const columns = DEFAULT_COLUMNS.map((column) => ({
    ...column,
    boardId,
  }));

  await supabase.from('column').insert(columns);
}

export async function initUserBoards(userId: string) {
  const { data: rawExisting } = await supabase
    .from('board')
    .select()
    .eq('userId', userId)
    .eq('name', 'Job Hunt')
    .maybeSingle();

  const existingBoard = rawExisting as Board;

  if (existingBoard) {
    await initColumns(existingBoard.id);
    return;
  }

  const board = {
    name: 'Job Hunt',
    userId,
  };

  const { data: rawSaved } = await supabase
    .from('board')
    .insert(board)
    .select()
    .single();

  const saved = rawSaved as Board;
  await initColumns(saved.id);
}
