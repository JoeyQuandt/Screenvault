import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (fullName: string) => {
  const names = fullName.split(' ');
  const firstNameInitial = names[0][0];
  const lastNameInitial = names[names.length - 1][0];
  return firstNameInitial + lastNameInitial;
};

/**
 * Create an SEO-friendly slug from a movie/actor title.
 * Examples:
 *  The Conjuring: Last Rites -> the-conjuring-last-rites
 *  Spider-Man: No Way Home -> spider-man-no-way-home
 */
export function seoTitle(title: string) {
  if (!title) return '';

  // normalize, remove diacritics
  let s = title
    .toString()
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();

  // replace punctuation commonly used in titles with spaces so we don't create double dashes
  s = s.replace(/[:–—_\\/]+/g, ' ');

  // replace non-alphanumeric (but keep dashes) with dashes and collapse multiple dashes
  s = s.replace(/[^a-z0-9-]+/g, '-').replace(/--+/g, '-');

  // trim leading/trailing dashes
  s = s.replace(/^-+|-+$/g, '');

  return s;
}
