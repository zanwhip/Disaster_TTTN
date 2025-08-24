import { DisasterPage, DisasterEvent } from '@/types/disaster';

interface FetchDisastersParams {
  pageParam: number;
  limit?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_EONET_API;

export async function fetchDisasters({
  pageParam,
  limit = 10,
}: FetchDisastersParams): Promise<DisasterPage> {
  const offset = (pageParam - 1) * limit;
  const url = `${BASE_URL}/events?limit=${limit}&offset=${offset}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch disasters');
  }

  const data: { events: DisasterEvent[] } = await res.json();

  return {
    events: data.events,
    nextPage: data.events.length === limit ? pageParam + 1 : undefined,
  };
}

export async function fetchDisasterById(id: string): Promise<DisasterEvent> {
  const url = `${BASE_URL}/events/${id}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch disaster details');
  }

  return (await res.json()) as DisasterEvent;
}
