import { WEATHER_BACKGROUND } from '@/constants/images';

interface WeatherCondition {
  temperature: number;
  precipitation: number;
  wind: number; 
  humidity: number;
  cloud: number;
}

export function getWeatherStatus({
  temperature,
  precipitation,
  wind,
  humidity,
  cloud,
}: WeatherCondition): { status: string; background: string } {
  if (precipitation > 10 && wind > 30 && humidity > 85 && cloud > 80) {
    return { status: 'Thunderstorm', background: WEATHER_BACKGROUND.Thunderstorm };
  }

  if (temperature <= 0 && precipitation > 0) {
    return { status: 'Snow', background: WEATHER_BACKGROUND.Snow };
  }

  if (precipitation >= 0.5 && precipitation <= 10 && cloud >= 50 && cloud <= 90 && wind >= 15) {
    return { status: 'Showers', background: WEATHER_BACKGROUND.Showers };
  }

  if (precipitation > 0.1 && cloud > 70) {
    return { status: 'Rain', background: WEATHER_BACKGROUND.Rain };
  }

  if (humidity > 90 && wind < 5 && precipitation === 0 && temperature <= 15) {
    return { status: 'Fog', background: WEATHER_BACKGROUND.Fog };
  }

  if (cloud > 80) {
    return { status: 'Cloudy', background: WEATHER_BACKGROUND.Cloudy };
  }

  return { status: 'Sunny', background: WEATHER_BACKGROUND.Sunny };
}
