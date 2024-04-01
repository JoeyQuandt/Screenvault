'use client';

import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getUserData } from '@/lib/TheMovieAPI';
import { cn } from '@/lib/utils';

import NextImage from '@/components/NextImage';
import { All, Bookmark, Logo, Movies, Tv } from '@/components/svgs';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function Navbar() {
  const pathname = usePathname();

  const { data } = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData(),
  });

  const NavigationIconClassName =
    ' transition ease-in-out hover:text-theme-white cursor-pointer w-6 h-6';
  const NavigationIcons = [
    {
      Icon: All,
      href: '/',
    },
    {
      Icon: Movies,
      href: '/Movies',
    },
    {
      Icon: Tv,
      href: '/Tv',
    },
    {
      Icon: Bookmark,
      href: '/Bookmark',
    },
  ];

  return (
    <nav className='md:px-6 lg:px-0 md:pt-6 pb-6'>
      <div className='flex lg:flex-col lg:h-full max-h-[960px] relative justify-between items-center bg-theme-mediumBlue py-5 max-sm:px-4 md:px-6 md:rounded-[10px] lg:px-9 lg:py-9 lg:rounded-[20px]'>
        <Link href='/'>
          <Logo className='text-theme-red transition ease-in-out hover:text-theme-white cursor-pointer w-6 h-6 md:w-8' />
        </Link>
        <ul className='flex lg:flex-col items-center gap-5 md:gap-8 lg:absolute top-[136px]'>
          {NavigationIcons.map(({ Icon, href }, index) => (
            <Link key={index} href={href}>
              <Icon
                className={cn(
                  pathname === href
                    ? 'text-theme-white'
                    : 'text-theme-lightBlue',
                  NavigationIconClassName,
                )}
              />
            </Link>
          ))}
        </ul>
        <Popover>
          <PopoverTrigger>
            <SignedIn>
              {data && (
                <NextImage
                  src={data.user.imageUrl}
                  alt='Profile picture'
                  className='w-8 h-8 relative cursor-pointer'
                  classNamesImages='rounded-[50%] border border-theme-white'
                  fill
                />
              )}
            </SignedIn>
            <SignedOut>
              <CircleUser
                className={cn(NavigationIconClassName, 'text-theme-lightBlue')}
              />
            </SignedOut>
          </PopoverTrigger>
          <PopoverContent className='bg-theme-mediumBlue text-white rounded-[8px] border-none'>
            <SignedOut>
              <section className='flex flex-col gap-4'>
                <Link href='/auth/login'>
                  <Button className='w-full' size='md'>
                    Sign in
                  </Button>
                </Link>
                <div className='flex gap-3'>
                  <p>New here?</p>
                  <Link
                    href='/auth/signup'
                    className='text-theme-red hover:underline'
                  >
                    Create account
                  </Link>
                </div>
              </section>
            </SignedOut>
            <SignedIn>
              <section className='flex flex-col gap-4 max-w-[200px]'>
                <Button size='md'>View Bookmarks</Button>
                <Button size='md'>Account settings</Button>
                <SignOutButton>
                  <Button size='md'>Sign Out</Button>
                </SignOutButton>
              </section>
            </SignedIn>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
