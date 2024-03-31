import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';

import './globals.css';

import { Provider } from '@/lib/Provider';

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
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`debug-screens ${outfit.className} layout bg-theme-darkBlue flex flex-col lg:flex-row`}
        >
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
