import { Trailertype } from 'database.ds';
import ReactPlayer from 'react-player';

import { LoadingSpinner } from '@/components/ui/loadingSpinner';

type VideoTrailerProps = {
  data: Trailertype['results'];
  isError: boolean;
  isLoading: boolean;
};

export function VideoTrailer({ data, isError, isLoading }: VideoTrailerProps) {
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
