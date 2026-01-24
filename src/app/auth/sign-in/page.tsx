'use client';

import { signInWithEmail } from '@/app/auth/sign-in/action';
import PrimaryInput from '@/components/input/PrimaryInput';
import { Logo } from '@/components/svgs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth/client';
import { GoogleIcon } from '@neondatabase/auth/react/ui';
import Link from 'next/link';
import { useActionState, useState } from 'react';

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);
  const [errorGoogle, setErrorGoogle] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (error) {
      setErrorGoogle(true);
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <section
      className='pt-20 px-6
     grid place-items-center'
    >
      <Link href='/'>
        <Logo className='text-theme-red transition ease-in-out hover:text-theme-white cursor-pointer mb-20' />
      </Link>
      <div className='flex flex-col items-center justify-center text-theme-white bg-theme-mediumBlue rounded-2xl p-8 w-full max-w-[400px]'>
        <form action={formAction} className='w-full'>
          <h1 className='mb-10 text-center'>Login</h1>

          <div className='w-full flex flex-col gap-6 mb-10'>
            <PrimaryInput
              id='email'
              name='email'
              type='email'
              required
              placeholder='Email address'
            />
            <PrimaryInput
              id='password'
              name='password'
              type='password'
              required
              placeholder='Password'
            />
            {state?.error && (
              <div className='rounded-md px-3 py-2 text-sm text-red-500'>
                {state.error}
              </div>
            )}
            <Link
              href='/auth/forgot-password'
              className='text-sm text-theme-white hover:underline text-right hover:text-theme-red'
            >
              Forgot password?
            </Link>
          </div>
          <Button type='submit' disabled={isPending} className='mb-5'>
            Login to your account
          </Button>
        </form>
        <div className='flex items-center w-full gap-4 mb-5'>
          <Separator className='flex-1' />
          <p>Or</p>
          <Separator className='flex-1' />
        </div>
        <div className='mb-10 w-full text-center'>
          <Button className='gap-2' onClick={() => handleGoogleSignIn()}>
            <GoogleIcon className='w-[16px]' />
            Login in with google
          </Button>
          {errorGoogle && (
            <div className='rounded-md px-3 py-2 text-sm text-red-500'>
              Google sign-in error
            </div>
          )}
        </div>
        <div className='flex gap-2'>
          <p>Dont have an account?</p>
          <Link href='/auth/sign-up' className='text-theme-red'>
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
