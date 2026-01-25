import { Metadata } from 'next';
import { getTheMovieDBPersonDetails } from '@/lib/theMovieApi';
import PersonClient from './PersonClient';

type Props = {
  params: Promise<{ slug: number }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getTheMovieDBPersonDetails(slug);

  const title = data.details.name || 'Person Details';
  const description = data.details.biography || 'Details about this person.';

  return {
    title,
    description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <PersonClient slug={slug} />;
}
