import { Copy } from 'lucide-react';
import { X } from 'lucide-react';
import { Share2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { SignedIn } from '@/components/auth';
import { DetailProps } from '@/components/details/Hero';
import PlayTrailer from '@/components/details/PlayTrailer';
import BookmarkButton from '@/components/ui/bookMarkButton';
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

import { siteConfig } from '@/constants/config';

export default function SocialLinks({ data, type }: DetailProps) {
  const pathname = usePathname();

  return (
    <div className='flex gap-8 z-50 mt-[-25px] lg:mt-[-80px] mb-9 relative max-md:justify-between'>
      <PlayTrailer id={data.id} type={type} />
      <div className='flex gap-2'>
        <SignedIn>
          <BookmarkButton
            data={data}
            title={data?.name}
            id={data.id}
            className='bg-white bg-opacity-50 text-white p-3 rounded-[50%]'
          />
        </SignedIn>
        <Dialog>
          <DialogTrigger>
            <Button size='icon' variant='icon'>
              <Share2 className='w-4 h-4' />
            </Button>
          </DialogTrigger>
          <DialogContent className='bg-theme-mediumBlue max-w-xl px-6 pt-4 pb-8'>
            <DialogHeader className=' text-white flex flex-row justify-between items-center'>
              <DialogTitle>Share</DialogTitle>
              <DialogClose>
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
              iconRight
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
