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
  const { data, isLoading, isError } = useQuery<Trailertype>({
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
  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${data[0].key}`}
      width='100%'
      height='500px'
      playing={true}
      controls={true}
    />
  );
}
