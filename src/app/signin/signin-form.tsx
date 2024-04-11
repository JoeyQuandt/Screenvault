'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SignInForm = () => {
  const [email, setEmail] = useState<null | string>(null);

  async function signInWithEmail() {
    const signInResult = await signIn('email', {
      email,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    });

    if (!signInResult?.ok) {
      return toast.error("Well it din't work, please try again");
    }

    return toast.success('Check your email for the magic link');
  }

  return (
    <form action={signInWithEmail}>
      <div className='flex flex-col w-full gap-y-2'>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          name='email'
          type='email'
          placeholder='name@example.com'
        />
      </div>
      <Button type='submit' className='mt-6 w-full'>
        Sign in with Email
      </Button>
    </form>
  );
};

export default SignInForm;
