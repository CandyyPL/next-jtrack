'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/auth-client';

export default function NavbarLogout() {
  return (
    <DropdownMenuItem onClick={async () => await signOut()}>
      Logout
    </DropdownMenuItem>
  );
}
