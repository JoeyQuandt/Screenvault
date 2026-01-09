import { MovieTvDataType } from 'database.ds';

import { Bullet, Movies, Tv } from '@/components/svgs';

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
      <ul className='flex items-center gap-[6px] mb-2 opacity-75 text-sm'>
        <li>{year}</li>
        <Bullet className='w-[2px] h-[2px]' />
        <li className='flex items-center gap-1'>
          {isMovie ? (
            <>
              <Movies /> Movie
            </>
          ) : (
            <>
              <Tv />
              Tv
            </>
          )}
        </li>
        <Bullet className='w-[2px] h-[2px]' />
        <li className='uppercase'>
          {media?.vote_average ? media?.vote_average.toFixed(1) : 'No Score'}
        </li>
      </ul>
      <h3 className='font-medium'>{media?.title || media?.name}</h3>
    </div>
  );
}
