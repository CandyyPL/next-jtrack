import { Application, Column } from '@/lib/types';
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

type DroppableColumnProps = {
  columns: Column[];
  col: Column;
  config: ColumnConfig;
  boardId: string;
  jobs: Application[];
};

export default function DroppableColumn({
  columns,
  col,
  config,
  jobs,
}: DroppableColumnProps) {
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
      <CardContent className='min-h-100 space-y-2 rounded-b-lg bg-gray-50/50 p-4'>
        {jobs?.map((job) => (
          <JobApplicationCard
            key={job.id}
            job={job}
            columns={columns}
          />
        ))}
        <CreateJobDialog columnId={col.id} />
      </CardContent>
    </Card>
  );
}
