'use client';

import NextImage from '@/components/NextImage';

export default function Test() {
  return (
    <div>
      <h1>Hello World</h1>
      <NextImage src='/newyork-city.jpg' layout='fill' alt='Image test' />
    </div>
  );
}
