import { SearchIcon } from 'lucide-react';

import PrimaryInput from '@/components/input/PrimaryInput';

type SearchInputProps = {
  placeholder: string;
  maxWidth?: boolean;
};

const SearchInput = ({ placeholder, maxWidth }: SearchInputProps) => {
  return (
    <PrimaryInput
      type='string'
      placeholder={placeholder}
      maxWidth={maxWidth}
      icon={<SearchIcon />}
      noOutline
    />
  );
};

export default SearchInput;
