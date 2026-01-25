import { Metadata } from 'next';
import { getTheMovieDBDetails } from '@/lib/theMovieApi';
import MovieClient from './MovieClient';
import { CombinedMovieApiTypes } from 'database.ds';
import { imageUrl } from '@/lib/config';

type Props = {
  params: Promise<{ slug: number }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = (await getTheMovieDBDetails(
    slug,
    'movie',
  )) as CombinedMovieApiTypes;

  const title = `${data.details.title} | Screenarchive` || 'Movie Details';
  const description = data.details.overview || 'Details about this movie.';
  const thumbnail = imageUrl + data.details.backdrop_path || '/images/og.jpg';

  return {
    title,
    description,
    openGraph: {
      title: title,
      description: description,
      images: [thumbnail],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [thumbnail],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <MovieClient slug={slug} />;
}
