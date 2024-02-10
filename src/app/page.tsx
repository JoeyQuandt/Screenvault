import { SearchIcon } from 'lucide-react';
import { Metadata } from 'next';

import PrimaryInput from '@/components/input/PrimaryInput';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: {
    absolute: 'About',
  },
};

export default function Home() {
  return (
    <main className='flex h-screen flex-col items-center justify-center'>
      <section>
        <form noValidate className='mb-10'>
          <PrimaryInput type='email' placeholder='Email' required />
          <PrimaryInput
            type='email'
            placeholder='Email'
            icon={<SearchIcon />}
          />
        </form>
        <Button>Login to your account</Button>
      </section>
    </main>
  );
}
