import { Board, Column } from '@/lib/types';
import React from 'react';
import { Award, Calendar, CheckCircle, Mic, XCircle } from 'lucide-react';
import { databaseSelect } from '@/lib/actions/database-select';
import DroppableColumn from '@/components/droppable-column';

type Props = {
  board: Board;
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

export default async function KanbanBoard({ board, userId }: Props) {
  const columns = await databaseSelect<Column[]>({
    table: 'column',
    filters: { boardId: board.id },
  });

  return (
    <>
      <div>
        <div>
          {columns?.map((col) => {
            const config = columnConfig[col.listOrder];

            return (
              <DroppableColumn
                key={col.id}
                column={col}
                config={config}
                boardId={board.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
