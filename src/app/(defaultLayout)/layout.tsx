import SearchInput from '@/components/input/SearchInput';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toaster';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className='flex h-screen flex-col   max-sm:px-4 md:px-6 lg:px-0 lg:pt-14 lg:pl-9'>
        <SearchInput
          placeholder='Search for movies or TV series'
          maxWidth={false}
        />
        {children}
      </main>
      <Toaster />
    </>
  );
}
