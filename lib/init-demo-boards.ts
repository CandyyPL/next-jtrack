import { DEMO_COLUMNS } from '@/lib/demo-boards';
import { ColumnWithDemoApplication } from '@/lib/types';

export function initDemoBoards() {
  const columns = [];

  for (const column of Object.keys(DEMO_COLUMNS)) {
    const newColumn: ColumnWithDemoApplication = {
      id: column,
      name: DEMO_COLUMNS[column].name,
      listOrder: DEMO_COLUMNS[column].listOrder,
      applications: [],
    };

    columns.push(newColumn);
  }

  return columns;
}
