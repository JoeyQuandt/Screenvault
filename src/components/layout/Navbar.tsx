'use client';

import Link from 'next/link';

import { NavItem } from '@/components/layout/NavItem';
import { All, Logo, Movies, Tv, Person } from '@/components/svgs';

export default function Navbar() {
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
      Icon: Person,
      href: '/People',
    },
  ];

  return (
    <header className='z-20 relative'>
      <nav className='md:px-6 lg:px-0 md:pt-6 pb-6 fixed lg:h-full  max-lg:w-full'>
        <div className='flex lg:flex-col lg:h-full max-h-[960px] relative justify-between max-lg:justify-center items-center bg-theme-mediumBlue py-5 max-sm:px-4 md:px-6 md:rounded-[10px] lg:px-9 lg:py-9 lg:rounded-[20px]'>
          <Link href='/'>
            <Logo className='text-theme-red transition ease-in-out hover:text-theme-white cursor-pointer w-6 h-6 md:w-8 max-lg:hidden' />
          </Link>
          <ul className='flex lg:flex-col items-center gap-5 md:gap-8 lg:absolute top-[136px]'>
            {NavigationIcons.map(({ Icon, href }, index) => (
              <Link key={index} href={href}>
                <NavItem navItem={href}>
                  <Icon />
                </NavItem>
              </Link>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
