import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Color } from '@/lib/types';

type Props = {
  colors: Color[];
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export default function ColorPicker({ colors, value, onChange }: Props) {
  const selectedColor = colors.find((c) => c.id === value);

  return (
    <div className='flex flex-col flex-wrap items-center justify-center gap-2 space-y-2'>
      <div className='flex w-1/2 items-center justify-between gap-6'>
        <div className='flex items-center gap-2'>
          <div
            className={cn(
              'h-6 w-6 rounded-full',
              selectedColor ? selectedColor.tw : 'bg-neutral-500'
            )}></div>
          <p>{selectedColor ? selectedColor.name : 'No color selected'}</p>
        </div>
        <p className='font-mono text-zinc-600'>
          {selectedColor ? selectedColor.hex : null}
        </p>
      </div>
      <div className='flex gap-1'>
        {colors.map((color) => (
          <button
            key={color.id}
            type='button'
            role='radio'
            onClick={() => onChange(color.id)}
            style={{ backgroundColor: color.hex }}
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md'>
            {color.id === value && <Check className='size-6 text-white' />}
          </button>
        ))}
      </div>
    </div>
  );
}
