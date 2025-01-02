import { v4 as uuidv4 } from 'uuid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SelectFieldProps = {
  title: string;
  defaultValue: string;
  onChange: (value: string[]) => void;
  options: {
    label: string;
    value: string;
  }[];
};

export default function SelectField({
  title,
  options,
  onChange,
  defaultValue,
}: SelectFieldProps) {
  return (
    <>
      <h3 className='mb-3'>{title}</h3>
      <Select onValueChange={onChange} defaultValue={defaultValue}>
        <SelectTrigger className='mb-5 bg-transparent rounded-none border-t-0 border-r-0 border-l-0 border-b-2 border-b-theme-lightBlue text-base'>
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent className=' min-w-[100px] lg:max-w-[250px] bg-theme-mediumBlue border-theme-lightBlue text-theme-white'>
          {options.map((item) => {
            return (
              <SelectItem key={uuidv4()} value={item.value}>
                {item.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
