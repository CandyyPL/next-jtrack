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

type Props = {
  children: React.ReactNode;
  trigger: React.ReactNode;
};

export default function HoverCardWrapper({ children, trigger }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const { isMobile } = useStore();

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
        side='bottom'
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
        side='bottom'
        className='flex justify-center'>
        {children}
      </HoverCardContent>
    </HoverCard>
  );
}
