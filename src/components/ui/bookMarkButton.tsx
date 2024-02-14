import { Button } from '@/components/ui/button';
import { BookmarkLined } from '@/components/svgs';

const BookmarkButton = ({ ...props }) => {
  return (
    <Button variant='outline' size='icon' {...props}>
      <BookmarkLined className='h-3 w-3' />
    </Button>
  );
};

export default BookmarkButton;
