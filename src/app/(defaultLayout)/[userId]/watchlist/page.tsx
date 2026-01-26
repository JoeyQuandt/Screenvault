import { getWatchlist } from '@/app/(defaultLayout)/[userId]/watchlist/watchlist';
import MediaGrid from '@/components/MediaGrid';
import Transition from '@/lib/transition';
import { MovieTvDataType } from 'database.ds';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watchlist',
};

export default async function Watchlist({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const watchlist = await getWatchlist(userId);

  const mediaData: MovieTvDataType[] = watchlist.map((item: any) => ({
    id: item.content_id,
    name: item.name,
    title: item.name,
    backdrop_path: item.backdrop_path,
    media_type: item.media_type,
    first_air_date: item.first_air_date,
    release_date: item.first_air_date,
    vote_average: item.vote_average,
    popularity: 0,
  }));

  return (
    <Transition>
      <h2 className='text-white mb-6'>Watchlist</h2>
      {mediaData.length > 0 ? (
        <MediaGrid data={mediaData} />
      ) : (
        <p className='text-theme-lightBlue text-center py-20'>
          Your watchlist is empty.
        </p>
      )}
    </Transition>
  );
}
