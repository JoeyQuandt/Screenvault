import MoviesClient from '@/app/(defaultLayout)/movies/MoviesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movies',
};

export default function Home() {
  return <MoviesClient />;
}
