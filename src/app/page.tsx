import { Check } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';

import { Logo } from '@/components/svgs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import SignInForm from '@/app/signin/signin-form';
import SignInWithDiscord from '@/app/signin/signin-with-discord';
import SignInWithGoogle from '@/app/signin/signin-with-google-button';
import SignInWithPasskey from '@/app/signin/signin-with-passkey-button';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/home');
  }
  return (
    <section className='w-screen h-screen'>
      <section className='h-[454px] items-center text-theme-white bg-[url("/images/background.jpg")] bg-cover'>
        <div className='max-sm:px-4 md:px-6 lg:px-0  text-center flex flex-col gap-5 justify-center items-center pt-5 lg:pt-10'>
          <Logo className='text-theme-red text-3xl' />
          <h1 className='lg:text-3xl text-2xl'>
            Unlock the World of Entertainment with ScreenVault
          </h1>
          <p className='lg:text-2xl text-xl opacity-70 max-w-[500px] mb-4'>
            Discover, Explore and Experience Your Favorite Movies and TV Shows
            Like Never Before
          </p>
          <div className='flex flex-col items-center max-w-96 overflow-hidden'>
            <Link href='/home'>
              <Button className='mb-10'>Continue Without Account</Button>
            </Link>
            <div className='flex items-center gap-5 justify-center w-full'>
              <Separator className='bg-theme-lightBlue h-[1.5px]' />
              <p>Or</p>
              <Separator className='bg-theme-lightBlue h-[1.5px]' />
            </div>
          </div>
        </div>
      </section>
      <div className='max-sm:px-4 md:px-6 lg:px-0 '>
        <section className='bg-theme-mediumBlue  text-theme-white p-6 lg:p-8 rounded-[20px] flex max-md:flex-col max-w-[790px] mx-auto gap-7 mt-[-35px]'>
          <div>
            <h2 className='font-normal mb-10 text-3xl'>Sign in</h2>
            <SignInForm />
            <div className='my-6 text-center flex justify-between items-center gap-3'>
              <span className='block h-[1px] w-1/2 bg-theme-lightBlue'></span>
              <p>Or</p>
              <span className='block h-[1px] w-1/2 bg-theme-lightBlue'></span>
            </div>
            <div className='flex flex-col gap-5'>
              <SignInWithGoogle />
              <SignInWithPasskey />
              <SignInWithDiscord />
            </div>
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
    </section>
  );
}
