'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import React, { useState } from 'react';

type ProviderProps = {
  children: React.ReactNode;
};

function Provider({ children }: ProviderProps) {
  const [client] = useState(new QueryClient());

  return (
    <>
      <QueryClientProvider client={client}>
        <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      </QueryClientProvider>
    </>
  );
}

export { Provider };
