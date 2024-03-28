'use client';

import Image, { ImageProps } from 'next/image';
import * as React from 'react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type NextImageProps = {
  useSkeleton?: boolean;
  classNamesImages?: string;
  children?: React.ReactNode;
  alt: string;
  fill?: boolean;
  gradient?: boolean;
} & (
  | { width: string | number; height: string | number }
  | { width?: string | number; height?: string | number }
) &
  ImageProps;

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function NextImage({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  classNamesImages,
  children,
  fill,
  gradient,
  ...props
}: NextImageProps) {
  const widthIsSet = className?.includes('w-') ?? false;
  const [status, setStatus] = useState(useSkeleton ? 'loading' : 'complete');

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      {children}
      <Image
        className={cn(
          classNamesImages,
          status === 'loading' && cn('animate-pulse', classNamesImages),
        )}
        src={src}
        width={width}
        height={height}
        onLoad={() => setStatus('complete')}
        alt={alt}
        fill={fill}
        {...props}
      />
      {gradient && (
        <div className='absolute w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_65%)]'></div>
      )}
    </figure>
  );
}
