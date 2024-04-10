import { MovieTvDataType } from 'database.ds';
import { useSession } from 'next-auth/react';

import { BookmarkLined } from '@/components/svgs';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

type BookmarkButtonProps = {
  title?: string;
  className: string;
  data: MovieTvDataType;
  id: number;
};

const BookmarkButton = ({ title, data, id, ...props }: BookmarkButtonProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={async () => {
        if (session?.user) {
          await fetch(`/api/addToBookMark`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userEmail: session?.user.email,
              data: data,
            }),
          });
        }
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
