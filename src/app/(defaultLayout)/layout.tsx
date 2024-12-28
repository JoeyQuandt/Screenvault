'use client';
import { usePathname } from 'next/navigation';

import SearchInput from '@/components/input/SearchInput';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toaster';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className='2xl:w-[1440px] w-full mx-auto layout flex flex-col lg:flex-row'>
      <Navbar />
      <main
        className={`flex flex-col w-full   ${!pathname.includes('/details/') && !pathname.includes('/profile') && 'max-sm:px-4 md:px-6 lg:px-0 lg:pt-14 lg:pl-9 lg:ml-24'}`}
      >
        {!(
          pathname === '/bookmark' ||
          pathname === '/profile' ||
          /^\/details\/tv\/[^/]+$/.test(pathname) ||
          /^\/details\/movie\/[^/]+$/.test(pathname) ||
          /^\/details\/person\/[^/]+$/.test(pathname)
        ) && (
          <SearchInput
            placeholder='Search for movie & tv shows & actors'
            maxWidth={false}
          />
        )}
        {children}
      </main>
      <Toaster />
    </div>
  );
}
