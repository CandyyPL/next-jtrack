import { Application, ColumnWithApplication } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import { ColumnsContext } from '@/lib/context/columns-context/ColumnsContext';

type Props = {
  children: React.ReactNode;
  initialColumns: ColumnWithApplication[] | null;
};

export default function ColumnsProvider({ children, initialColumns }: Props) {
  const [columns, setColumns] = useState<ColumnWithApplication[]>(
    initialColumns ?? []
  );

  // useEffect(() => {
  //   columns.forEach((col) => {
  //     console.log(`Column ${col.name}`);
  //     console.table(col.applications);
  //   });
  // }, [columns]);

  const handleAddJob = (job: Application, newColumnId: string) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== newColumnId) return col;

        return {
          ...col,
          applications: [...col.applications, job],
        };
      })
    );
  };

  // const handleUpdateJob = (jobUpdates: Application) => {
  //   const existing = columns.find((col) =>
  //     col.applications.find((job) => job.id === jobUpdates.id)
  //   );
  //
  //   if (!existing) return;
  // };

  const handleManualMoveJob = (job: Application, targetColumnId: string) => {
    if (job.columnId === targetColumnId) return;

    handleDeleteJob(job.id);
    handleAddJob(job, targetColumnId);
  };

  const handleDeleteJob = (jobId: string) => {
    setColumns((prev) =>
      prev.map((col) => {
        return {
          ...col,
          applications: col.applications.filter((job) => job.id !== jobId),
        };
      })
    );
  };

  const provide = {
    columns,
    setColumns,
    handleAddJob,
    handleManualMoveJob,
    handleDeleteJob,
  };

  return (
    <ColumnsContext.Provider value={provide}>
      {children}
    </ColumnsContext.Provider>
  );
}
