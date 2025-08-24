import { useQuery } from '@tanstack/react-query';

import { fetchDisasterById } from '@/lib/disasters-api';

import { DisasterEvent } from '@/types/disaster';


export const useDisasterDetail = (id: string) => {
  return useQuery<DisasterEvent, Error>({
    queryKey: ['disaster', id],
    queryFn: () => fetchDisasterById(id),
    enabled: !!id, 
  });
};
