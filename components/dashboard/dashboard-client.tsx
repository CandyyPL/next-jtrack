'use client';

import KanbanBoard from '@/components/dashboard/kanban/kanban-board';
import { FullBoardData } from '@/lib/types';
import { useColumns } from '@/lib/hooks/useColumns';
import ColumnsProvider from '@/lib/context/columns-context/ColumnsProvider';
import { useEffect, useState } from 'react';
import { Button } from '@/components/shadcn/button';
import { CircleCheckBig, Save } from 'lucide-react';
import { bulkUpdateApplications } from '@/lib/actions/bulk-update';
import { MoonLoader } from 'react-spinners';

type Props = {
  boardData: FullBoardData;
};

function Dashboard({ boardData }: Props) {
  const { updates, setUpdates, areColumnsUpdated } = useColumns();
  const [needUpdate, setNeedUpdate] = useState<boolean>();

  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    setNeedUpdate(areColumnsUpdated());
  }, [areColumnsUpdated]);

  const handleSaveChanges = async () => {
    setSaveLoading(true);
    await bulkUpdateApplications(updates);
    setUpdates([]);
    setSaveLoading(false);
  };

  return (
    <main className='min-h-[calc(100vh-4rem-1px)]'>
      <div className='container mx-auto p-6'>
        <header className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-black'>{boardData?.name}</h1>
            <p className='text-gray-600'>Track your job applications.</p>
          </div>
          {needUpdate ? (
            <Button
              className='h-12 cursor-pointer px-4 font-semibold'
              onClick={() => handleSaveChanges()}
              disabled={saveLoading}>
              <Save />
              Save Changes
              {saveLoading && (
                <MoonLoader
                  size={14}
                  color='black'
                />
              )}
            </Button>
          ) : (
            <span className='flex h-12 items-center gap-2 rounded-md bg-green-100 px-4 py-2 font-semibold text-green-600'>
              <CircleCheckBig /> Up to date
            </span>
          )}
        </header>
        <KanbanBoard boardData={boardData} />
      </div>
    </main>
  );
}

type ClientProps = {
  boardData: FullBoardData;
  userId: string;
};

export default function DashboardClient({ boardData, userId }: ClientProps) {
  return (
    <ColumnsProvider
      initialColumns={boardData.columns}
      userId={userId}>
      <Dashboard boardData={boardData} />
    </ColumnsProvider>
  );
}
