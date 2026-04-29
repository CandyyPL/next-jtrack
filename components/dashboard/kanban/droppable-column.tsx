import { ColumnConfig, ColumnWithApplication } from '@/lib/types';
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import CreateJobDialog from '@/components/dialogs/create-job-dialog';
import ColumnDropdown from '@/components/dashboard/kanban/column-dropdown';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import JobApplicationCardWrapper from '@/components/dashboard/kanban/job-application/job-application-card-wrapper';

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
    <Card className='flex min-h-150 flex-1 shrink-0 flex-col gap-0 bg-gray-50/50 p-0 shadow-md'>
      <CardHeader className={`${config.color} rounded-t-lg py-4 text-white`}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {config.icon}
            <CardTitle className='text-base font-semibold text-white'>
              {col.name}
            </CardTitle>
          </div>
          {/*<ColumnDropdown columnId={col.id} />*/}
        </div>
      </CardHeader>
      <CardContent
        ref={setNodeRef}
        className='space-y-2 rounded-b-lg p-4'>
        <SortableContext
          items={col.applications}
          strategy={verticalListSortingStrategy}>
          {col.applications?.map((job) => (
            <JobApplicationCardWrapper
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
