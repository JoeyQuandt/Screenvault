'use client';
import { useQuery } from '@tanstack/react-query';
import { MovieTvDataType, TrendingMovieDataType } from 'database.ds';
import { SearchIcon, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { getTheMovieDBSearchApi } from '@/lib/TheMovieAPI';

import PrimaryInput from '@/components/input/PrimaryInput';
import { Movies, Tv } from '@/components/svgs';

type SearchInputProps = {
  placeholder: string;
  maxWidth?: boolean;
};

const SearchInput = ({ placeholder, maxWidth }: SearchInputProps) => {
  const [SearchInputValue, setSearchInputValue] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const { data, isError, isLoading } = useQuery<TrendingMovieDataType>({
    queryKey: ['search-data', SearchInputValue],
    queryFn: () => getTheMovieDBSearchApi(SearchInputValue),
  });

  return (
    <section className='relative'>
      <PrimaryInput
        type='string'
        searchValue={SearchInputValue}
        handleSearchValue={handleSearchChange}
        placeholder={placeholder}
        maxWidth={maxWidth}
        icon={<SearchIcon />}
        noOutline
      />
      {SearchInputValue && (
        <ul className='bg-theme-mediumBlue max-h-[500px]  overflow-y-scroll z-50 shadow-md  text-white rounded-[10px]  py-5 max-sm:px-4 md:px-6 md:rounded-[10px] lg:px-9 lg:rounded-[20px] absolute w-full'>
          {isLoading ? (
            <h2 className='text-center text-white'>loading</h2>
          ) : isError || data?.results?.length === 0 ? (
            <h2 className='text-center text-white'>No results found</h2>
          ) : (
            data?.results?.map((item: MovieTvDataType, index) => {
              return (
                <Link href='/' key={index}>
                  <li className='flex gap-3 items-center border-b border-b-theme-lightBlue py-4 cursor-pointer hover:border-b-theme-white'>
                    {item.media_type === 'movie' ? (
                      <Movies />
                    ) : item.media_type === 'tv' ? (
                      <Tv />
                    ) : (
                      <User />
                    )}
                    {item.title || item.name}
                  </li>
                </Link>
              );
            })
          )}
        </ul>
      )}
    </section>
  );
};

export default SearchInput;
