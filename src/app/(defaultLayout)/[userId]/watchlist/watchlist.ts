'use server';

import sql from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { authServer } from '@/lib/auth/server';

export type WatchlistData = {
  contentId: number;
  mediaType: 'movie' | 'tv';
  name: string;
  backdropPath: string;
  firstAirDate: string;
  voteAverage: number;
};

export async function addToWatchlist(data: WatchlistData) {
  const session = await authServer.getSession();
  if (!session?.data?.user) {
    return false;
  }

  const userId = session.data.user.id;

  try {
    await sql`
      INSERT INTO watchlist (
        user_id, content_id, media_type, name, backdrop_path, first_air_date, vote_average
      )
      VALUES (
        ${userId}, ${data.contentId}, ${data.mediaType}, ${data.name}, 
        ${data.backdropPath}, ${data.firstAirDate}, ${data.voteAverage}
      )
      ON CONFLICT (user_id, content_id, media_type) DO NOTHING
    `;
    revalidatePath(`/${userId}/watchlist`);
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    throw new Error('Failed to add to watchlist');
  }
}

export async function removeFromWatchlist(contentId: number) {
  const session = await authServer.getSession();
  if (!session?.data?.user) {
    return false;
  }

  const userId = session.data.user.id;

  try {
    await sql`
      DELETE FROM watchlist
      WHERE user_id = ${userId} AND content_id = ${contentId}
    `;
    revalidatePath(`/${userId}/watchlist`);
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    throw new Error('Failed to remove from watchlist');
  }
}

export async function getWatchlist(userId: string) {
  try {
    const watchlist = await sql`
      SELECT * FROM watchlist
      WHERE user_id = ${userId}
      ORDER BY added_at DESC
    `;
    return watchlist;
  } catch (error) {
    console.error('Error getting watchlist:', error);
    return [];
  }
}

export async function isInWatchlist(contentId: number) {
  const { data: session } = await authServer.getSession();
  if (!session?.user) {
    return false;
  }

  const userId = session.user.id;

  try {
    const result = await sql`
      SELECT EXISTS (
        SELECT 1 FROM watchlist
        WHERE user_id = ${userId} AND content_id = ${contentId}
      )
    `;
    return result[0].exists;
  } catch (error) {
    console.error('Error checking watchlist:', error);
    return false;
  }
}
