'use client';

import { useContext } from 'react';
import { ColumnsContext } from '@/lib/context/columns-context/ColumnsContext';

export function useColumns() {
  const context = useContext(ColumnsContext);

  if (context) {
    return context;
  }

  throw new Error(
    'useColumns hook must be called within context of ColumnsProvider'
  );
}
