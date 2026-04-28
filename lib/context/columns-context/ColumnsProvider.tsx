import { Application, ColumnWithApplication, Optional } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import { ColumnsContext } from '@/lib/context/columns-context/ColumnsContext';

type Props = {
  children: React.ReactNode;
  initialColumns: ColumnWithApplication[] | null;
};

type ColumnUpdates = {
  jobId: string;
  columnId: string;
  listOrder: number;
};

export default function ColumnsProvider({ children, initialColumns }: Props) {
  const [columns, setColumns] = useState<ColumnWithApplication[]>(
    initialColumns ?? []
  );

  const [updates, setUpdates] = useState<ColumnUpdates[]>([]);

  useEffect(() => console.log(updates), [updates]);

  const handleAddJob = (job: Application, newColumnId: string) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== newColumnId) return col;

        const newItem = {
          ...job,
          listOrder: col.applications.length,
          columnId: newColumnId,
        };

        return {
          ...col,
          applications: [...col.applications, newItem],
        };
      })
    );
  };

  const handleAddJobAtIndex = (
    job: Application,
    newColumnId: string,
    index: number
  ) => {
    const newColumn = columns.find((col) => col.id === newColumnId);
    if (!newColumn) return;

    const newApplications = [
      ...newColumn.applications.slice(0, index),
      { ...job, listOrder: index, columnId: newColumnId },
      ...newColumn.applications
        .slice(index)
        .map((item) => ({ ...item, listOrder: item.listOrder + 1 })),
    ];

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === newColumnId) {
          return {
            ...col,
            applications: newApplications,
          };
        }

        return col;
      })
    );
  };

  const handleMoveJob = (
    job: Application,
    targetColumnId: string,
    order: number
  ) => {
    const targetColumn = columns.find((col) => col.id === targetColumnId);
    if (!targetColumn) return;

    if (order === -1) order = targetColumn?.applications.length;

    handleDeleteJob(job.id);
    const newJob = { ...job, columnId: targetColumnId, listOrder: order };
    handleAddJob(newJob, targetColumnId);
    addUpdate(job.id, targetColumnId, order);
  };

  const handleUpdateJob = (jobId: string, updates: Optional<Application>) => {
    const column = columns.find((col) =>
      col.applications.some((job) => job.id === jobId)
    );
    if (!column) return;

    const existingJob = column.applications.find((job) => job.id === jobId);
    if (!existingJob) return;

    const newApplication: Application = { ...existingJob, ...updates };

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === existingJob?.columnId) {
          return {
            ...col,
            applications: [
              ...col.applications.filter((job) => job.id !== existingJob.id),
              newApplication,
            ],
          };
        }

        return col;
      })
    );
  };

  const handleDeleteJob = (jobId: string) => {
    const column = columns.find((col) =>
      col.applications.find((job) => job.id === jobId)
    );
    if (!column) return;

    const deleteIndex = column.applications.findIndex(
      (job) => job.id === jobId
    );
    if (deleteIndex === -1) return;

    const newApplications = [
      ...column.applications.slice(0, deleteIndex),
      ...column.applications
        .slice(deleteIndex + 1)
        .map((job) => ({ ...job, listOrder: job.listOrder - 1 })),
    ];

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === column.id) {
          return {
            ...col,
            applications: newApplications,
          };
        }

        return col;
      })
    );
  };

  const handleSwapJobs = (columnId: string, a: number, b: number) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column) return;

    const itemA = column.applications[a];
    const itemB = column.applications[b];

    itemA.listOrder = b;
    itemB.listOrder = a;

    const newApplications = [...column.applications];
    newApplications[a] = itemB;
    newApplications[b] = itemA;

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === columnId) {
          return { ...col, applications: newApplications };
        }

        return col;
      })
    );
  };

  const handleRenewColumns = (columns: ColumnWithApplication[]) => {
    setColumns(columns);
  };

  const addUpdate = (jobId: string, columnId: string, listOrder: number) => {
    setUpdates((prev) => [...prev, { jobId, columnId, listOrder }]);
  };

  const provide = {
    columns,
    handleAddJob,
    handleMoveJob,
    handleUpdateJob,
    handleDeleteJob,
    handleSwapJobs,
    handleAddJobAtIndex,
    handleRenewColumns,
  };

  return (
    <ColumnsContext.Provider value={provide}>
      {children}
    </ColumnsContext.Provider>
  );
}
