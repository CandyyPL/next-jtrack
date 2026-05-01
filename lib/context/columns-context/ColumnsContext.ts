import { createContext, Dispatch, SetStateAction } from 'react';
import {
  Application,
  ApplicationUpdates,
  ColumnUpdates,
  ColumnWithApplication,
  Optional,
} from '@/lib/types';

export type ColumnsContext = {
  columns: ColumnWithApplication[];
  updates: ApplicationUpdates[];
  handleAddJob: (job: Application, newColumnId: string) => void;
  handleMoveJob: (job: Application, targetColumnId: string) => void;
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
  setUpdates: Dispatch<SetStateAction<ApplicationUpdates[]>>;
  handleUpdateColumn: (columnId: string, updates: ColumnUpdates) => void;
  isAuthenticated: () => boolean;
};

export const ColumnsContext = createContext<ColumnsContext | null>(null);
