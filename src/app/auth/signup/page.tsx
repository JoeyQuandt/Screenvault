'use client';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

import PrimaryInput from '@/components/input/PrimaryInput';
import { Logo } from '@/components/svgs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function Auth() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (res.ok) {
        //redirect
        signIn();
      } else {
        toast({
          title: `Error trying to signup`,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: `Error trying to signup`,
      });
    }
  };

  return (
    <section className='grid place-items-center h-full w-full pt-12 px-6 lg:pt-20 text-white'>
      <Link href='/'>
        <Logo className='text-theme-red min-w-8 min-h-6 mb-20 hover:text-white' />
      </Link>
      <section className='bg-theme-mediumBlue p-6 lg:p-8 rounded-[20px]'>
        <form onSubmit={onSubmit}>
          <h2 className='font-normal mb-10 text-3xl'>Sign Up</h2>
          <PrimaryInput
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email address'
            required
            marginBottom
          />
          <PrimaryInput
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Create Password'
            required
            marginBottom
          />
          <Button className='mt-6 mb-3 w-full'>Create an account</Button>
        </form>
        <Button className='mt-4 mb-6 flex gap-2 items-center'>
          <FaGoogle />
          Sign up with Google
        </Button>
        <p className='text-center'>
          Already have an account?
          <Link
            className='text-theme-red ml-2 cursor-pointer'
            href='/auth/login'
          >
            Login
          </Link>
        </p>
      </section>
    </section>
  );
}
