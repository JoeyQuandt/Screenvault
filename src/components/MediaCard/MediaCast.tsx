import { getInitials } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { imageUrl } from '@/constants/config';

type CastMemberType = {
  credit_id?: string;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  profile_path?: string;
  character?: string;
  job?: string;
  order: number;
};

type MediaCastType = {
  data: CastMemberType;
};

export default function MediaCast({ data }: MediaCastType) {
  return (
    <div className='flex items-center gap-3'>
      <Avatar>
        <AvatarImage
          className='object-cover'
          src={imageUrl + data?.profile_path}
          alt='cast member'
        />
        <AvatarFallback>{getInitials(data.name || 'John Doe')}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col gap-1'>
        <h3 className='text-white text-lg'>{data.name}</h3>
        <h4 className='text-xs text-white text-opacity-75'>
          {data.character || data.job}
        </h4>
      </div>
    </div>
  );
}
