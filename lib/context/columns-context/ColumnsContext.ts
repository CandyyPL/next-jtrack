import { createContext } from 'react';
import { Application, ColumnWithApplication, Optional } from '@/lib/types';

export type ColumnsContext = {
  columns: ColumnWithApplication[];
  handleAddJob: (job: Application, newColumnId: string) => void;
  handleMoveJob: (
    job: Application,
    targetColumnId: string,
    order: number
  ) => void;
  handleUpdateJob: (jobId: string, updates: Optional<Application>) => void;
  handleDeleteJob: (jobId: string) => void;
  handleSwapJobs: (columnId: string, idx1: number, idx2: number) => void;
  handleAddJobAtIndex: (
    job: Application,
    newColumnId: string,
    index: number
  ) => void;
  handleRenewColumns: (columns: ColumnWithApplication[]) => void;
  areColumnsUpdated: () => boolean;
  isApplicationUpdated: (jobId: string) => boolean;
};

export const ColumnsContext = createContext<ColumnsContext | null>(null);
