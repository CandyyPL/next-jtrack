import { Application, ColumnWithApplication, Optional } from '@/lib/types';
import React, { useState } from 'react';
import { ColumnsContext } from '@/lib/context/columns-context/ColumnsContext';

type Props = {
  children: React.ReactNode;
  initialColumns: ColumnWithApplication[] | null;
};

export type ColumnUpdates = {
  jobId: string;
  columnId: string;
  listOrder: number;
};

export default function ColumnsProvider({ children, initialColumns }: Props) {
  const [columns, setColumns] = useState<ColumnWithApplication[]>(
    initialColumns ?? []
  );
  const [updates, setUpdates] = useState<ColumnUpdates[]>([]);

  const originalColumns =
    initialColumns?.flatMap((col) =>
      col.applications.map((job) => ({
        jobId: job.id,
        columnId: job.columnId,
        listOrder: job.listOrder,
      }))
    ) ?? [];

  const handleAddJob = (job: Application, newColumnId: string) => {
    addUpdate(job.id, newColumnId, 0);

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

    const movedApplications = newColumn.applications
      .slice(index)
      .map((job) => ({ ...job, listOrder: job.listOrder + 1 }));

    movedApplications.forEach((job) =>
      addUpdate(job.id, job.columnId, job.listOrder)
    );

    const newApplications = [
      ...newColumn.applications.slice(0, index),
      { ...job, listOrder: index, columnId: newColumnId },
      ...movedApplications,
    ];

    addUpdate(job.id, newColumnId, index);

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

    addUpdate(job.id, targetColumnId, order);
    handleDeleteJob(job.id);
    const newJob = { ...job, columnId: targetColumnId, listOrder: order };
    handleAddJob(newJob, targetColumnId);
  };

  const handleUpdateJob = (jobId: string, updates: Optional<Application>) => {
    const column = columns.find((col) =>
      col.applications.some((job) => job.id === jobId)
    );
    if (!column) return;

    const existingJob = column.applications.find((job) => job.id === jobId);
    if (!existingJob) return;

    const newApplication: Application = { ...existingJob, ...updates };

    removeUpdate(jobId);

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

    const movedApplications = column.applications
      .slice(deleteIndex + 1)
      .map((job) => ({ ...job, listOrder: job.listOrder - 1 }));

    movedApplications.forEach((job) =>
      addUpdate(job.id, job.columnId, job.listOrder)
    );

    const newApplications = [
      ...column.applications.slice(0, deleteIndex),
      ...movedApplications,
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

    addUpdate(itemA.id, columnId, b);
    addUpdate(itemB.id, columnId, a);

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
    setUpdates((prev) => {
      const updateIndex = updates.findIndex((item) => item.jobId === jobId);

      if (updateIndex === -1) return [...prev, { jobId, columnId, listOrder }];

      const original = originalColumns.find((item) => item.jobId === jobId);
      if (
        original &&
        original.columnId === columnId &&
        original.listOrder === listOrder
      ) {
        return prev.filter((item) => item.jobId !== jobId);
      }

      return prev.map((item) => {
        if (item.jobId === jobId) {
          return { ...item, columnId, listOrder };
        }

        return item;
      });
    });
  };

  const removeUpdate = (jobId: string) => {
    setUpdates((prev) => prev.filter((item) => item.jobId !== jobId));
  };

  const areColumnsUpdated = () => updates.length > 0;

  const isApplicationUpdated = (jobId: string) => {
    return updates.some((item) => item.jobId === jobId);
  };

  const getOriginal = (jobId: string) => {
    return originalColumns.find((job) => job.jobId === jobId) ?? null;
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
    areColumnsUpdated,
    isApplicationUpdated,
  };

  return (
    <ColumnsContext.Provider value={provide}>
      {children}
    </ColumnsContext.Provider>
  );
}
