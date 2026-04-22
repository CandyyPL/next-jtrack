'use client';

import { Column } from '@/lib/types';
import React from 'react';
import { ColumnConfig } from '@/components/kanban-board';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Trash2 } from 'lucide-react';
import CreateJobDialog from '@/components/create-job-dialog';

type DroppableColumnProps = {
  column: Column;
  config: ColumnConfig;
  boardId: string;
};

export default function DroppableColumn({
  column,
  config,
  boardId,
}: DroppableColumnProps) {
  return (
    <Card className='min-w-75 shrink-0 p-0 shadow-md'>
      <CardHeader className={`${config.color} rounded-t-lg py-3 text-white`}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {config.icon}
            <CardTitle className='text-base font-semibold text-white'>
              {column.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='size-8 text-white hover:bg-white/20'>
                <MoreVertical className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-fit'>
              <DropdownMenuItem className='text-destructive'>
                <Trash2 className='mr-2 size-4' />
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className='min-h-100 space-y-2 rounded-b-lg bg-gray-50/50 pt-4'>
        <CreateJobDialog columnId={column.id} />
      </CardContent>
    </Card>
  );
}
