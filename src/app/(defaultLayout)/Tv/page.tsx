import TvClient from '@/app/(defaultLayout)/Tv/TvClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tv shows',
};

export default function Home() {
  return <TvClient />;
}
