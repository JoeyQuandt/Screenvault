import NextImage from '@/components/NextImage';
import { Bullet, Movies, Tv } from '@/components/svgs';
import BookmarkButton from '@/components/ui/bookMarkButton';

type MediaCardProps = {
  data: {
    image: string;
    date: number;
    mediaType: string;
    rating: string;
    title: string;
  };
};

export default function MediaCard({ data }: MediaCardProps) {
  return (
    <article className='text-white flex-col text-left'>
      <NextImage
        src={data.image}
        alt='Media thumbnail'
        layout='fill'
        className='w-[164px] h-[110px] md:w-[220px] md:h-[140px] lg:w-[280px] lg:h-[174px] relative mb-2'
        classNamesImages='rounded-[8px]'
      >
        <BookmarkButton className='absolute text-transparent bg-theme-darkBlue bg-opacity-50 z-10 right-2 top-2 transition ease-in-out hover:text-theme-white' />
      </NextImage>
      <ul className='flex items-center gap-[6px] mb-2 opacity-75 text-sm'>
        <li>{data.date}</li>
        <Bullet className='w-[2px] h-[2px]' />
        <li className='flex items-center gap-1'>
          {data.mediaType === 'movie' ? (
            <>
              <Movies />
              Movie
            </>
          ) : (
            <>
              <Tv />
              Tv
            </>
          )}
        </li>
        <Bullet className='w-[2px] h-[2px]' />
        <li className='uppercase'>{data.rating}</li>
      </ul>
      <h3 className='font-medium'>{data.title}</h3>
    </article>
  );
}
