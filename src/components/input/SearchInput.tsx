'use client';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import PrimaryInput from '@/components/input/PrimaryInput';
import { Media } from '@/components/MediaCard/MediaCard';
import { Movies, Tv } from '@/components/svgs';

type SearchInputProps = {
  placeholder: string;
  maxWidth?: boolean;
  data?: Media[];
};

const SearchInput = ({ placeholder, maxWidth, data }: SearchInputProps) => {
  const [SearchInputValue, setSearchInputValue] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const filtered =
    data &&
    data.filter((movie) =>
      movie.title.toLowerCase().includes(SearchInputValue.toLocaleLowerCase()),
    );

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
      {SearchInputValue && filtered && (
        <ul className='bg-theme-mediumBlue z-50 shadow-md  text-white rounded-[10px]  py-5 max-sm:px-4 md:px-6 md:rounded-[10px] lg:px-9 lg:rounded-[20px] absolute w-full'>
          {filtered.length > 1 ? (
            filtered.map((item, index) => {
              return (
                <Link href='/' key={index}>
                  <li className='flex gap-3 items-center border-b border-b-theme-lightBlue py-4 cursor-pointer hover:border-b-theme-white'>
                    {item.mediaType === 'movies' ? <Movies /> : <Tv />}
                    {item.title}
                  </li>
                </Link>
              );
            })
          ) : (
            <h2 className='text-center'>No results found</h2>
          )}
        </ul>
      )}
    </section>
  );
};

export default SearchInput;
