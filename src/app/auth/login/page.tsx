'use client';

import Link from 'next/link';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

import PrimaryInput from '@/components/input/PrimaryInput';
import { Logo } from '@/components/svgs';
import { Button } from '@/components/ui/button';

export default function Auth() {
  return (
    <section className='grid place-items-center h-full w-full pt-12 px-6 lg:pt-20 text-white'>
      <Link href='/'>
        <Logo className='text-theme-red min-w-8 min-h-6 mb-20 hover:text-white' />
      </Link>
      <form className='bg-theme-mediumBlue p-6 lg:p-8 rounded-[20px] flex flex-col'>
        <h2 className='font-normal mb-10 text-3xl'>Login</h2>
        <PrimaryInput
          type='email'
          placeholder='Email address'
          required
          marginBottom
        />
        <PrimaryInput
          type='password'
          placeholder='Password'
          required
          marginBottom
        />
        <Button className='mt-4 mb-3'>Login to your account</Button>
        <Button className='mt-4 mb-6 flex gap-2 items-center'>
          <FaGoogle />
          Login with Google
        </Button>
        <p className='text-center'>
          Don't have an account?
          <Link
            href='/auth/signup'
            className='text-theme-red ml-2 cursor-pointer'
          >
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
}
