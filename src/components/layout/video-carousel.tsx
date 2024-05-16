'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { TrendingDataByType } from 'database.ds';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import SignInForm from '@/components/auth/SignInForm';
import { getTheMovieDBTrendingAPI } from '@/lib/TheMovieAPI';

import { imageUrl } from '@/constants/config';

export const VideoCarousel = () => {
  const { data } = useQuery<TrendingDataByType<'all'>>({
    queryKey: ['trending-movie&tv-landing-page'],
    queryFn: () => getTheMovieDBTrendingAPI('all', 1),
  });

  const { width, height } = useWindowSize();
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: carouselWrapperRef,
    offset: ['start start', 'end start'],
  });

  const maximumScale = useMemo(() => {
    const windowYRatio = height / width;
    const xScale = 1.66667;
    const yScale = xScale * (16 / 9) * windowYRatio;
    return Math.max(xScale, yScale);
  }, [width, height]);

  const scale = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.66],
    [maximumScale * 1.1, maximumScale, 1],
  );

  const postersOpacity = useTransform(scrollYProgress, [0.64, 0.66], [0, 1]);
  const posterTranslateXLeft = useTransform(
    scrollYProgress,
    [0.64, 0.66],
    [-20, 0],
  );
  const posterTranslateXRight = useTransform(
    scrollYProgress,
    [0.64, 0.66],
    [20, 0],
  );

  const [carouselVariant, setCarouselVariant] = useState<'inactive' | 'active'>(
    'inactive',
  );
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (progress >= 0.67) {
      setCarouselVariant('active');
    } else {
      setCarouselVariant('inactive');
    }
  });

  return (
    <motion.div animate={carouselVariant} className='bg-theme-darkBlue pb-10'>
      <div
        ref={carouselWrapperRef}
        className='mt-[-100vh] h-[300vh] overflow-clip'
      >
        <div className='sticky top-0 flex h-screen items-center'>
          <div className='relative left-1/2 mb-5 flex -translate-x-1/2 gap-5'>
            <motion.div
              style={{ opacity: postersOpacity, x: posterTranslateXLeft }}
              className='aspect-[9/16] w-[300px] shrink-0 overflow-clip rounded-2xl md:aspect-video md:w-[60vw]'
            >
              <img
                className='h-full w-full object-cover'
                src={imageUrl + data?.results[0]?.backdrop_path}
                alt='Poster'
              />
            </motion.div>
            <motion.div
              style={{ scale }}
              className='relative aspect-[9/16] w-[300px] shrink-0 overflow-clip rounded-2xl md:aspect-video md:w-[60vw]'
            >
              <img
                className='h-full w-full object-cover'
                src='/images/background.jpg'
                alt='Poster'
              />
              <motion.div
                variants={{
                  active: { opacity: 1 },
                  inactive: { opacity: 0 },
                }}
                className='absolute bottom-10 left-0 right-0  flex w-full flex-col items-center gap-4 p-5 text-lg text-white md:flex-row md:justify-between md:gap-0'
              >
                <p className='lg:text-2xl text-center text-xl opacity-70 max-w-[500px] mb-4 mx-auto'>
                  Discover, Explore and Experience Your Favorite Movies and TV
                  Shows Like Never Before
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              style={{ opacity: postersOpacity, x: posterTranslateXRight }}
              className='aspect-[9/16] w-[300px] shrink-0 overflow-clip rounded-2xl md:aspect-video md:w-[60vw]'
            >
              <img
                className='h-full w-full object-cover'
                src={imageUrl + data?.results[2]?.backdrop_path}
                alt='Poster'
              />
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        variants={{
          active: { opacity: 1, y: 0 },
          inactive: { opacity: 0, y: 20 },
        }}
        transition={{ duration: 0.4 }}
        className='-mt-[calc((100vh-(300px*(16/9)))/2)] space-y-3 pt-4 md:-mt-[calc((100vh-(60vw*(9/16)))/2)] relative'
      >
        <SignInForm className='absolute z-50 left-0 right-0 top-20' />
        <div className='overflow-clip'>
          <div className='relative left-[var(--carousel-offset,0px)] flex animate-carousel-move gap-3'>
            {data?.results?.slice(0, 5).map((movie, index) => (
              <div
                className='aspect-video w-[40vw] shrink-0 md:w-[23vw]'
                key={`${movie.title}-${index}`}
              >
                <img
                  className='h-full w-full rounded-xl object-cover'
                  src={imageUrl + movie.backdrop_path}
                  alt='Poster'
                />
              </div>
            ))}
          </div>
        </div>
        <div className='[--carousel-offset:-32px] [--duration:74s]'>
          <div className='overflow-clip'>
            <div className='relative left-[var(--carousel-offset,0px)] flex animate-carousel-move gap-3'>
              {data?.results?.slice(5, 10).map((movie, index) => (
                <div
                  className='aspect-video w-[40vw] shrink-0 md:w-[23vw]'
                  key={`${movie.title}-${index}`}
                >
                  <img
                    className='h-full w-full rounded-xl object-cover'
                    src={imageUrl + movie.backdrop_path}
                    alt='Poster'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='[--carousel-offset:-32px] [--duration:84s]'>
          <div className='overflow-clip'>
            <div className='relative left-[var(--carousel-offset,0px)] flex animate-carousel-move gap-3'>
              {data?.results?.slice(10, 15).map((movie, index) => (
                <div
                  className='aspect-video w-[40vw] shrink-0 md:w-[23vw]'
                  key={`${movie.title}-${index}`}
                >
                  <img
                    className='h-full w-full rounded-xl object-cover'
                    src={imageUrl + movie.backdrop_path}
                    alt='Poster'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
