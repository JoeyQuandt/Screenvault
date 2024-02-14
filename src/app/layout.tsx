import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';

import './globals.css';

import SearchInput from '@/components/input/SearchInput';
import Navbar from '@/components/layout/Navbar';

import { siteConfig } from '@/constants/config';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: '%s | Hello World',
    default: siteConfig.title,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: 'Designo',
    images: [
      {
        url: '/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`debug-screens ${outfit.className} layout bg-theme-darkBlue flex flex-col lg:flex-row`}
      >
        <Navbar />
        <main className='flex h-screen flex-col  max-sm:px-4 md:px-6 lg:px-0 lg:pt-14 lg:pl-9'>
          <SearchInput placeholder='Search for movies or TV series' />
          <h2 className='text-white mt-6 mb-6 md:mt-9'>Trending</h2>
          {children}
        </main>
      </body>
    </html>
  );
}
