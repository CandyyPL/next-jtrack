import { Application, ColumnWithApplication, Optional } from '@/lib/types';
import React, { useMemo, useState } from 'react';
import { ColumnsContext } from '@/lib/context/columns-context/ColumnsContext';

type Props = {
  children: React.ReactNode;
  initialColumns: ColumnWithApplication[] | null;
  userId: string | null;
};

export type ColumnUpdates = {
  jobId: string;
  columnId: string;
  listOrder: number;
};

export default function ColumnsProvider({
  children,
  initialColumns,
  userId,
}: Props) {
  const [columns, setColumns] = useState<ColumnWithApplication[]>(
    initialColumns ?? []
  );
  const [updates, setUpdates] = useState<ColumnUpdates[]>([]);

  const originalData = useMemo(() => {
    if (!userId) return [];

    return (
      initialColumns?.flatMap((col) =>
        col.applications.map((job) => ({
          jobId: job.id,
          columnId: job.columnId,
          listOrder: job.listOrder,
        }))
      ) ?? []
    );
  }, [initialColumns]);

  const handleAddJob = (job: Application, newColumnId: string) => {
    const newColumn = columns.find((col) => col.id === newColumnId);
    if (!newColumn) return;

    const newIndex = newColumn.applications.length;

    addUpdate(job.id, newColumnId, newIndex);

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== newColumnId) return col;

        const newItem = {
          ...job,
          listOrder: newIndex,
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

  const handleMoveJob = (job: Application, targetColumnId: string) => {
    const targetColumn = columns.find((col) => col.id === targetColumnId);
    if (!targetColumn) return;

    const index = targetColumn.applications.length;

    addUpdate(job.id, targetColumnId, index);
    handleDeleteJob(job.id);
    handleAddJob(job, targetColumnId);
  };

  const handleUpdateJob = (jobId: string, updates: Optional<Application>) => {
    const column = columns.find((col) =>
      col.applications.some((job) => job.id === jobId)
    );
    if (!column) return;

    const existingJob = column.applications.find((job) => job.id === jobId);
    if (!existingJob) return;

    const newApplication = { ...existingJob, ...updates };

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

    const itemA = { ...column.applications[a], listOrder: b };
    const itemB = { ...column.applications[b], listOrder: a };

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
    if (!userId) return;

    setUpdates((prev) => {
      const updateIndex = prev.findIndex((item) => item.jobId === jobId);

      if (updateIndex === -1) return [...prev, { jobId, columnId, listOrder }];

      const original = originalData.find((item) => item.jobId === jobId);
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
    if (!userId) return;

    setUpdates((prev) => prev.filter((item) => item.jobId !== jobId));
  };

  const areColumnsUpdated = () => updates.length > 0;

  const isApplicationUpdated = (jobId: string) => {
    return updates.some((item) => item.jobId === jobId);
  };

  const isAuthenticated = () => !!userId;

  const provide = {
    columns,
    updates,
    handleAddJob,
    handleMoveJob,
    handleUpdateJob,
    handleDeleteJob,
    handleSwapJobs,
    handleAddJobAtIndex,
    handleRenewColumns,
    areColumnsUpdated,
    isApplicationUpdated,
    setUpdates,
    isAuthenticated,
  };

  return (
    <ColumnsContext.Provider value={provide}>
      {children}
    </ColumnsContext.Provider>
  );
}
