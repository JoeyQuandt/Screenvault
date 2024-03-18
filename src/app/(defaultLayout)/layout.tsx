import SearchInput from '@/components/input/SearchInput';
import Navbar from '@/components/layout/Navbar';

export default function DashboardLayout({
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className='flex h-screen flex-col  max-sm:px-4 md:px-6 lg:px-0 lg:pt-14 lg:pl-9'>
        <SearchInput
          placeholder='Search for movies or TV series'
          maxWidth={false}
        />
        {children}
      </main>
    </>
  );
}
