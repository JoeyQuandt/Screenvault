import { MovieTvDataType } from 'database.ds';
import React, { forwardRef } from 'react';

import MediaCard from '@/components/MediaCard/MediaCard';

type MediaGridProps = {
  data: MovieTvDataType[] | undefined;
};

// Modify the function to use forwardRef
const MediaGrid = forwardRef<HTMLDivElement, MediaGridProps>(
  ({ data }, ref) => {
    return (
      <section>
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
