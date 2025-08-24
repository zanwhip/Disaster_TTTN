const NOMINATIM_BASE =
  process.env.NEXT_PUBLIC_NOMINATIM_BASE || 'https://nominatim.openstreetmap.org';

export interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

export async function fetchSuggestions(query: string): Promise<Suggestion[]> {
  const res = await fetch(
    `${NOMINATIM_BASE}/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`
  );
  if (!res.ok) throw new Error('Không thể tìm kiếm địa chỉ');
  return res.json();
}

/**
 * Format địa chỉ đầy đủ từ dữ liệu Nominatim
 */
function formatFullAddress(addr: Suggestion['address']): string {
  const parts = [
    addr.road ? `${addr.road}` : '',
    addr.suburb ? `${addr.suburb}` : '',
    addr.city || addr.town || addr.village || '',
    addr.state || '',
    addr.country || '',
  ].filter(Boolean); // loại bỏ giá trị rỗng
  return parts.join(', ');
}

export async function fetchAddress(lat: number, lon: number): Promise<string> {
  const res = await fetch(
    `${NOMINATIM_BASE}/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
  );
  if (!res.ok) throw new Error('Không thể lấy địa chỉ');
  const data = await res.json();

  if (data.address) {
    return formatFullAddress(data.address);
  }

  return 'Không xác định được địa chỉ';
}
