'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StartButton() {
  return (
    <Link href='/sign-up'>
      <Button
        size='lg'
        className='h-12 px-8 text-lg font-medium'>
        Start for free <ArrowRight className='ml-2' />
      </Button>
    </Link>
  );
}
