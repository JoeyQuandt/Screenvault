import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { Toaster } from 'sonner';

import './globals.css';

import { Provider } from '@/lib/Provider';

import { SessionProviders } from '@/app/providers';
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
        className={`debug-screens mx-auto layout 2xl:max-w-[1440px] ${outfit.className} bg-theme-darkBlue flex flex-col lg:flex-row`}
      >
        <Toaster />
        <SessionProviders>
          <Provider>{children}</Provider>
        </SessionProviders>
      </body>
    </html>
  );
}
