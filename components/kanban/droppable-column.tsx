import { ColumnWithApplication } from '@/lib/types';
import React from 'react';
import { ColumnConfig } from '@/components/kanban/kanban-board';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import CreateJobDialog from '@/components/dialogs/create-job-dialog';
import ColumnDropdown from '@/components/kanban/column-dropdown';
import JobApplicationCard from '@/components/kanban/job-application/job-application-card';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type DroppableColumnProps = {
  columns: ColumnWithApplication[];
  col: ColumnWithApplication;
  config: ColumnConfig;
  boardId: string;
};

export default function DroppableColumn({
  columns,
  col,
  config,
}: DroppableColumnProps) {
  const { setNodeRef } = useDroppable({ id: col.id });

  return (
    <Card className='min-h-150 w-100 shrink-0 gap-0 p-0 shadow-md'>
      <CardHeader className={`${config.color} rounded-t-lg py-3 text-white`}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {config.icon}
            <CardTitle className='text-base font-semibold text-white'>
              {col.name}
            </CardTitle>
          </div>
          <ColumnDropdown />
        </div>
      </CardHeader>
      <CardContent
        ref={setNodeRef}
        className='h-full min-h-100 space-y-2 rounded-b-lg bg-gray-50/50 p-4'>
        <SortableContext
          items={col.applications}
          strategy={verticalListSortingStrategy}>
          {col.applications?.map((job) => (
            <JobApplicationCard
              key={job.id}
              job={job}
              columns={columns}
            />
          ))}
        </SortableContext>
        <CreateJobDialog columnId={col.id} />
      </CardContent>
    </Card>
  );
}
