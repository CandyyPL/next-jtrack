import { Award, Calendar, CheckCircle, Mic, XCircle } from 'lucide-react';
import { ColumnConfig } from '@/lib/types';

export const columnConfig: Array<ColumnConfig> = [
  {
    color: 'bg-cyan-500',
    icon: <Calendar />,
  },
  {
    color: 'bg-purple-500',
    icon: <CheckCircle className='size-4' />,
  },
  {
    color: 'bg-green-500',
    icon: <Mic className='size-4' />,
  },
  {
    color: 'bg-yellow-500',
    icon: <Award className='size-4' />,
  },
  {
    color: 'bg-red-500',
    icon: <XCircle className='size-4' />,
  },
];

export const demoColumnConfig: Array<ColumnConfig> = [
  {
    color: 'bg-cyan-500',
    icon: <Calendar />,
  },
  {
    color: 'bg-green-500',
    icon: <Mic className='size-4' />,
  },
  {
    color: 'bg-red-500',
    icon: <XCircle className='size-4' />,
  },
];
