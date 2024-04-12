'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <section className='grid place-items-center w-full h-screen max-sm:px-4 md:px-6'>
      <div className='max-w-xl flex flex-col gap-5 text-white text-center'>
        <h1>Ooops! We can’t find that page</h1>
        <p className='opacity-75 mb-4'>
          Sorry, but the page you are looking for might have been removed, had
          its name changed, or is temporarily unavailable.
        </p>
        <Button
          onClick={() => router.back()}
          className='max-w-xs max-sm:text-sm mx-auto'
        >
          Return to Previous Page
        </Button>
      </div>
    </section>
  );
}
