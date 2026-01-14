'use client';

import { signUpWithEmail } from '@/app/auth/sign-up/actions';
import { useActionState, useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/svgs';
import { Button } from '@/components/ui/button';
import PrimaryInput from '@/components/input/PrimaryInput';
import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!state?.email) return;

    setIsVerifying(true);
    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email: state.email,
        otp,
      });
      if (error) {
        throw error;
      }
      router.push('/');
    } catch (error: any) {
      alert(error.message || 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  }

  if (state?.needsOtp) {
    return (
      <section className='pt-20 px-6 grid place-items-center'>
        <Link href='/'>
          <Logo className='text-theme-red transition ease-in-out hover:text-theme-white cursor-pointer mb-20' />
        </Link>
        <form
          onSubmit={handleVerify}
          className='flex flex-col gap-10 items-center justify-center text-theme-white bg-theme-mediumBlue rounded-2xl p-8 w-full max-w-[400px]'
        >
          <h1>Verify your email</h1>
          <p className='text-sm text-gray-400 text-center'>
            We sent a code to {state.email}
          </p>
          <div className='w-full flex flex-col gap-6'>
            <div className='flex flex-col gap-2 relative w-full'>
              <PrimaryInput
                id='otp'
                name='otp'
                type='text'
                required
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>
          <Button type='submit' disabled={isVerifying}>
            {isVerifying ? 'Verifying...' : 'Verify'}
          </Button>
        </form>
      </section>
    );
  }

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
