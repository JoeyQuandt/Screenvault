'use client';

import { User } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import { getInitials } from '@/lib/utils';

import { SignedIn, SignedOut } from '@/components/auth';
import { NavItem } from '@/components/layout/NavItem';
import { All, Bookmark, Logo, Movies, Tv } from '@/components/svgs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function Navbar() {
  const { data: session } = useSession();
  const [selected, setSelected] = useState(0);

  const NavigationIcons = [
    {
      Icon: All,
      href: '/home',
    },
    {
      Icon: Movies,
      href: '/movies',
    },
    {
      Icon: Tv,
      href: '/tv',
    },
    {
      Icon: Bookmark,
      href: '/bookmark',
    },
  ];

  return (
    <nav className='md:px-6 lg:px-0 md:pt-6 pb-6 fixed h-full z-50 max-lg:w-full'>
      <div className='flex lg:flex-col lg:h-full max-h-[960px] relative justify-between items-center bg-theme-mediumBlue py-5 max-sm:px-4 md:px-6 md:rounded-[10px] lg:px-9 lg:py-9 lg:rounded-[20px]'>
        <Link href='/'>
          <Logo className='text-theme-red transition ease-in-out hover:text-theme-white cursor-pointer w-6 h-6 md:w-8' />
        </Link>
        <ul className='flex lg:flex-col items-center gap-5 md:gap-8 lg:absolute top-[136px]'>
          {NavigationIcons.map(({ Icon, href }, index) => (
            <Link key={index} href={href}>
              <NavItem
                selected={selected === index}
                id={index}
                setSelected={setSelected}
              >
                <Icon />
              </NavItem>
            </Link>
          ))}
        </ul>

        <Popover>
          <PopoverTrigger>
            <SignedIn>
              <Avatar>
                {session?.user?.image && (
                  <AvatarImage src={session.user.image} />
                )}
                <AvatarFallback>
                  {getInitials(session?.user?.name || 'John Doe')}
                </AvatarFallback>
              </Avatar>
            </SignedIn>
            <SignedOut>
              <Avatar>
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </SignedOut>
          </PopoverTrigger>
          <PopoverContent className='bg-theme-mediumBlue text-white rounded-[8px] border-none'>
            <SignedOut>
              <section className='flex flex-col gap-4'>
                <Link href='/signin'>
                  <Button className='w-full' size='md'>
                    Sign in
                  </Button>
                </Link>
              </section>
            </SignedOut>
            <SignedIn>
              <section className='flex flex-col gap-4 w-full overflow-hidden'>
                <Button href='/bookmark' size='md'>
                  View Bookmarks
                </Button>
                <Button href='/profile' size='md' className='w-full'>
                  View Profile
                </Button>
                <Button size='md' className='w-full' onClick={() => signOut()}>
                  Sign Out
                </Button>
              </section>
            </SignedIn>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
