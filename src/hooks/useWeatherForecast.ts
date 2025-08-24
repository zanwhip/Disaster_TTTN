import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { WeatherData } from '@/types/weather';

const WEATHER_API_BASE = process.env.NEXT_PUBLIC_WEATHER_API;

export const fetchWeather = async (
  lat: number,
  lon: number,
  days: number
): Promise<WeatherData> => {
  const today = new Date();
  const startDate = today.toISOString().split('T')[0];
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (days > 0 ? days : 0)); 
  const endDateStr = endDate.toISOString().split('T')[0];

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    hourly:
      'temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m,cloudcover',
    timezone: 'auto',
    start_date: startDate,
    end_date: endDateStr,
  });

  const { data } = await axios.get<WeatherData>(
    `${WEATHER_API_BASE}/forecast?${params}`
  );
  return data;
};

export const useWeatherForecast = (lat: number, lon: number, days: number) => {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', lat, lon, days],
    queryFn: () => fetchWeather(lat, lon, days),
    enabled: lat !== 0 && lon !== 0,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
