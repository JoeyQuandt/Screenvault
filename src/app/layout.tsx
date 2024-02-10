import type { Metadata } from 'next';
import { Jost } from 'next/font/google';

import './globals.css';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

import { siteConfig } from '@/constants/config';

const jost = Jost({ subsets: ['latin'], variable: '--font-jost' });

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
      <body className={`debug-screens ${jost.className} layout`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
