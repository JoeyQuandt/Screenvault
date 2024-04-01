import SearchInput from '@/components/input/SearchInput';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toaster';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className='flex h-screen flex-col w-full    max-sm:px-4 md:px-6 lg:px-0 lg:pt-14 lg:pl-9'>
        <SearchInput placeholder='Search for movie&tv shows' maxWidth={false} />
        {children}
      </main>
      <Toaster />
    </>
  );
}
