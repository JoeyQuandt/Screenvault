import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'About',
  },
};

export default function Bookmark() {
  return (
    <>
      <h2 className='text-white mt-6 mb-6 md:mt-9'>Bookmarks</h2>
    </>
  );
}
