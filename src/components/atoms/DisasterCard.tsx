import Link from 'next/link';
import { DisasterEvent } from '@/types/disaster';

interface DisasterCardProps {
  event: DisasterEvent;
}

export default function DisasterCard({ event }: DisasterCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition">
      <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
      <p className="text-gray-500 text-sm">
        {event.categories[0]?.title || 'Không có danh mục'}
      </p>
      <p className="text-xs text-gray-400">
        {event.geometry[0]?.date
          ? new Date(event.geometry[0].date).toLocaleString()
          : 'Không rõ thời gian'}
      </p>
      <Link
        href={`/disasters/${event.id}`}
        className="text-blue-500 text-sm mt-2 inline-block"
      >
        Xem chi tiết
      </Link>
    </div>
  );
}
