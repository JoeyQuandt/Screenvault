'use client';

import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Skeleton } from '@/components/ui/skeleton';

type NextImageProps = {
  useSkeleton?: boolean;
  classNamesImages?: string;
  children?: React.ReactNode;
  alt: string;
  fill?: boolean;
  gradient?: boolean;
  href?: string;
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
  href,
  ...props
}: NextImageProps) {
  const widthIsSet = className?.includes('w-') ?? false;
  const [loading, setLoading] = useState(true);

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      {children}
      {loading && <Skeleton className='w-full h-full bg-white bg-opacity-70' />}
      {href && !gradient ? (
        <Image
          className={cn(
            loading ? 'opacity-0' : 'opacity-100',
            classNamesImages,
          )}
          src={src}
          width={width}
          priority={true}
          height={height}
          onLoad={() => setLoading(false)}
          alt={alt}
          fill={fill}
          {...props}
        />
      ) : (
        <Image
          className={cn(
            loading ? 'opacity-0' : 'opacity-100',
            classNamesImages,
          )}
          src={src}
          priority={true}
          width={width}
          height={height}
          onLoad={() => setLoading(false)}
          alt={alt}
          fill={fill}
          {...props}
        />
      )}
      {gradient &&
        (href ? (
          <div className='absolute w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_65%)]'></div>
        ) : (
          <div className='absolute w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_65%)]'></div>
        ))}
    </figure>
  );
}
