import { MovieTvDataType } from 'database.ds';
import React, { forwardRef } from 'react';

import MediaCard from '@/components/MediaCard/MediaCard';

type MediaGridProps = {
  title: string;
  data: MovieTvDataType[] | undefined;
};

// Modify the function to use forwardRef
const MediaGrid = forwardRef<HTMLDivElement, MediaGridProps>(
  ({ title, data }, ref) => {
    return (
      <section>
        <h2 className='text-white mt-6 mb-6 md:mt-9'>{title}</h2>
        <section className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-4 lg:gap-10'>
          {data?.map((item, i) => {
            if (i + 1 === data.length)
              return (
                <div ref={ref} key={i}>
                  <MediaCard data={item} key={i} />
                </div>
              );
            return (
              <div key={i}>
                <MediaCard data={item} key={i} />
              </div>
            );
          })}
        </section>
      </section>
    );
  },
);

export default MediaGrid;
