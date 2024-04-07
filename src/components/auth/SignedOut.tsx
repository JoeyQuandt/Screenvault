'use client';

import { useSession } from 'next-auth/react';

type SignedInProps = {
  children: React.ReactNode;
};

export const SignedOut = ({ children }: SignedInProps) => {
  const { data: session } = useSession();
  return <>{!session && children}</>;
};
