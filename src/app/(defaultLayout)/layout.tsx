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
    <>
      <Navbar />
      <main
        className={`flex flex-col w-full ${!pathname.includes('/details/') && 'max-sm:px-4 md:px-6 lg:px-0 lg:pt-14 lg:pl-9 lg:ml-24'}`}
      >
        {!(
          pathname === '/Bookmark' ||
          /^\/details\/tv\/[^/]+$/.test(pathname) ||
          /^\/details\/movie\/[^/]+$/.test(pathname)
        ) && (
          <SearchInput
            placeholder='Search for movie & tv shows'
            maxWidth={false}
          />
        )}
        {children}
      </main>
      <Toaster />
    </>
  );
}
