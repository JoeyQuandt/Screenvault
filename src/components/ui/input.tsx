import * as React from 'react';

import { cn } from '@/lib/utils';

import { useToast } from '@/components/ui/use-toast';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconRight?: boolean;
  noOutline?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconRight, noOutline, ...props }, ref) => {
    const toast = useToast();
    return (
      <div className='flex gap-6 justify-between items-center'>
        {!iconRight && icon}
        <input
          type={type}
          className={cn(
            `text-base flex h-10 w-full text-white  bg-transparent placeholder-theme-white caret-theme-red placeholder-opacity-50 ${noOutline ? '' : 'border-b border-b-theme-lightBlue'} bg-transparent focus:text-white ${icon ? 'px-0' : 'px-4'} py-4 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-theme-white disabled:cursor-not-allowed disabled:opacity-50`,
            className,
          )}
          ref={ref}
          {...props}
        />
        {iconRight && icon}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
