import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';

import SignInForm from '@/components/auth/SignInForm';
import { Logo } from '@/components/svgs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/home');
  }
  return (
    <section className='w-screen h-screen'>
      <section className='h-[454px] items-center text-theme-white bg-[url("/images/background.jpg")] bg-cover lg:rounded-b-[8px]'>
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
        <SignInForm />
      </div>
    </section>
  );
}
