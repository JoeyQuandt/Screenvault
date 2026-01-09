'use client';
import { MovieTvDataType } from 'database.ds';
import Link from 'next/link';

import { seoTitle } from '@/lib/utils';
import useCheckMobileScreen from '@/hooks/useCheckMobileScreen';

import MovieTvCard from '@/components/MediaCard/MovieTvCard';
import PersonCard from '@/components/MediaCard/PersonCard';

type MediaCardProps = {
  media: MovieTvDataType;
  carousel?: boolean;
  type?: string;
  showTrailer?: boolean;
};

export default function MediaCard({
  media,
  carousel,
  type,
  showTrailer = true,
}: MediaCardProps) {
  const isMobile = useCheckMobileScreen();

  // Determine if we should show the full trailer hover effect
  // Condition: showTrailer is true, not on mobile, and not a person
  const enableHoverEffect = showTrailer && !isMobile && type !== 'person';

  const cardContent =
    type === 'person' ? (
      <PersonCard media={media} carousel={carousel} />
    ) : (
      <MovieTvCard
        media={media}
        carousel={carousel}
        type={type}
        enableHoverEffect={enableHoverEffect}
      />
    );

  return (
    <Link
      className='z-40'
      href={`/details/${media?.media_type ? media.media_type : type}/${media?.id}-${seoTitle(media.name ?? media.title ?? '')}`}
    >
      {cardContent}
    </Link>
  );
}
