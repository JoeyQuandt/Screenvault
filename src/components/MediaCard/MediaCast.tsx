import { CastMemberType } from 'database.ds';
import Link from 'next/link';

import { imageUrl } from '@/lib/config';
import { getFirstNameInitial } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type MediaCastType = {
  data: CastMemberType;
};

export default function MediaCast({ data }: MediaCastType) {
  return (
    <>
      {data.id ? (
        <Link href={`/details/person/${data.id}`} className='cursor-pointer'>
          <div className='flex items-center gap-3'>
            <Avatar>
              <AvatarImage
                className='object-cover'
                src={imageUrl + data?.profile_path}
                alt='cast member'
              />
              <AvatarFallback>
                {getFirstNameInitial(data.name || 'John Doe')}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col gap-1'>
              <h3 className='text-white text-lg'>{data.name}</h3>
              <h4 className='text-xs text-white text-opacity-75'>
                {data.character || data.job}
              </h4>
            </div>
          </div>
        </Link>
      ) : (
        <div className='flex items-center gap-3'>
          <Avatar>
            <AvatarImage
              className='object-cover'
              src={imageUrl + data?.profile_path}
              alt='cast member'
            />
            <AvatarFallback>
              {getFirstNameInitial(data.name || 'John Doe')}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-1'>
            <h3 className='text-white text-lg'>{data.name}</h3>
            <h4 className='text-xs text-white text-opacity-75'>
              {data.character || data.job}
            </h4>
          </div>
        </div>
      )}
    </>
  );
}
