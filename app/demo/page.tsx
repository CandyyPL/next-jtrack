'use client';

import KanbanBoard from '@/components/dashboard/kanban/kanban-board';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { CircleQuestionMark } from 'lucide-react';
import ColumnsProvider from '@/lib/context/columns-context/ColumnsProvider';
import { Application, FullBoardData } from '@/lib/types';
import { DEMO_BOARD } from '@/lib/demo-boards';

type Props = {
  boardData: FullBoardData;
};

function Demo({ boardData }: Props) {
  return (
    <main className='min-h-[calc(100vh-4rem-1px)]'>
      <div className='container mx-auto p-6'>
        <header className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='flex items-center gap-2 text-3xl font-bold text-black'>
              Demo Board
              <HoverCard
                openDelay={10}
                closeDelay={100}>
                <HoverCardTrigger
                  asChild
                  className='cursor-default'>
                  <CircleQuestionMark />
                </HoverCardTrigger>
                <HoverCardContent className='flex w-48 justify-center'>
                  <p className='text-center text-sm font-medium'>
                    If you want to change title of your board, just create a
                    free account!
                  </p>
                </HoverCardContent>
              </HoverCard>
            </h1>
            <p className='text-gray-600'>
              Try this Job Application tracking Kanban Board.
            </p>
          </div>
        </header>
        <KanbanBoard boardData={boardData} />
      </div>
    </main>
  );
}

export default function DemoDashboard() {
  const boardData = DEMO_BOARD;

  return (
    <ColumnsProvider
      initialColumns={boardData.columns}
      userId={null}>
      <Demo boardData={boardData} />
    </ColumnsProvider>
  );
}
