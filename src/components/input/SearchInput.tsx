import { SearchIcon } from 'lucide-react';

import PrimaryInput from '@/components/input/PrimaryInput';

type SearchInputProps = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: SearchInputProps) => {
  return (
    <PrimaryInput
      type='string'
      placeholder={placeholder}
      icon={<SearchIcon />}
      noOutline
    />
  );
};

export default SearchInput;
