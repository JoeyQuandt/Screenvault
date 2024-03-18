import MediaCard from '@/components/MediaCard';
import { Media } from '@/components/MediaCard';

type MediaGridProps = {
  title: string;
  data: Media[];
};

export default function MediaGrid({ title, data }: MediaGridProps) {
  return (
    <section>
      <h2 className='text-white mt-6 mb-6 md:mt-9'>{title}</h2>
      <section className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-4 lg:gap-10'>
        {data.map((item, index) => {
          return <MediaCard data={item} key={index} />;
        })}
      </section>
    </section>
  );
}
