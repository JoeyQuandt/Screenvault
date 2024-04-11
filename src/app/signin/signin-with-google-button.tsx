'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

const SignInWithGoogle = () => {
  return (
    <Button
      onClick={() =>
        signIn('google', {
          callbackUrl: `${window.location.origin}/`,
        })
      }
    >
      Google
    </Button>
  );
};

export default SignInWithGoogle;
