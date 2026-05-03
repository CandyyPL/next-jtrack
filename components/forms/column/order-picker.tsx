import { cn } from '@/lib/utils';
import { useColumns } from '@/lib/hooks/useColumns';

type Props = {
  value: number;
  onChange: (value: number) => void;
  isNew: boolean;
};

export default function OrderPicker({ value, onChange, isNew }: Props) {
  const { columns } = useColumns();

  const cols = isNew
    ? [...columns.map((col, idx) => idx), columns.length]
    : columns.map((col, idx) => idx);

  return (
    <div className='flex flex-wrap items-center justify-center gap-2'>
      {cols.map((idx) => (
        <button
          key={idx}
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
