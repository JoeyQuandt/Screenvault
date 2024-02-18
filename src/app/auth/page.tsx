'use client';

import React, { useState } from 'react';

import PrimaryInput from '@/components/input/PrimaryInput';
import { Logo } from '@/components/svgs';
import { Button } from '@/components/ui/button';

const AUTH_STATES = {
  LOGIN: 'login',
  SIGNUP: 'signup',
};

export default function Auth() {
  const [authStatus, setAuthStatus] = useState(AUTH_STATES.LOGIN);

  const toggleAuthStatus = () =>
    setAuthStatus(
      authStatus === AUTH_STATES.LOGIN ? AUTH_STATES.SIGNUP : AUTH_STATES.LOGIN,
    );

  const isSignUp = authStatus === AUTH_STATES.SIGNUP;

  return (
    <section className='grid place-items-center h-full w-full pt-12 px-6 lg:pt-20 text-white'>
      <Logo className='text-theme-red min-w-8 min-h-6 mb-20' />
      <section className='bg-theme-mediumBlue p-6 lg:p-8 rounded-[20px]'>
        <h2 className='font-normal mb-10 text-3xl'>
          {isSignUp ? 'Sign Up' : 'Login'}
        </h2>
        <PrimaryInput type='email' placeholder='Email address' />
        <PrimaryInput type='password' placeholder='Password' />
        {isSignUp && (
          <PrimaryInput type='password' placeholder='Repeat Password' />
        )}
        <Button className='mt-4 mb-6'>
          {isSignUp ? 'Create an account' : 'Login to your account'}
        </Button>
        <p className='text-center'>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <a
            className='text-theme-red ml-2 cursor-pointer'
            onClick={toggleAuthStatus}
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </a>
        </p>
      </section>
    </section>
  );
}
