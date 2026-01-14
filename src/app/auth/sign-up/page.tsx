'use client';

import { signUpWithEmail } from '@/app/auth/sign-up/actions';
import { useActionState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/svgs';
import { Button } from '@/components/ui/button';
import PrimaryInput from '@/components/input/PrimaryInput';

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

  return (
    <section
      className='pt-20 px-6
     grid place-items-center'
    >
      <Link href='/'>
        <Logo className='text-theme-red transition ease-in-out hover:text-theme-white cursor-pointer mb-20' />
      </Link>
      <form
        action={formAction}
        className='flex flex-col gap-10  items-center justify-center text-theme-white bg-theme-mediumBlue rounded-2xl p-8 w-full max-w-[400px]'
      >
        <h1>Create new account</h1>
        <div className='w-full flex flex-col gap-6'>
          <PrimaryInput
            id='name'
            name='name'
            type='text'
            required
            placeholder='Name'
          />
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
        </div>

        <Button type='submit' disabled={isPending}>
          {isPending ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </section>
  );
}
