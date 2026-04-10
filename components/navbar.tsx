import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import NavbarLogout from '@/components/navbar-logout';

export default async function Navbar() {
  const session = await getSession();

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
          {session?.user ? (
            <>
              <Link href='/dashboard'>
                <Button
                  variant='ghost'
                  className='text-gray-700 hover:text-black'>
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div>
                    <Avatar>
                      <AvatarFallback className='bg-primary font-medium text-white'>
                        {session?.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className='w-fit'
                  align='center'>
                  <DropdownMenuLabel>
                    <div>
                      <p>{session?.user.name}</p>
                      <p>{session?.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <NavbarLogout />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
