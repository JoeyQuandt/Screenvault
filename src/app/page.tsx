import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'About',
  },
};

export default function Home() {
  return (
    <main className='flex h-screen flex-col items-center justify-center'>
      <section>
        <h1>Content</h1>
      </section>
    </main>
  );
}
