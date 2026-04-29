import { DemoColumnData } from '@/lib/types';

export const DEMO_COLUMNS: Record<string, DemoColumnData> = {
  applied: {
    name: 'Applied',
    listOrder: 0,
  },
  success: {
    name: 'Success',
    listOrder: 1,
  },
  failure: {
    name: 'Failure',
    listOrder: 2,
  },
};
