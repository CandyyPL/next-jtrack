import { cn } from '@/lib/utils';
import { useColumns } from '@/lib/hooks/useColumns';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function OrderPicker({ value, onChange }: Props) {
  const { columns } = useColumns();

  return (
    <div className='flex flex-wrap items-center justify-center gap-2'>
      {columns.map((col, idx) => (
        <button
          key={col.id}
          type='button'
          role='radio'
          onClick={() => onChange(idx)}
          className={cn(
            'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-zinc-100 hover:bg-zinc-200',
            idx === value ? 'bg-primary hover:bg-primary/80 text-white' : null
          )}>
          {idx + 1}
        </button>
      ))}
    </div>
  );
}
