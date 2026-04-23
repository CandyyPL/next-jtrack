import { supabase } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { Board } from '@/lib/types';
import KanbanBoard from '@/components/kanban/kanban-board';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function getBoard(userId: string) {
  'use cache';

  const { data: rawData } = await supabase
    .from('board')
    .select()
    .eq('userId', userId)
    .single();

  return rawData as Board;
}

async function DashboardWrapper() {
  const session = await getSession();

  if (!session?.user) {
    redirect('/sign-in');
  }

  const board = await getBoard(session.user.id);

  return (
    <main className='min-h-[calc(100vh-4rem-1px)]'>
      <div className='container mx-auto p-6'>
        <header className='mb-6'>
          <h1 className='text-3xl font-bold text-black'>{board.name}</h1>
          <p className='text-gray-600'>Track your job applications.</p>
        </header>
        <KanbanBoard
          board={board}
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
