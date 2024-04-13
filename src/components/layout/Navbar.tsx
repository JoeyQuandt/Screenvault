'use client';

import { User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/utils';

import { SignedIn, SignedOut } from '@/components/auth';
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

  const pathname = usePathname();

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
    <nav className='md:px-6 lg:px-0 md:pt-6 pb-6 fixed h-full z-50 max-md:w-full'>
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
              <section className='flex flex-col gap-4 max-w-[200px]'>
                <Button size='md'>View Bookmarks</Button>
                <Button size='md'>View Profile</Button>
                <Button size='md' onClick={() => signOut()}>
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
