import { SignedOut } from '@clerk/nextjs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    absolute: 'About',
  },
};

export default function Bookmark() {
  return (
    <>
      <h2 className='text-white mt-6 mb-6 md:mt-9'>Bookmarks</h2>
      <section>
        <SignedOut>
          <Link href='/auth/login' className='text-theme-red hover:underline'>
            Login
          </Link>
          <p className='text-white'>to add bookmarks!</p>
        </SignedOut>
      </section>
    </>
  );
}
