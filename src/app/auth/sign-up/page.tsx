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
    <section className='pt-20 grid place-items-center'>
      <Link href='/'>
        <Logo className='text-theme-red transition ease-in-out hover:text-theme-white cursor-pointer w-6 h-6 md:w-8 mb-20' />
      </Link>
      <form
        action={formAction}
        className='flex flex-col gap-5 items-center justify-center text-theme-white bg-theme-mediumBlue rounded-2xl p-8'
      >
        <div className='w-sm'>
          <h1>Create new account</h1>
        </div>

        <div className='flex flex-col gap-1.5 w-sm'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-100'
          >
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            required
            placeholder='John Doe'
            className='block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-gray-500 text-white outline-1 outline-white/10 focus:outline-indigo-500'
          />
        </div>

        <div className='flex flex-col gap-1.5 w-sm'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-100'
          >
            Email address
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            placeholder='john@my-company.com'
            className='block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-gray-500 text-white outline-1 outline-white/10  focus:outline-indigo-500'
          />
        </div>

        <div className='flex flex-col gap-1.5 w-sm'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-100'
          >
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            required
            placeholder='*****'
            className='block rounded-md w-full bg-white/5 px-2 py-1.5 placeholder:text-gray-500 text-white outline-1 outline-white/10  focus:outline-indigo-500'
          />
        </div>
        <PrimaryInput
          id='password'
          name='password'
          type='password'
          required
          placeholder='*****'
        />
        {state?.error && (
          <div className='rounded-md px-3 py-2 text-sm text-red-500'>
            {state.error}
          </div>
        )}

        <Button type='submit' disabled={isPending}>
          {isPending ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </section>
  );
}
