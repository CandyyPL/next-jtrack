'use client';

import { Button } from '@/components/shadcn/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TryButton() {
  return (
    <Link href='/demo'>
      <Button
        variant='outline'
        size='lg'
        className='h-12 px-8 text-lg font-medium'>
        Try it first
      </Button>
    </Link>
  );
}
