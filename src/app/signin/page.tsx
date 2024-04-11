import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';

import { authOptions } from '@/lib/authOptions';

import { Logo } from '@/components/svgs';

import SignInForm from '@/app/signin/signin-form';
import SignInWithGoogle from '@/app/signin/signin-with-google-button';
import SignInWithPasskey from '@/app/signin/signin-with-passkey-button';

export default async function Auth() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/');
  }
  return (
    <section className='grid place-items-center h-full w-full pt-12 px-6 lg:pt-20 text-white'>
      <Link href='/'>
        <Logo className='text-theme-red min-w-8 min-h-6 mb-20 hover:text-white' />
      </Link>
      <section className='bg-theme-mediumBlue p-6 lg:p-8 rounded-[20px] flex flex-col'>
        <h2 className='font-normal mb-10 text-3xl'>Signin</h2>
        <SignInForm />
        <p>Or continue with</p>
        <SignInWithGoogle />
        <SignInWithPasskey />
      </section>
    </section>
  );
}
