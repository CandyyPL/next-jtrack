import { Briefcase } from 'lucide-react';
import Link from 'next/link';
import NavbarButtons from '@/components/navbar/navbar-buttons';

export default async function Navbar() {
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
        <NavbarButtons />
      </div>
    </nav>
  );
}
