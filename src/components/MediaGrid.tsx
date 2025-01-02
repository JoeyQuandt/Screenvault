import { MovieTvDataType } from 'database.ds';
import React, { forwardRef } from 'react';

import MediaCard from '@/components/MediaCard/MediaCard';

type MediaGridProps = {
  data: MovieTvDataType[] | undefined;
  type?: string;
};

// Modify the function to use forwardRef
const MediaGrid = forwardRef<HTMLDivElement, MediaGridProps>(
  ({ data, type }, ref) => {
    return (
      <section>
        <section className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 lg:grid-cols-4 lg:gap-10 mb-4 md:mb-7 lg:mb-10'>
          {data?.map((item, i) => {
            if (i + 1 === data.length)
              return (
                <div ref={ref} key={i}>
                  <MediaCard media={item} type={type} key={i} />
                </div>
              );
            return (
              <div key={i}>
                <MediaCard media={item} type={type} key={i} />
              </div>
            );
          })}
        </section>
      </section>
    );
  },
);

export default MediaGrid;
