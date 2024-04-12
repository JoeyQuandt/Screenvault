import { LoadingSpinner } from '@/components/ui/loadingSpinner';

export default function Loading() {
  return (
    <section className='h-screen flex flex-col justify-center items-center w-full'>
      <LoadingSpinner className='text-theme-red w-8 h-auto md:w-11 md:h-auto' />
    </section>
  );
}
