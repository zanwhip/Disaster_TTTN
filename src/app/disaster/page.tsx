'use client';

import { useMemo } from 'react';

import DisasterList from '@/components/molecules/disaster/DisasterList';
import DisasterMap from '@/components/molecules/disaster/DisasterMap';

import { useDisasters } from '@/hooks/useDisasters';
import { DisasterEvent } from '@/types/disaster';

export default function DisastersPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useDisasters();

  const disasters: DisasterEvent[] = useMemo(() => {
    const map = new Map<string, DisasterEvent>();
    data?.pages.forEach((page) =>
      page.events.forEach((event) => {
        if (!map.has(event.id)) map.set(event.id, event);
      })
    );
    return Array.from(map.values());
  }, [data]);

  return (
    <main className="p-6 pt-60 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Thiên tai toàn cầu</h1>

      <section className="mb-8">
        <DisasterMap disasters={disasters} />
      </section>

      <DisasterList
        disasters={disasters}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        status={status}
        error={error}
      />
    </main>
  );
}
