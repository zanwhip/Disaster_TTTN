import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchDisasters } from '@/lib/disasters-api';

import { DisasterPage } from '@/types/disaster';


export const useDisasters = () =>
  useInfiniteQuery({
    queryKey: ['disasters'],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchDisasters({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: DisasterPage) => lastPage.nextPage,
  });
