import { Application, FullBoardData } from '@/lib/types';

export const DEMO_BOARD = {
  columns: [
    {
      id: 'applied',
      name: 'Applied',
      listOrder: 0,
      applications: [] as Application[],
    },
    {
      id: 'success',
      name: 'Success',
      listOrder: 1,
      applications: [] as Application[],
    },
    {
      id: 'failure',
      name: 'Failure',
      listOrder: 2,
      applications: [] as Application[],
    },
  ],
} as FullBoardData;
