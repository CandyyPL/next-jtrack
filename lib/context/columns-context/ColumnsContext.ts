import React, { createContext } from 'react';
import { Application, ColumnWithApplication } from '@/lib/types';

export type ColumnsContext = {
  columns: ColumnWithApplication[];
  handleAddJob: (job: Application, newColumnId: string) => void;
  handleMoveJob: (
    job: Application,
    targetColumnId: string,
    order: number
  ) => void;
  handleDeleteJob: (jobId: string) => void;
  handleSwapJobs: (columnId: string, idx1: number, idx2: number) => void;
  handleAddJobAtIndex: (
    job: Application,
    newColumnId: string,
    index: number
  ) => void;
  handleRenewColumns: (columns: ColumnWithApplication[]) => void;
};

export const ColumnsContext = createContext<ColumnsContext | null>(null);
