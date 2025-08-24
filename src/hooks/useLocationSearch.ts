import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSuggestions, fetchAddress, Suggestion } from '@/lib/location'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function useLocation() {
  const [query, setQuery] = useState<string>('');
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  const debouncedQuery = useDebounce(query, 400);

  const { data: suggestions = [], isFetching: isSuggestLoading } = useQuery<Suggestion[], Error>({
    queryKey: ['location-search', debouncedQuery],
    queryFn: () => fetchSuggestions(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
    staleTime: 60 * 1000,
  });

  const { data: currentAddress, isFetching: isAddrLoading } = useQuery<string, Error>({
    queryKey: ['reverse-geocode', coords?.lat, coords?.lon],
    queryFn: () => fetchAddress(coords!.lat, coords!.lon),
    enabled: !!coords,
    staleTime: 5 * 60 * 1000,
  });

  return {
    query,
    setQuery,
    coords,
    setCoords,
    suggestions,
    isSuggestLoading,
    currentAddress,
    isAddrLoading,
    fetchSuggestions
  };
}
