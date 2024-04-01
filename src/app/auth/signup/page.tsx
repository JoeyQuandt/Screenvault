'use client';

import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

import { Logo } from '@/components/svgs';

export default function Auth() {
  return (
    <section className='grid place-items-center h-full w-full pt-12 px-6 lg:pt-20 text-white'>
      <Link href='/'>
        <Logo className='text-theme-red min-w-8 min-h-6 mb-20 hover:text-white' />
      </Link>
      <SignUp
        appearance={{
          elements: {
            card: 'bg-theme-mediumBlue p-6 lg:p-8 rounded-[20px] mx-auto lg:min-w-[450px] lg:min-h-[418px]',
            headerTitle: 'font-normal text-white text-3xl text-center',
            headerSubtitle: 'text-white hidden',
            formHeaderTitle: 'text-white',
            formHeaderSubtitle: 'text-white',
            identityPreview: 'pl-0 text-white',
            identityPreviewText: 'text-white',
            otpCodeFieldInput: 'border-theme-lightBlue text-white',
            formResendCodeLink: 'text-theme-red',
            identityPreviewEditButtonIcon: 'text-theme-red',
            socialButtonsBlockButtonArrow: 'hidden',
            socialButtonsBlockButton:
              'bg-theme-red text-white px-16 py-4 lg:px-24 hover:bg-theme-white hover:text-[#161D2F] inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-[6px] text-base font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            dividerLine: 'bg-white opacity-50',
            dividerText: 'text-white',
            formFieldLabel__emailAddress: 'text-white opacity-50',
            formFieldLabel__password: 'text-white opacity-50',
            formButtonPrimary:
              'bg-theme-red  normal-case text-white px-16 py-4 lg:px-24 hover:bg-theme-white hover:text-[#161D2F] inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-[6px] text-base font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            formFieldInput:
              'text-base pl-0  rounded-none text-white !outline-none flex h-10 w-full text-white  bg-transparent placeholder-theme-white caret-theme-red placeholder-opacity-50 border-b border-b-theme-lightBlue bg-transparent focus:text-white px-4 py-4 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-theme-white disabled:cursor-not-allowed disabled:opacity-50',
            formFieldInfoText: 'text-white',
            footer: 'flex justify-center',
            formFieldSuccessText: 'text-white',
            formFieldInputShowPasswordIcon: 'text-white',
            footerActionText: 'text-base text-white',
            footerActionLink: 'text-base text-theme-red hover:text-theme-red',
          },
        }}
      />
    </section>
  );
}
