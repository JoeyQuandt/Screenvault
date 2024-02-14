import Link from 'next/link';

import NextImage from '@/components/NextImage';
import { All, Bookmark, Logo, Movies, Tv } from '@/components/svgs';

export default function Navbar() {
  const NavigationIconClassName =
    'text-theme-lightBlue transition ease-in-out hover:text-theme-white cursor-pointer w-6 h-6';
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
              <Icon className={NavigationIconClassName} />
            </Link>
          ))}
        </ul>
        <NextImage
          src='/images/profile_picture.jpg'
          alt='Profile picture'
          className='w-8 h-8 relative cursor-pointer'
          classNamesImages='rounded-[50%] border border-theme-white'
          layout='fill'
        />
      </div>
    </nav>
  );
}
