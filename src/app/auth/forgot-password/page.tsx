'use client';

import { Logo } from '@/components/svgs';
import { authClient } from '@/lib/auth/client';
import {
  ForgotPasswordForm,
  NeonAuthUIProvider,
} from '@neondatabase/auth/react/ui';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <section className='pt-20 px-6 grid place-items-center'>
      <Link href='/'>
        <Logo className='text-theme-red transition ease-in-out hover:text-theme-white cursor-pointer mb-20' />
      </Link>
      <div className='flex flex-col items-center justify-center text-theme-white bg-theme-mediumBlue rounded-2xl p-8 w-full max-w-[400px]'>
        <h1 className='mb-10 text-center'>Forgot Password</h1>
        <div className='w-full'>
          <NeonAuthUIProvider authClient={authClient}>
            <ForgotPasswordForm
              localization={{
                EMAIL_PLACEHOLDER: 'Email address',
              }}
              classNames={{
                input:
                  'text-base flex h-10 w-full text-white border-t-0 mb-8 border-r-0 border-l-0 rounded-none placeholder-theme-white caret-theme-red placeholder-opacity-50 border-b border-b-theme-lightBlue bg-transparent focus:text-white px-4 py-4 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-theme-white disabled:cursor-not-allowed disabled:opacity-50',
                button:
                  'inline-flex items-center cursor-pointer justify-center whitespace-nowrap  rounded-[6px] text-base font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-theme-red text-white hover:bg-theme-white hover:text-[#161D2F] w-full py-4 h-12',
                label: 'text-theme-white',
              }}
            />
          </NeonAuthUIProvider>
        </div>
      </div>
    </section>
  );
}
