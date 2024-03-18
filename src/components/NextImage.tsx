'use client';

import Image, { ImageProps } from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

type NextImageProps = {
  useSkeleton?: boolean;
  classNamesImages?: string;
  children?: React.ReactNode;
  alt: string;
  fill?: boolean;
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
  src,
  width,
  height,
  alt,
  className,
  classNamesImages,
  children,
  fill,
  ...props
}: NextImageProps) {
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      {children}
      <Image
        className={cn(classNamesImages)}
        src={src}
        width={width}
        height={height}
        alt={alt}
        fill={fill}
        {...props}
      />
    </figure>
  );
}
