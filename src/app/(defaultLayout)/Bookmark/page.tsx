import { Metadata } from 'next';

import SearchInput from '@/components/input/SearchInput';

export const metadata: Metadata = {
  title: {
    absolute: 'About',
  },
};

export default function Bookmark() {
  return (
    <>
      <SearchInput placeholder='Search for bookmarks' maxWidth={false} />
      <h2 className='text-white mt-6 mb-6 md:mt-9'>Bookmarks</h2>
    </>
  );
}
