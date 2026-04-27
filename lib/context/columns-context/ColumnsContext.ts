import React, { createContext } from 'react';
import { Application, ColumnWithApplication } from '@/lib/types';

export type ColumnsContext = {
  columns: ColumnWithApplication[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnWithApplication[]>>;
  handleAddJob: (job: Application, newColumnId: string) => void;
  handleManualMoveJob: (job: Application, targetColumnId: string) => void;
  handleDeleteJob: (jobId: string) => void;
};

export const ColumnsContext = createContext<ColumnsContext | null>(null);
