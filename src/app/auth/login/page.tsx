'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

import PrimaryInput from '@/components/input/PrimaryInput';
import { Logo } from '@/components/svgs';
import { Button } from '@/components/ui/button';

export default function Auth() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      console.log('Res', res);
      if (!res?.error) {
        router.push('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className='grid place-items-center h-full w-full pt-12 px-6 lg:pt-20 text-white'>
      <Link href='/'>
        <Logo className='text-theme-red min-w-8 min-h-6 mb-20 hover:text-white' />
      </Link>
      <section className='bg-theme-mediumBlue p-6 lg:p-8 rounded-[20px] flex flex-col'>
        <h2 className='font-normal mb-10 text-3xl'>Login</h2>
        <form onSubmit={onSubmit}>
          <PrimaryInput
            type='email'
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            marginBottom
          />
          <PrimaryInput
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            marginBottom
          />
          <Button className='mt-4 mb-3'>Login to your account</Button>
        </form>
        <Button
          className='mt-4 mb-6 flex gap-2 items-center'
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
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
      </section>
    </section>
  );
}
