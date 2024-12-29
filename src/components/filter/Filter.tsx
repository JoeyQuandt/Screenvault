import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { MultiSelect } from '@/components/ui/multi-select';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';

import {
  SlidersHorizontal,
  Cat,
  Dog,
  Fish,
  Rabbit,
  Turtle,
} from 'lucide-react';

export default function Filter() {
  const frameworksList = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'ember', label: 'Ember' },
  ];

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    'react',
    'angular',
  ]);

  const genres = [
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'ember', label: 'Ember' },
  ];

  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    'react',
    'angular',
  ]);

  const [score, setScore] = useState([0]);

  const handleChange = (newValue: number[]) => {
    setScore(newValue);
  };

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
          <MultiSelect
            title='Availabilities'
            options={frameworksList}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder='Select service'
            animation={2}
            maxCount={3}
          />

          <MultiSelect
            title='Genres'
            options={genres}
            onValueChange={setSelectedGenres}
            defaultValue={selectedGenres}
            placeholder='Select genres'
            animation={2}
            maxCount={3}
          />
          <h3 className='mb-3'>User Scores: {score}</h3>
          <div className='mb-14'>
            <Slider
              className='mb-6'
              defaultValue={score}
              max={10}
              step={1}
              onValueChange={handleChange}
            />
            <div className='flex justify-between'>
              <p>1</p>
              <p>10</p>
            </div>
          </div>
          <Button>Search</Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
