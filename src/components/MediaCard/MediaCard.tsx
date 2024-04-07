import { MovieTvDataType } from 'database.ds';

import { SignedIn } from '@/components/auth';
import NextImage from '@/components/NextImage';
import { Bullet, Movies, Tv } from '@/components/svgs';
import BookmarkButton from '@/components/ui/bookMarkButton';

import { imageUrl } from '@/constants/config';

type MediaCardProps = {
  data: MovieTvDataType;
  carousel?: boolean;
};

export default function MediaCard({ data, carousel }: MediaCardProps) {
  return (
    <article className='text-white flex-col text-left mx-auto'>
      <NextImage
        src={imageUrl + data?.backdrop_path}
        alt='Media thumbnail'
        className={`overflow-hidden cursor-pointer rounded-[8px] w-[164px] h-[110px] md:w-[220px]  md:h-[140px] ${carousel ? 'lg:w-[400px]' : 'lg:w-[280px]'} ${carousel ? 'lg:h-[230px]' : 'lg:h-[174px]'} relative mb-2`}
        classNamesImages='rounded-[8px] object-cover'
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        gradient={carousel}
        href={`/details/${data?.media_type}/${data.id}`}
        useSkeleton
      >
        {carousel && (
          <div className='absolute bottom-2 left-2 z-10'>
            <ul className='flex items-center gap-[6px] mb-2 opacity-1 text-sm'>
              <li>
                {new Date(
                  data?.first_air_date || data?.release_date || '',
                ).getFullYear()}
              </li>
              <Bullet className='w-[2px] h-[2px]' />
              <li className='flex items-center gap-1'>
                {data?.media_type === 'movie' ? (
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
                {data?.vote_average && data?.vote_average.toFixed(1)}
              </li>
            </ul>
            <h3 className='font-medium'>{data?.title || data?.name}</h3>
          </div>
        )}
        <SignedIn>
          <BookmarkButton
            title={data?.title || data?.name}
            id={data.id}
            className='absolute text-transparent bg-theme-darkBlue bg-opacity-50 z-10 right-2 top-2 transition ease-in-out hover:text-theme-white'
          />
        </SignedIn>
      </NextImage>
      <div className={`${carousel && 'hidden'}`}>
        <ul className='flex items-center gap-[6px] mb-2 opacity-75 text-sm'>
          <li>
            {new Date(
              data?.first_air_date || data?.release_date || '',
            ).getFullYear()}
          </li>
          <Bullet className='w-[2px] h-[2px]' />
          <li className='flex items-center gap-1'>
            {data?.media_type === 'movie' ? (
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
          <li className='uppercase'>{data?.vote_average.toFixed(1)}</li>
        </ul>
        <h3 className='font-medium'>{data?.title || data?.name}</h3>
      </div>
    </article>
  );
}
