'use client';

import { useParams } from 'next/navigation';
import { useDisasterDetail } from '@/hooks/useDisasterDetail';

export default function DisasterDetailPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, error } = useDisasterDetail(params.id);

  if (isLoading) return <p className="text-center py-6">Đang tải chi tiết sự kiện...</p>;
  if (error) return <p className="text-center text-red-500">Lỗi: {error.message}</p>;
  if (!data) return <p className="text-center">Không tìm thấy sự kiện</p>;

  return (
    <main className="p-6 pt-60 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      {data.description && (
        <p className="mb-4 text-gray-700">{data.description}</p>
      )}
      <p className="mb-2">
        <span className="font-semibold">Danh mục:</span>{' '}
        {data.categories.map((cat) => cat.title).join(', ')}
      </p>
      {data.geometry[0] && (
        <p className="mb-2">
          <span className="font-semibold">Vị trí:</span>{' '}
          {data.geometry[0].coordinates.join(', ')}
        </p>
      )}
      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline mt-4 inline-block"
      >
        Xem chi tiết trên EONET
      </a>
    </main>
  );
}
