import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='border-b border-gray-200'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link
          href='/'
          className='flex cursor-pointer gap-2'>
          <Briefcase className='size-10' />
          <h1 className='text-3xl font-bold'>
            <span className='text-primary'>J</span>Track
          </h1>
        </Link>
        <div className='flex items-center gap-4'>
          <Link href='/sign-in'>
            <Button
              variant='ghost'
              className='text-gray-700 hover:text-black'>
              Login
            </Button>
          </Link>
          <Link href='/sign-up'>
            <Button className='hover:bg-primary/90'>Start for free</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
