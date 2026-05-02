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
    <div className='flex flex-col flex-wrap items-center justify-center gap-2 space-y-2'>
      <p className='font-mono text-xl font-medium'>
        {selectedIcon ? selectedIcon.name : 'No icon selected'}
      </p>
      <div className='flex'>
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
            {icon.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
