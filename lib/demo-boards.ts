import { Application, FullBoardData } from '@/lib/types';

export const DEMO_BOARD = {
  columns: [
    {
      id: 'applied',
      name: 'Applied',
      color: '1',
      icon: '1',
      listOrder: 0,
      applications: [] as Application[],
    },
    {
      id: 'success',
      name: 'Success',
      color: '2',
      icon: '3',
      listOrder: 1,
      applications: [] as Application[],
    },
    {
      id: 'failure',
      name: 'Failure',
      color: '0',
      icon: '4',
      listOrder: 2,
      applications: [] as Application[],
    },
  ],
} as FullBoardData;
