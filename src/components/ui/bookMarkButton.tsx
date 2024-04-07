'use client';

import { BookmarkLined } from '@/components/svgs';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

type BookmarkButtonProps = {
  title?: string;
  className: string;
  id: number;
};

type BookmarkList = {
  id: string;
  bookMarks: number[];
};

const BookmarkButton = ({ title, id, ...props }: BookmarkButtonProps) => {
  const { toast } = useToast();

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={() => {
        toast({
          title: `${title}  added to your bookmarks!`,
          action: (
            <ToastAction
              className='bg-theme-red border-none text-white'
              altText='Undo actoin'
            >
              Undo
            </ToastAction>
          ),
        });
      }}
      {...props}
    >
      <BookmarkLined className='h-3 w-3' />
    </Button>
  );
};

export default BookmarkButton;
