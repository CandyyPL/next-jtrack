'use client';

import { useState } from 'react';
import { ColumnWithDemoApplication, DemoBoard } from '@/lib/types';
import { initDemoBoards } from '@/lib/init-demo-boards';

const LS_KEY = 'board';

export default function useLocalStorage() {
  const [boardData, setBoardData] = useState<DemoBoard>(() => {
    if (typeof window === 'undefined') {
      const columns = initDemoBoards();
      return { columns };
    }

    const storageData = localStorage.getItem(LS_KEY);
    if (storageData) {
      try {
        const parsed: ColumnWithDemoApplication[] = JSON.parse(storageData);

        const columns = initDemoBoards();

        const columnsWithApplications = columns.map((column) => {
          const applications = parsed.find(
            (col) => col.id === column.id
          )?.applications;
          if (!applications) return column;

          return { ...column, applications };
        });

        return { columns: columnsWithApplications };
      } catch (error) {
        console.log(error);
      }
    }

    const columns = initDemoBoards();

    localStorage.setItem(LS_KEY, JSON.stringify(columns));
    return { columns };
  });

  const getData = () => boardData;

  const setData = (data: DemoBoard) => setBoardData(data);

  return { getData, setData };
}
