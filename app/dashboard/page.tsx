import { supabase } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { Application, Board, Column, FullBoardData } from '@/lib/types';
import KanbanBoard from '@/components/kanban/kanban-board';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function getData(userId: string) {
  'use cache';

  const { data: rawBoard } = await supabase
    .from('board')
    .select()
    .eq('userId', userId)
    .single();

  const board = rawBoard as Board;

  const { data: rawColumns } = await supabase
    .from('column')
    .select()
    .eq('boardId', board.id);

  const columns = rawColumns as Column[];

  const { data: rawApplications } = await supabase
    .from('application')
    .select()
    .in(
      'columnId',
      columns.map((col) => col.id)
    );

  const applications = rawApplications as Application[];

  const populatedColumns = columns.map((col) => ({
    ...col,
    applications: applications.filter((job) => job.columnId === col.id),
  }));

  const fullBoardData: FullBoardData = { ...board, columns: populatedColumns };

  return fullBoardData;
}

async function DashboardWrapper() {
  const session = await getSession();

  if (!session?.user) {
    redirect('/sign-in');
  }

  const boardData = await getData(session.user.id);

  return (
    <main className='min-h-[calc(100vh-4rem-1px)]'>
      <div className='container mx-auto p-6'>
        <header className='mb-6'>
          <h1 className='text-3xl font-bold text-black'>{boardData.name}</h1>
          <p className='text-gray-600'>Track your job applications.</p>
        </header>
        <KanbanBoard
          boardData={boardData}
          userId={session.user.id}
        />
      </div>
    </main>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardWrapper />
    </Suspense>
  );
}
