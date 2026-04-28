'use client';

import KanbanBoard from '@/components/dashboard/kanban/kanban-board';
import { FullBoardData } from '@/lib/types';
import { useColumns } from '@/lib/hooks/useColumns';
import ColumnsProvider from '@/lib/context/columns-context/ColumnsProvider';
import { useEffect, useState } from 'react';

type Props = {
  boardData: FullBoardData;
};

function Dashboard({ boardData }: Props) {
  const { areColumnsUpdated } = useColumns();
  const [needUpdate, setNeedUpdate] = useState<boolean>();

  useEffect(() => {
    setNeedUpdate(areColumnsUpdated());
  }, [areColumnsUpdated]);

  return (
    <main className='min-h-[calc(100vh-4rem-1px)]'>
      <div className='container mx-auto p-6'>
        <header className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-black'>{boardData?.name}</h1>
            <p className='text-gray-600'>Track your job applications.</p>
          </div>
          {needUpdate ? <button>Save Changes</button> : <span>Up to date</span>}
        </header>
        <KanbanBoard boardData={boardData} />
      </div>
    </main>
  );
}

export default function DashboardClient({ boardData }: Props) {
  return (
    <ColumnsProvider initialColumns={boardData.columns}>
      <Dashboard boardData={boardData} />
    </ColumnsProvider>
  );
}
