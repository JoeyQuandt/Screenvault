import { useQuery } from '@tanstack/react-query';
import { Trailertype } from 'database.ds';
import { Play } from 'lucide-react';
import { X } from 'lucide-react';

import { getTheMovieDBTrailer } from '@/lib/TheMovieAPI';

import { VideoTrailer } from '@/components/details/VideoTrailer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type PlayTrailerProps = {
  id: number;
  type: string;
};

export default function PlayTrailer({ id, type }: PlayTrailerProps) {
  const { data, isLoading, isError } = useQuery<Trailertype['results']>({
    queryKey: ['trailer', id],
    queryFn: () => getTheMovieDBTrailer(id, type),
  });

  if (data && data.length > 0)
    return (
      <Dialog>
        <DialogTrigger>
          <Button className='flex items-center gap-1' size='withIcon'>
            <Play className='w-4 h-4' />
            Play Trailer
          </Button>
        </DialogTrigger>
        <DialogContent className='rounded-[8px] bg-black max-w-xl md:max-w-2xl lg:max-w-4xl'>
          <DialogHeader className=' text-white flex flex-row justify-between items-center px-2 py-1 md:px-4 md:py-2'>
            <DialogTitle>Trailer</DialogTitle>
            <DialogClose>
              <Button size='icon' variant='icon'>
                <X className='w-4 h-4' />
              </Button>
            </DialogClose>
          </DialogHeader>
          {id && (
            <VideoTrailer data={data} isLoading={isLoading} isError={isError} />
          )}
        </DialogContent>
      </Dialog>
    );
}
