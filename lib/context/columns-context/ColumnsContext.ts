import { createContext, Dispatch, SetStateAction } from 'react';
import { Application, ColumnWithApplication, Optional } from '@/lib/types';
import { ColumnUpdates } from '@/lib/context/columns-context/ColumnsProvider';

export type ColumnsContext = {
  columns: ColumnWithApplication[];
  updates: ColumnUpdates[];
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
  setUpdates: Dispatch<SetStateAction<ColumnUpdates[]>>;
};

export const ColumnsContext = createContext<ColumnsContext | null>(null);
