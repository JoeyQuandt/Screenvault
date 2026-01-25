import PeopleClient from '@/app/(defaultLayout)/people/PeopleClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'People',
};

export default function People() {
  return <PeopleClient />;
}
