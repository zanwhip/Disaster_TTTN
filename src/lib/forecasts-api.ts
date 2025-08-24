import { WeatherForecast } from '@/types/weather';
import api from './api';

const WEATHER_API_BASE = process.env.NEXT_PUBLIC_WEATHER_API;

export const fetchWeatherForecast = async (
  lat: number,
  lon: number
): Promise<WeatherForecast> => {
  const res = await api.get<WeatherForecast>(`${WEATHER_API_BASE}/forecast`, {
    params: {
      latitude: lat,
      longitude: lon,
      hourly: 'temperature_2m,precipitation',
    },
  });
  return res.data;
};
