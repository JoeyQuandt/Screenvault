import { useQuery } from '@tanstack/react-query';
import { Trailertype } from 'database.ds';
import { MovieTvDataType } from 'database.ds';
import ReactPlayer from 'react-player';

import { getTheMovieDBTrailer } from '@/lib/TheMovieAPI';

import MediaImage from '@/components/MediaCard/MediaImage';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';

type MediaVideoProps = {
  media: MovieTvDataType;
  carousel: boolean | undefined;
  hover: boolean;
};

export default function MediaVideo({
  media,
  carousel,
  hover,
}: MediaVideoProps) {
  const { data, isLoading, isError } = useQuery<Trailertype>({
    queryKey: ['preview', media.id],
    queryFn: () => getTheMovieDBTrailer(media.id, media.media_type),
  });

  if (isLoading)
    return (
      <div
        className={`overflow-hidden flex justify-center items-center flex-col bg-theme-mediumBlue relative object-cover cursor-pointer rounded-[8px]  h-[110px] w-full md:h-[140px] ${carousel ? 'lg:h-[230px]' : 'lg:h-[174px]'} relative mb-2`}
      >
        <LoadingSpinner className='text-theme-red w-8 h-auto md:w-11 md:h-auto' />
      </div>
    );
  if (isError)
    return (
      <div
        className={`overflow-hidden flex justify-center items-center flex-col bg-theme-mediumBlue relative object-cover cursor-pointer rounded-[8px]  h-[110px] w-full md:h-[140px] ${carousel ? 'lg:h-[230px]' : 'lg:h-[174px]'} relative mb-2`}
      >
        <h3 className='text-theme-red'>Error</h3>
      </div>
    );
  return (
    <>
      {data.length > 0 ? (
        <div
          className={`overflow-hidden relative object-cover cursor-pointer rounded-[8px]  h-[110px] w-full md:h-[140px] ${carousel ? 'lg:h-[230px]' : 'lg:h-[174px]'} relative mb-2`}
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${data[0].key}`}
            width='100%'
            height='100%'
            controls={false}
            playing={hover}
            loop={true}
            muted
          />
        </div>
      ) : (
        <MediaImage media={media} type={media.media_type} carousel={carousel} />
      )}
    </>
  );
}
