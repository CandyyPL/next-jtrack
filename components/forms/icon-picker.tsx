import { DynamicIcon } from 'lucide-react/dynamic';
import { cn } from '@/lib/utils';
import { Icon } from '@/lib/types';

type Props = {
  icons: Icon[];
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export default function IconPicker({ icons, value, onChange }: Props) {
  const selectedIcon = icons.find((icon) => icon.id === value);

  return (
    <div className='flex flex-wrap items-center justify-center gap-2 space-y-2'>
      {icons.map((icon) => (
        <button
          key={icon.id}
          type='button'
          role='radio'
          onClick={() => onChange(icon.id)}
          className={cn(
            'flex h-10 w-10 cursor-pointer items-center justify-center rounded-md hover:bg-zinc-100',
            icon.id === value ? 'border-2 border-zinc-300' : null
          )}>
          <DynamicIcon name={icon.value} />
        </button>
      ))}
      <div className='flex h-10 w-full items-center justify-between rounded-md bg-zinc-300 px-4'>
        <div className='flex items-center gap-2'>
          <p>{selectedIcon ? selectedIcon.name : 'No icon selected'}</p>
        </div>
        <p className='font-mono text-zinc-600'>
          {selectedIcon ? selectedIcon.value : null}
        </p>
      </div>
    </div>
  );
}
