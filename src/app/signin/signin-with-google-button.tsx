'use client';

import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

const SignInWithGoogle = () => {
  return (
    <Button
      onClick={() =>
        signIn('google', {
          callbackUrl: `${window.location.origin}/home`,
        })
      }
      className='flex gap-5'
    >
      <FaGoogle />
      Sign In With Google
    </Button>
  );
};

export default SignInWithGoogle;
