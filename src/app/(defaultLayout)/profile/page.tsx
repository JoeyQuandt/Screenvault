import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import { getInitials } from '@/lib/utils';

import PrimaryInput from '@/components/input/PrimaryInput';
import NextImage from '@/components/NextImage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import RegisterNewPasskey from '@/app/signin/register-new-passkey-button';

export default async function Profile() {
  const session = await getServerSession(authOptions);

  return (
    <section>
      <NextImage
        src='/images/background.jpg'
        alt='Media thumbnail'
        className='overflow-hidden object-center cursor-pointer w-full h-[587px] lg:h-[347px] relative lg:rounded-[8px]'
        classNamesImages='object-cover object-top'
        fill
        gradient={true}
      />
      <section className='mx-auto max-w-[450px] mt-[-35px] z-30 relative'>
        <div className='flex justify-between items-center text-theme-white'>
          <h1 className='text-6xl'>Edit profile</h1>
          <Avatar>
            {session?.user?.image && <AvatarImage src={session.user.image} />}
            <AvatarFallback className='text-black'>
              {getInitials(session?.user?.name || 'John Doe')}
            </AvatarFallback>
          </Avatar>
        </div>
        <Tabs defaultValue='Account'>
          <TabsList className='bg-theme-mediumBlue text-base mt-5 mb-8'>
            <TabsTrigger value='Account' className='text-base'>
              Account
            </TabsTrigger>
            <TabsTrigger value='Security' className='text-base'>
              Security
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value='Account'
            className='bg-theme-mediumBlue text-theme-white py-8 px-6 rounded-[8px] flex flex-col gap-8'
          >
            Make changes to your account here.
            <PrimaryInput
              type='string'
              placeholder='JoeyQ'
              value=''
              label='Username'
            />
            <PrimaryInput
              type='textarea'
              placeholder='Bio'
              value=''
              label='Bio'
            />
            <Button size='md'>Save changes</Button>
          </TabsContent>
          <TabsContent
            className='bg-theme-mediumBlue text-theme-white py-8 px-6 rounded-[8px] flex flex-col gap-8'
            value='Security'
          >
            <PrimaryInput
              type='email'
              placeholder='joey.quandt@outlook.com'
              value=''
              label='Email'
            />
            <PrimaryInput
              type='password'
              placeholder='password'
              value=''
              label='Change password'
            />
            <RegisterNewPasskey />
            <Button size='md'>Save changes</Button>
          </TabsContent>
        </Tabs>
      </section>
    </section>
  );
}
