import { Application, Board, Column } from '@/lib/types';
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

  const sortedColumns =
    columns?.sort((a, b) => a.listOrder - b.listOrder) || [];

  return (
    <>
      <div>
        <div>
          {sortedColumns.map(async (col) => {
            const config = columnConfig[col.listOrder];

            const jobs = await databaseSelect<Application[]>({
              table: 'application',
              filters: { columnId: col.id },
            });

            const sortedJobs =
              jobs?.sort((a, b) => a.listOrder - b.listOrder) || [];

            return (
              <DroppableColumn
                key={col.id}
                columns={sortedColumns}
                col={col}
                config={config}
                boardId={board.id}
                jobs={sortedJobs}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
