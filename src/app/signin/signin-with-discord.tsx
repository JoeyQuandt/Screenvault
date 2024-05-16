'use client';

import { signIn } from 'next-auth/react';
import { FaDiscord } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

const SignInWithDiscord = () => {
  return (
    <Button
      onClick={() =>
        signIn('discord', {
          callbackUrl: `${window.location.origin}/home`,
        })
      }
      className='flex gap-5'
    >
      <FaDiscord />
      Sign In With Discord
    </Button>
  );
};

export default SignInWithDiscord;
