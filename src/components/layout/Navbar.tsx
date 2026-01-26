'use client';

import { AvatarFallback } from '@radix-ui/react-avatar';
import Link from 'next/link';

import { NavItem } from '@/components/layout/NavItem';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Bookmark,
  CircleUserRound,
  Clapperboard,
  Film,
  Grid2X2,
  Tv,
  User,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { authClient } from '@/lib/auth/client';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/svgs';
import { getFirstNameInitial } from '@/lib/utils';

export default function Navbar() {
  const { data } = authClient.useSession();

  return (
    <header className='z-20 relative'>
      <nav className='md:px-6 lg:px-0 md:pt-6 pb-6 fixed lg:h-full  max-lg:w-full'>
        <div className='flex lg:flex-col lg:h-full max-h-[960px] relative justify-between items-center bg-theme-mediumBlue py-5 max-sm:px-4 md:px-6 md:rounded-[10px] lg:px-9 lg:py-9 lg:rounded-[20px]'>
          <Link href='/'>
            <Logo className='text-theme-red transition ease-in-out hover:text-theme-white cursor-pointer w-6 h-6 md:w-8' />
          </Link>
          <ul className='flex lg:flex-col items-center gap-5 md:gap-8 lg:absolute top-[136px]'>
            <Link href='/'>
              <NavItem navItem='/'>
                <Grid2X2 />
              </NavItem>
            </Link>
            <Link href='/movies'>
              <NavItem navItem='/movies'>
                <Film />
              </NavItem>
            </Link>
            <Link href='/tv'>
              <NavItem navItem='/tv'>
                <Tv />
              </NavItem>
            </Link>
            <Link href='/people'>
              <NavItem navItem='/people'>
                <User />
              </NavItem>
            </Link>
            {data && data.user && (
              <Link
                href={`/${data.user.id}/watchlist`}
                className='max-sm:hidden'
              >
                <NavItem navItem={`/${data.user.id}/watchlist`}>
                  <Bookmark />
                </NavItem>
              </Link>
            )}
          </ul>
          <Popover>
            <PopoverTrigger>
              {data && data.user ? (
                <Avatar>
                  <AvatarImage src={data.user.image || ''} />
                  <AvatarFallback className='bg-theme-white bg-opacity-75 w-full h-full flex justify-center items-center'>
                    {getFirstNameInitial(data.user.name)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <CircleUserRound className='text-theme-lightBlue' size={32} />
              )}
            </PopoverTrigger>
            <PopoverContent className='bg-theme-mediumBlue text-white rounded-[8px] border-none z-50 p-4'>
              {data && data.user ? (
                <div className='flex flex-col gap-4'>
                  <Link
                    className='bg-theme-red text-white hover:bg-theme-white hover:text-[#161D2F] text-center py-4 rounded-[6px]'
                    href={`/${data.user.id}/account`}
                  >
                    Account
                  </Link>
                  <Link
                    className='bg-theme-red max-sm:flex items-center gap-1 justify-center hidden text-white hover:bg-theme-white hover:text-[#161D2F] text-center py-4 rounded-[6px]'
                    href={`/${data.user.id}/watchlist`}
                  >
                    <Bookmark />
                    Watchlist
                  </Link>
                  <Button
                    onClick={() =>
                      authClient.signOut().then(() => {
                        window.location.href = '/';
                      })
                    }
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  <Link
                    href='/auth/sign-up'
                    className='bg-theme-red text-white hover:bg-theme-white hover:text-[#161D2F] text-center  py-4 rounded-[6px]'
                  >
                    Sign-up
                  </Link>
                  <Link
                    className='bg-theme-red text-white hover:bg-theme-white hover:text-[#161D2F] text-center py-4 rounded-[6px]'
                    href='/auth/sign-in'
                  >
                    Sign-in
                  </Link>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </header>
  );
}
