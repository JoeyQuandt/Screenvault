import { getWatchlist } from '@/app/(defaultLayout)/[userId]/watchlist/watchlist';
import { MovieTvDataType } from 'database.ds';
import { Metadata } from 'next';
import WatchlistClient from './WatchlistClient';

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

  const mediaData: MovieTvDataType[] = watchlist.map((item) => ({
    id: item.content_id,
    content_id: item.content_id,
    name: item.name,
    title: item.name,
    backdrop_path: item.backdrop_path,
    media_type: item.media_type,
    first_air_date: item.first_air_date,
    release_date: item.first_air_date,
    vote_average: item.vote_average,
    added_at: item.added_at,
    popularity: 0,
  }));

  return <WatchlistClient initialWatchlist={mediaData} />;
}
