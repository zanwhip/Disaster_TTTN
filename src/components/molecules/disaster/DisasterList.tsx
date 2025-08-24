import { useRef, useEffect } from 'react';
import { QueryStatus } from '@tanstack/react-query';

import DisasterCard from '@/components/atoms/DisasterCard';

import { DisasterEvent } from '@/types/disaster';


interface DisasterListProps {
  disasters: DisasterEvent[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  status: QueryStatus;
  error: unknown;
}

export default function DisasterList({
  disasters,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  status,
  error,
}: DisasterListProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (status === 'pending') return <p className="text-center py-6">Đang tải dữ liệu...</p>;
  if (status === 'error') return <p className="text-red-500">Lỗi: {(error as Error).message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Danh sách sự kiện thiên tai</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {disasters.map((event) => (
          <DisasterCard key={event.id} event={event} />
        ))}
      </div>
      <div ref={loaderRef} className="text-center py-4">
        {isFetchingNextPage
          ? 'Đang tải thêm...'
          : hasNextPage
          ? 'Cuộn xuống để tải thêm'
          : 'Hết sự kiện'}
      </div>
    </div>
  );
}
