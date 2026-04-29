import DashboardClient from '@/components/dashboard/dashboard-client';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Application, Board, Column, FullBoardData } from '@/lib/types';
import { Suspense } from 'react';
import { MoonLoader } from 'react-spinners';
import Loader from '@/components/dashboard/loader';

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
    applications: applications
      .filter((job) => job.columnId === col.id)
      .sort((a, b) => a.listOrder - b.listOrder),
  }));

  const fullBoardData: FullBoardData = { ...board, columns: populatedColumns };

  return fullBoardData;
}

async function DashboardContent() {
  const session = await getSession();

  if (!session?.user) redirect('/');

  const boardData = await getData(session.user.id);

  return (
    <DashboardClient
      boardData={boardData}
      userId={session.user.id}
    />
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<Loader />}>
      <DashboardContent />
    </Suspense>
  );
}
