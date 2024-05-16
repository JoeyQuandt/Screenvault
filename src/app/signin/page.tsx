import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';

import { authOptions } from '@/lib/authOptions';

import { Logo } from '@/components/svgs';

import SignInWithDiscord from '@/app/signin/signin-with-discord';
import SignInWithGoogle from '@/app/signin/signin-with-google-button';
import SignInWithMail from '@/app/signin/signin-with-mail';
import SignInWithPasskey from '@/app/signin/signin-with-passkey-button';

export default async function Auth() {
  // @ts-expect-error this is not generated in the API that is why this commented
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/home');
  }
  return (
    <section className='grid place-items-center h-full w-full pt-12 px-6 lg:pt-20 text-white'>
      <Link href='/home'>
        <Logo className='text-theme-red min-w-8 min-h-6 mb-20 hover:text-white' />
      </Link>
      <section className='bg-theme-mediumBlue p-6 lg:p-8 rounded-[20px] flex flex-col'>
        <h2 className='font-normal mb-10 text-3xl'>Sign in</h2>
        <SignInWithMail />
        <div className='my-6 text-center flex justify-between items-center gap-3'>
          <span className='block h-[1px] w-1/2 bg-theme-lightBlue'></span>
          <p>Or</p>
          <span className='block h-[1px] w-1/2 bg-theme-lightBlue'></span>
        </div>
        <div className='flex flex-col gap-5'>
          <SignInWithGoogle />
          <SignInWithDiscord />
          <SignInWithPasskey />
        </div>
      </section>
    </section>
  );
}
