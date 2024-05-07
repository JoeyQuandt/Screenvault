import { Metadata } from 'next';
import Link from 'next/link';

import Transition from '@/lib/transition';

import { SignedOut } from '@/components/auth';

export const metadata: Metadata = {
  title: {
    absolute: 'About',
  },
};

export default async function Bookmark() {
  // const session = await getServerSession(authOptions);

  return (
    <Transition>
      <h2 className='text-white mt-6 mb-6 md:mt-9'>Bookmarks</h2>
      <SignedOut>
        <section>
          <Link href='/auth/signin' className='text-theme-red hover:underline'>
            Login
          </Link>
          <p className='text-white'>to add bookmarks!</p>
        </section>
      </SignedOut>
    </Transition>
  );
}
