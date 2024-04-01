'use client';

import Link from 'next/link';
import React from 'react';

import PrimaryInput from '@/components/input/PrimaryInput';
import { Logo } from '@/components/svgs';
import { Button } from '@/components/ui/button';

export default function Auth() {
  return (
    <section className='grid place-items-center h-full w-full pt-12 px-6 lg:pt-20 text-white'>
      <Link href='/'>
        <Logo className='text-theme-red min-w-8 min-h-6 mb-20 hover:text-white' />
      </Link>
      <form className='bg-theme-mediumBlue p-6 lg:p-8 rounded-[20px]'>
        <h2 className='font-normal mb-10 text-3xl'>Sign Up</h2>
        <PrimaryInput
          type='email'
          placeholder='Email address'
          required
          marginBottom
        />
        <PrimaryInput
          type='password'
          placeholder='Create Password'
          required
          marginBottom
        />
        {/* <PrimaryInput type='password' placeholder='Repeat Password' /> */}
        <Button className='mt-6 mb-3 w-full'>Create an account</Button>
        {/* <Button className='mt-4 mb-6 flex gap-2 items-center'>
          <FaGoogle />
          Sign up with Google
        </Button> */}
        <p className='text-center'>
          Already have an account?
          <Link
            className='text-theme-red ml-2 cursor-pointer'
            href='/auth/login'
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
