import { Check } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import SignInWithGoogle from '@/app/signin/signin-with-google-button';
import SignInWithMail from '@/app/signin/signin-with-mail';
import SignInWithPasskey from '@/app/signin/signin-with-passkey-button';

export default function SignInForm({ ...props }) {
  return (
    <div {...props}>
      <section className='bg-theme-mediumBlue  text-theme-white p-6 lg:p-8 rounded-[20px] flex max-md:flex-col max-w-[790px] mx-auto gap-7 mt-[-35px]'>
        <div>
          <h2 className='font-normal mb-10 text-3xl'>Sign in</h2>
          <div className='flex flex-col gap-4'>
            <SignInWithMail />
            <SignInWithGoogle />
            <SignInWithPasskey />
          </div>
          <div className='my-6 text-center flex justify-between items-center gap-3'>
            <span className='block h-[1px] w-1/2 bg-theme-lightBlue'></span>
            <p>Or</p>
            <span className='block h-[1px] w-1/2 bg-theme-lightBlue'></span>
          </div>
          <Link href='/'>
            <Button>Continue without Account</Button>
          </Link>
        </div>
        <Separator
          orientation='vertical'
          className='h-[296px] bg-theme-lightBlue max-md:hidden block'
        />
        <div className='max-md:hidden block'>
          <h2 className='font-normal mb-10 text-3xl'>
            Benefits for creating account
          </h2>
          <ul className='flex flex-col gap-5'>
            <li className='flex gap-3'>
              <Check className='text-theme-red' />
              Personalized Recommendations
            </li>
            <li className='flex gap-3'>
              <Check className='text-theme-red' />
              Your Bookmarklist
            </li>
            <li className='flex gap-3'>
              <Check className='text-theme-red' />
              Contribute to ScreenVault
            </li>
            <li className='flex gap-3'>
              <Check className='text-theme-red' />
              Newest updates
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
