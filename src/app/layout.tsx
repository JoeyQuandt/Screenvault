import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import './globals.css';

import { siteConfig } from '@/lib/config';
import { Provider } from '@/lib/Provider';

import { SessionProviders } from '@/app/providers';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
  authors: [
    {
      name: 'Joey Quandt',
      url: 'https://joeyquandt.com',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={` bg-theme-darkBlue`}>
        <Toaster />
        <SessionProviders>
          <Provider>{children}</Provider>
        </SessionProviders>
      </body>
    </html>
  );
}
