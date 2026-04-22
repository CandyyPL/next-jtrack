import { supabase } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { Board } from '@/lib/types';
import KanbanBoard from '@/components/kanban-board';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getSession();

  if (!session?.user) {
    redirect('/sign-in');
  }

  const { data: rawData } = await supabase
    .from('board')
    .select()
    .eq('userId', session.user.id)
    .single();

  const board = rawData as Board;

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
