'use client';

import { Application, Board, Column, FullBoardData } from '@/lib/types';
import React from 'react';
import { Award, Calendar, CheckCircle, Mic, XCircle } from 'lucide-react';
import { databaseSelect } from '@/lib/actions/database-select';
import DroppableColumn from '@/components/kanban/droppable-column';

type Props = {
  boardData: FullBoardData;
  userId: string;
};

export type ColumnConfig = {
  color: string;
  icon: React.ReactNode;
};

const columnConfig: Array<ColumnConfig> = [
  {
    color: 'bg-cyan-500',
    icon: <Calendar />,
  },
  {
    color: 'bg-purple-500',
    icon: <CheckCircle className='size-4' />,
  },
  {
    color: 'bg-green-500',
    icon: <Mic className='size-4' />,
  },
  {
    color: 'bg-yellow-500',
    icon: <Award className='size-4' />,
  },
  {
    color: 'bg-red-500',
    icon: <XCircle className='size-4' />,
  },
];

export default function KanbanBoard({ boardData, userId }: Props) {
  return (
    <>
      <div className='overflow-x-auto p-2'>
        <div className='flex justify-between gap-4'>
          {boardData.columns.map((col) => {
            const config = columnConfig[col.listOrder];

            return (
              <DroppableColumn
                key={col.id}
                columns={boardData.columns}
                col={col}
                config={config}
                boardId={boardData.id}
                jobs={col.applications}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
