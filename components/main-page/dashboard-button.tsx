'use client';

import { Button } from '@/components/shadcn/button';
import Link from 'next/link';

export default function DashboardButton() {
  return (
    <Link href='/dashboard'>
      <Button
        size='lg'
        className='h-12 px-8 text-lg font-medium'>
        Go to Dashboard
      </Button>
    </Link>
  );
}
