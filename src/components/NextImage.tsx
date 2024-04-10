'use client';

import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
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
  const [status, setStatus] = useState(useSkeleton ? 'loading' : 'complete');

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      {children}
      {href && !gradient ? (
        <Link href={href}>
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
        </Link>
      ) : (
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
      )}
      {gradient &&
        (href ? (
          <Link href={href}>
            <div className='absolute w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_65%)]'></div>
          </Link>
        ) : (
          <div className='absolute w-full h-full bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_65%)]'></div>
        ))}
    </figure>
  );
}
