import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Trending',
};

export default function Home() {
  return <HomeClient />;
}
