'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import MediaGrid from '@/components/MediaGrid';
import Transition from '@/lib/transition';
import SelectField from '@/components/filter/SelectField';
import { MovieTvDataType } from 'database.ds';

type WatchlistClientProps = {
  initialWatchlist: MovieTvDataType[];
};

export default function WatchlistClient({
  initialWatchlist,
}: WatchlistClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Use URL search params directly as the single source of truth
  const sortBy = searchParams.get('sort_by') || 'date_added';

  // Update the URL when the sort selection changes
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort_by', value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const sortByList = [
    { value: 'date_added', label: 'Date Added' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'rating', label: 'Rating' },
    { value: 'release_date', label: 'Release Date' },
  ];

  const sortedWatchlist = useMemo(() => {
    const list = [...initialWatchlist];
    switch (sortBy) {
      case 'date_added':
        return list.sort((a, b) => {
          const dateA = a.added_at ? new Date(a.added_at).getTime() : 0;
          const dateB = b.added_at ? new Date(b.added_at).getTime() : 0;
          return dateB - dateA;
        });
      case 'upcoming':
      case 'release_date':
        return list.sort((a, b) => {
          const dateA = a.first_air_date
            ? new Date(a.first_air_date).getTime()
            : 0;
          const dateB = b.first_air_date
            ? new Date(b.first_air_date).getTime()
            : 0;
          return dateB - dateA;
        });
      case 'rating':
        return list.sort(
          (a, b) => (b.vote_average || 0) - (a.vote_average || 0),
        );
      default:
        return list;
    }
  }, [initialWatchlist, sortBy]);

  return (
    <Transition>
      <div className='flex flex-col md:flex-row justify-between md:items-center text-white mb-6 gap-4'>
        <h2>Watchlist</h2>
        <div className='flex items-center gap-4'>
          <div className='min-w-[150px]'>
            <SelectField
              options={sortByList}
              onChange={handleSortChange}
              defaultValue={sortBy}
            />
          </div>
        </div>
      </div>

      {sortedWatchlist.length > 0 ? (
        <MediaGrid data={sortedWatchlist} />
      ) : (
        <p className='text-theme-lightBlue text-center py-20'>
          Your watchlist is empty.
        </p>
      )}
    </Transition>
  );
}
