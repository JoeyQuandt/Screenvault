import { MovieTvDataType } from 'database.ds';

import { Tv, Film, Dot } from 'lucide-react';

type MediaInfoProps = {
  media: MovieTvDataType;
  type?: string;
};

export default function MediaInfo({ media, type }: MediaInfoProps) {
  const date = new Date(media?.first_air_date || media?.release_date || '');
  const year = isNaN(date.getFullYear()) ? 'No Data' : date.getFullYear();

  const isMovie = media?.media_type === 'movie' || type === 'movie';

  return (
    <div>
      <ul className='flex items-center  mb-2 opacity-75 text-sm'>
        <li>{year}</li>
        <Dot />
        <li className='flex items-center gap-1'>
          {isMovie ? (
            <>
              <Film /> Movie
            </>
          ) : (
            <>
              <Tv />
              Tv
            </>
          )}
        </li>
        <Dot />
        <li className='uppercase'>
          {media?.vote_average ? media?.vote_average.toFixed(1) : 'No Score'}
        </li>
      </ul>
      <h3 className='font-medium'>{media?.title || media?.name}</h3>
    </div>
  );
}
