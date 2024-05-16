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
