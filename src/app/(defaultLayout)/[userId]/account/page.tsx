import { authServer } from '@/lib/auth/server';
import Transition from '@/lib/transition';
import { Metadata } from 'next';
import NextImage from '@/components/NextImage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFirstNameInitial } from '@/lib/utils';
import PrimaryInput from '@/components/input/PrimaryInput';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Account',
};

export default async function Account() {
  const { data: session } = await authServer.getSession();

  return (
    <Transition>
      <section>
        <NextImage
          src={'/images/background.jpg'}
          alt='Media thumbnail'
          className='overflow-hidden object-center w-full h-[387px] lg:h-[347px] relative lg:rounded-[8px] cursor-auto'
          classNamesImages='object-cover object-center'
          fill
          gradient={true}
        >
          <section className='absolute inset-0 m-auto w-fit h-fit z-10'>
            <div className='flex flex-col gap-10 justify-center items-center'>
              <h1 className='text-theme-white lg:text-5xl'>Edit profile</h1>
              {session && (
                <Avatar className='lg:h-[82px] lg:w-[82px] w-[60px] h-[60px]'>
                  <AvatarImage src={session.user.image || ''} />
                  <AvatarFallback className='bg-theme-white bg-opacity-75 w-full h-full flex justify-center items-center text-xl'>
                    {getFirstNameInitial(session.user.name)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </section>
        </NextImage>
        <div className='bg-theme-mediumBlue rounded-t-2xl md:rounded-2xl px-8 py-14 max-w-[600px] mx-auto  mt-[-80px] lg:mt-[-25px] z-20 relative text-white'>
          <p className='mb-8'>
            Make changes to your account security here. Click save when you`re
            done.
          </p>
          <div className='flex w-full flex-col gap-5 mb-16'>
            <PrimaryInput
              id='email'
              name='email'
              type='email'
              label='Change email adress'
              required
              placeholder='Email address'
            />
            <PrimaryInput
              id='password'
              name='password'
              type='password'
              label='Change password'
              required
              placeholder='******'
            />
            <PrimaryInput
              id='avatar'
              name='avatar'
              type='file'
              label='Change avatar'
              required
            />
            <PrimaryInput
              id='banner'
              name='banner'
              type='file'
              label='Change banner'
              required
            />
          </div>
          <Button className='md:max-w-[175px]'>Save changes</Button>
        </div>
      </section>
    </Transition>
  );
}
