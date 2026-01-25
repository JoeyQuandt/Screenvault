import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  noOutline?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, noOutline, ...props }, ref) => {
    if (icon) {
      return (
        <div className='relative w-full'>
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
            {icon}
          </div>
          <input
            type={type}
            className={cn(
              `text-base flex h-10 w-full text-white  bg-transparent placeholder-theme-white caret-theme-red placeholder-opacity-50 ${noOutline ? '' : 'border-b border-b-theme-lightBlue'} bg-transparent focus:text-white ${icon ? 'px-0' : 'px-4'} py-4 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-theme-white disabled:cursor-not-allowed disabled:opacity-50`,
              'pl-10',
              noOutline && 'border-0 focus-visible:ring-0',
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          `text-base flex h-10 w-full text-white  bg-transparent placeholder-theme-white caret-theme-red placeholder-opacity-50 ${noOutline ? '' : 'border-b border-b-theme-lightBlue'} bg-transparent focus:text-white px-4 py-4 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-theme-white disabled:cursor-not-allowed disabled:opacity-50`,
          noOutline && 'border-0 focus-visible:ring-0',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
