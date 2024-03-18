import NextImage from '@/components/NextImage';
import { Bullet, Movies, Tv } from '@/components/svgs';
import BookmarkButton from '@/components/ui/bookMarkButton';

export interface Media {
  image: string;
  date: number;
  mediaType: string;
  rating: string;
  title: string;
}

type MediaCardProps = {
  data: Media;
  carousel?: boolean;
};

export default function MediaCard({ data, carousel }: MediaCardProps) {
  return (
    <article className='text-white flex-col text-left mx-auto'>
      <NextImage
        src={data.image}
        alt='Media thumbnail'
        className={`w-[164px] h-[110px] md:w-[220px]  md:h-[140px] ${carousel ? 'lg:w-[400px]' : 'lg:w-[280px]'} ${carousel ? 'lg:h-[230px]' : 'lg:h-[174px]'}  relative mb-2`}
        classNamesImages='rounded-[8px] object-cover'
        fill
        gradient
      >
        {carousel && (
          <div className='absolute bottom-2 left-2 z-10'>
            <ul className='flex items-center gap-[6px] mb-2 opacity-75 text-sm'>
              <li>{data.date}</li>
              <Bullet className='w-[2px] h-[2px]' />
              <li className='flex items-center gap-1'>
                {data.mediaType === 'movie' ? (
                  <>
                    <Movies /> Movie
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
          </div>
        )}
        <BookmarkButton className='absolute text-transparent bg-theme-darkBlue bg-opacity-50 z-10 right-2 top-2 transition ease-in-out hover:text-theme-white' />
      </NextImage>
      <div className={`${carousel && 'hidden'}`}>
        <ul className='flex items-center gap-[6px] mb-2 opacity-75 text-sm'>
          <li>{data.date}</li>
          <Bullet className='w-[2px] h-[2px]' />
          <li className='flex items-center gap-1'>
            {data.mediaType === 'movie' ? (
              <>
                <Movies /> Movie
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
      </div>
    </article>
  );
}
