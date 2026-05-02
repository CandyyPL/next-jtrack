import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useStore } from '@/lib/store';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

type Side = 'top' | 'right' | 'bottom' | 'left' | undefined;

type Props = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  side?: Side;
};

export default function HoverCardWrapper({ children, trigger, side }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const { isMobile } = useStore();

  const contentSide = side ?? 'bottom';

  return isMobile ? (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger
        className='cursor-pointer'
        asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        side={contentSide}
        className='flex justify-center'>
        {children}
      </PopoverContent>
    </Popover>
  ) : (
    <HoverCard
      openDelay={10}
      closeDelay={100}>
      <HoverCardTrigger
        className='cursor-default'
        asChild>
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent
        side={contentSide}
        className='flex justify-center'>
        {children}
      </HoverCardContent>
    </HoverCard>
  );
}
