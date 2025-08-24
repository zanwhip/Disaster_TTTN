import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, 
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: 1,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
      onError: (error) => {
        console.error('Global mutation error:', error);
      },
    },
  },
});