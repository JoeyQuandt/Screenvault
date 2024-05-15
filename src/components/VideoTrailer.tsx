import { useQuery } from '@tanstack/react-query';
import { Trailertype } from 'database.ds';
import ReactPlayer from 'react-player';

import { getTheMovieDBTrailer } from '@/lib/TheMovieAPI';

import { LoadingSpinner } from '@/components/ui/loadingSpinner';

type VideoTrailerProps = {
  id: number;
  type: string;
};

export function VideoTrailer({ id, type }: VideoTrailerProps) {
  const { data, isLoading, isError } = useQuery<Trailertype['results']>({
    queryKey: ['trailer', id],
    queryFn: () => getTheMovieDBTrailer(id, type),
  });

  if (isLoading)
    return (
      <div className='grid text-theme-red justify-center items-center w-full h-[500px]'>
        <LoadingSpinner />
      </div>
    );

  if (isError)
    return (
      <div className='grid text-theme-red justify-center items-center w-full h-[500px]'>
        <h2>Error Loading video</h2>
      </div>
    );

  if (data && data.length > 0) {
    const videoKey = data[0].key;
    return (
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoKey}`}
        width='100%'
        height='500px'
        playing={true}
        controls={true}
      />
    );
  }

  return null;
}
