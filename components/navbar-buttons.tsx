'use client';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { signOut, useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NavbarButtons() {
  const { data: session } = useSession();

  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
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
            <DropdownMenuTrigger asChild>
              <Button
                className='relative h-10 w-10 rounded-full'>
                <Avatar className='h-10 w-10'>
                  <AvatarFallback className='bg-primary text-white'>
                    {session?.user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-42'
              align='center'>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col gap-1 space-y-1'>
                  <p className='text-sm leading-none font-medium'>
                    {session?.user.name}
                  </p>
                  <p className='text-muted-foreground text-xs leading-none'>
                    {session?.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleLogout()}
                className='cursor-pointer'>
                Logout
              </DropdownMenuItem>
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
  );
}
