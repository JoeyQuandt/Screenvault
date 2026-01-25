import MovieClient from '@/app/(defaultLayout)/movies/MovieClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movies',
};

export default function Home() {
  return <MovieClient />;
}
