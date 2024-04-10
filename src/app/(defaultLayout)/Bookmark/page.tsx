import { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prisma';

import { SignedIn, SignedOut } from '@/components/auth';
import MediaGrid from '@/components/MediaGrid';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const metadata: Metadata = {
  title: {
    absolute: 'About',
  },
};

export default async function Bookmark() {
  const session = await getServerSession(authOptions);

  const userBookMarks = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || '',
    },
    select: {
      bookmarkList: true,
    },
  });

  return (
    <>
      <h2 className='text-white mt-6 mb-6 md:mt-9'>Bookmarks</h2>
      <SignedOut>
        <section>
          <Link href='/auth/login' className='text-theme-red hover:underline'>
            Login
          </Link>
          <p className='text-white'>to add bookmarks!</p>
        </section>
      </SignedOut>
      <SignedIn>
        <MediaGrid data={userBookMarks?.bookmarkList} bookMarkPage />
      </SignedIn>
    </>
  );
}
