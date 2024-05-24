import { MovieTvDataType } from 'database.ds';

import { imageUrl } from '@/lib/config';

import NextImage from '@/components/NextImage';
import { Bullet, Movies, Tv } from '@/components/svgs';

type MediaImageProps = {
  media: MovieTvDataType;
  type: string | undefined;
  carousel?: boolean | undefined;
};

export default function MediaImage({ media, type, carousel }: MediaImageProps) {
  return (
    <NextImage
      src={
        media?.backdrop_path
          ? imageUrl + media?.backdrop_path
          : '/images/placeholder.jpg'
      }
      alt='Media thumbnail'
      className={`overflow-hidden cursor-pointer rounded-[8px]  h-[110px] w-full  md:h-[140px] ${carousel ? 'lg:h-[230px]' : 'lg:h-[174px]'} relative mb-2`}
      classNamesImages='rounded-[8px] object-cover'
      fill
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      gradient={carousel}
      href={`/details/${media?.media_type ? media.media_type : type}/${media?.id}`}
      useSkeleton
    >
      {carousel && (
        <div className='absolute bottom-2 left-2 z-10'>
          <ul className='flex items-center gap-[6px] mb-2 opacity-1 text-sm'>
            <li>
              {new Date(
                media?.first_air_date || media?.release_date || '',
              ).getFullYear()}
            </li>
            <Bullet className='w-[2px] h-[2px]' />
            <li className='flex items-center gap-1'>
              {media?.media_type === 'movie' || type === 'movie' ? (
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
              {media?.vote_average && media?.vote_average.toFixed(1)}
            </li>
          </ul>
          <h3 className='font-medium'>{media?.title || media?.name}</h3>
        </div>
      )}
    </NextImage>
  );
}
