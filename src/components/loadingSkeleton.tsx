import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingSkeleton() {
  return (
    <>
      <section>
        <section className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-4 lg:gap-10 mb-4 md:mb-7 lg:mb-10'>
          {Array.from({ length: 21 }, (_, i) => i + 1).map((id) => (
            <Skeleton
              className='rounded-[8px] w-[164px] h-[110px] md:w-[220px]  md:h-[140px] lg:w-[280px] lg:h-[174px]'
              key={id}
            />
          ))}
        </section>
      </section>
    </>
  );
}
