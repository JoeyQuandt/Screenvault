import { BookmarkIcon, Copy } from 'lucide-react';
import { X } from 'lucide-react';
import { Share2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { siteConfig } from '@/lib/config';
import { authClient } from '@/lib/auth/client';
import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from '@/app/(defaultLayout)/[userId]/watchlist/watchlist';

import { DetailProps } from '@/components/details/Hero';
import PlayTrailer from '@/components/details/PlayTrailer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function SocialLinks({ data, type }: DetailProps) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();

  const { data: bookmarked } = useQuery({
    queryKey: ['watchlist', data.id],
    queryFn: () => isInWatchlist(data.id),
    enabled: !!session?.user,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!session?.user) {
        toast.error('You must be logged in to bookmark items');
        return;
      }

      if (bookmarked) {
        await removeFromWatchlist(data.id);
        toast.success('Removed from watchlist');
      } else {
        await addToWatchlist({
          contentId: data.id,
          mediaType: type as 'movie' | 'tv',
          name: data.name || data.title || '',
          backdropPath: data.backdrop_path || '',
          firstAirDate: data.first_air_date || data.release_date || '',
          voteAverage: data.vote_average || 0,
        });
        toast.success('Added to watchlist');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist', data.id] });
    },
  });

  return (
    <div className='flex gap-8 z-10 mt-[-25px] lg:mt-[-80px] mb-9 relative max-md:justify-between'>
      <PlayTrailer id={data.id} type={type} />
      <div className='flex gap-3'>
        {type !== 'person' && session?.user && (
          <Button
            size='icon'
            variant='icon'
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className={bookmarked ? 'text-theme-red' : 'text-white'}
          >
            <BookmarkIcon
              className='w-4 h-4'
              fill={bookmarked ? 'currentColor' : 'none'}
            />
          </Button>
        )}
        <div className='flex gap-2'>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='icon' variant='icon'>
                <Share2 className='w-4 h-4' />
              </Button>
            </DialogTrigger>
            <DialogContent className='bg-theme-mediumBlue max-w-xl px-6 pt-4 pb-8'>
              <DialogHeader className=' text-white flex flex-row justify-between items-center'>
                <DialogTitle>Share</DialogTitle>
                <DialogClose asChild>
                  <Button size='icon' variant='icon'>
                    <X className='w-4 h-4' />
                  </Button>
                </DialogClose>
              </DialogHeader>
              <Input
                value={siteConfig.url + pathname}
                icon={
                  <Copy
                    className='text-theme-lightBlue hover:text-white hover:cursor-pointer'
                    onClick={() => {
                      navigator.clipboard.writeText(siteConfig.url + pathname);
                    }}
                  />
                }
                readOnly
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
