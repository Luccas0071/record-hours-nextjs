"use client";
import * as React from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000,   // 10 minutes (formerly cacheTime)
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {/* <HeroUIProvider>
        <ToastProvider placement="top-center"/> */}
        {children}
      {/* </HeroUIProvider> */}
    </QueryClientProvider>
  );
}
