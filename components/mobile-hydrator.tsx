'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';

type Props = {
  isMobile: boolean;
};

export default function MobileHydrator({ isMobile }: Props) {
  const { setIsMobile } = useStore();

  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile]);

  return null;
}
