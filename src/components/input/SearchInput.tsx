import { SearchIcon } from 'lucide-react';

import PrimaryInput from '@/components/input/PrimaryInput';

type SearchInputProps = {
  placeholder: string;
  maxWidth?: boolean;
  searchValue?: string;
  handleSearchValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({
  placeholder,
  maxWidth,
  searchValue,
  handleSearchValue,
}: SearchInputProps) => {
  return (
    <PrimaryInput
      type='string'
      searchValue={searchValue}
      handleSearchValue={handleSearchValue}
      placeholder={placeholder}
      maxWidth={maxWidth}
      icon={<SearchIcon />}
      noOutline
    />
  );
};

export default SearchInput;
