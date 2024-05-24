import { useQuery } from '@tanstack/react-query';
import { NetWorkMovieDataType, NetWorkTvDataType } from 'database.ds';
import Image from 'next/image';
import Link from 'next/link';

import { imageUrl } from '@/lib/config';
import { getTheMovieDBNetwork } from '@/lib/TheMovieAPI';

type WatchProviderProps = {
  id: number;
  type: string;
};

type NetworkCombinedData =
  | NetWorkTvDataType['results']
  | NetWorkMovieDataType['results'];

export default function WatchProvider({ id, type }: WatchProviderProps) {
  const { data } = useQuery<NetworkCombinedData>({
    queryKey: ['network', id],
    queryFn: () => getTheMovieDBNetwork(id, type),
  });

  if (data?.NL?.link && data?.NL?.flatrate && data.NL.flatrate.length > 0)
    return (
      <Link href={data.NL.link} target='_blank'>
        <Image
          className='mb-3 object-cover rounded-md'
          src={imageUrl + data.NL.flatrate[0].logo_path}
          alt='Network'
          width={50}
          height={50}
        />
      </Link>
    );
}
