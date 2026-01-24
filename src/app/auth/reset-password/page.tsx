'use client';

import { Logo } from '@/components/svgs';
import { authClient } from '@/lib/auth/client';
import {
  NeonAuthUIProvider,
  ResetPasswordForm,
} from '@neondatabase/auth/react/ui';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <section className='pt-20 px-6 grid place-items-center'>
      <Link href='/'>
        <Logo className='text-theme-red transition ease-in-out hover:text-theme-white cursor-pointer mb-20' />
      </Link>
      <div className='flex flex-col items-center justify-center text-theme-white bg-theme-mediumBlue rounded-2xl p-8 w-full max-w-[400px]'>
        <h1 className='mb-10 text-center'>Reset Password</h1>
        <div className='w-full'>
          <NeonAuthUIProvider authClient={authClient}>
            <ResetPasswordForm
              localization={{ PASSWORD_PLACEHOLDER: 'Password' }}
              classNames={{
                input:
                  'text-base rounded-none border-b mb-8 border-b-theme-lightBlue border-t-0 border-r-0 border-l-0',
                button:
                  'bg-theme-red text-white hover:bg-theme-white hover:text-theme-darkBlue w-full h-12 py-4 text-base',
              }}
            />
          </NeonAuthUIProvider>
        </div>
      </div>
    </section>
  );
}
