'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export const LogoutButton = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: `${window.location.origin}/`,
        })
      }
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
