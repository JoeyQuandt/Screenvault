import React from 'react';
import { Button } from '@/components/ui/button';
import { MultiSelect } from '@/components/ui/multi-select';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import { SlidersHorizontal } from 'lucide-react';
import SelectField from '@/components/filter/SelectField';

interface Option {
  value: string;
  label: string;
}

interface Filters {
  selectedGenres: string[];
  selectedSortByList: string[];
  score: number[];
  selectedStatus: string[];
}

interface FilterProps {
  sortByList: Option[];
  handleSortByListChange: (value: string[]) => void;
  genres: Option[];
  handleGenresChange: (value: string[]) => void;
  score: number[];
  handleScoreChange: (value: number[]) => void;
  appliedFilters: Filters;
  onSearch: () => void; // New prop for Search button click
  voteCount: number[];
  handleVoteCountChange: (value: number[]) => void;
}

export default function Filter({
  sortByList,
  handleSortByListChange,
  genres,
  appliedFilters,
  handleGenresChange,
  score,
  handleScoreChange,
  onSearch,
  voteCount,
  handleVoteCountChange,
}: FilterProps) {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button size='iconRounded' className='bg-theme-mediumBlue'>
            <SlidersHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='bg-theme-mediumBlue text-white rounded-[8px] border-none z-50 px-8 py-4'>
          <h2 className='mb-6'>Filter</h2>
          <SelectField
            title='Sort By'
            options={sortByList}
            onChange={handleSortByListChange}
            defaultValue={appliedFilters.selectedSortByList[0]}
          />
          <MultiSelect
            title='Genres'
            options={genres}
            onValueChange={handleGenresChange}
            defaultValue={appliedFilters.selectedGenres}
            placeholder='Select genres'
            animation={2}
            maxCount={3}
          />
          <h3 className='mb-3'>User Scores: {score}</h3>
          <div className='mb-6'>
            <Slider
              className='mb-6'
              defaultValue={score}
              max={10}
              step={1}
              onValueChange={handleScoreChange}
            />
            <div className='flex justify-between'>
              <p>1</p>
              <p>10</p>
            </div>
          </div>
          <h3 className='mb-3'>Vote Count: {voteCount}</h3>
          <div className='mb-14'>
            <Slider
              className='mb-6'
              defaultValue={voteCount}
              max={500}
              step={50}
              onValueChange={handleVoteCountChange}
            />
            <div className='flex justify-between'>
              <p>0</p>
              <p>500</p>
            </div>
          </div>
          <Button onClick={onSearch}>Apply Filter</Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
