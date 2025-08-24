export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  precipitation: number[];
  wind_speed_10m: number[];
  relative_humidity_2m: number[];
  cloudcover: number[];
}

export interface DailySummary {
  date: string;
  temperature_min: number;
  temperature_max: number;
  precipitation_min: number;
  precipitation_max: number;
  wind_min: number;
  wind_max: number;
  humidity_min: number;
  humidity_max: number;
  cloud_min: number;
  cloud_max: number;
}

export function groupDailySummary(hourly: HourlyData): DailySummary[] {
  const summaries: Record<string, Omit<DailySummary, 'date'>> = {};

  hourly.time.forEach((t, i) => {
    const date = t.split('T')[0];
    if (!summaries[date]) {
      summaries[date] = {
        temperature_min: hourly.temperature_2m[i],
        temperature_max: hourly.temperature_2m[i],
        precipitation_min: hourly.precipitation[i],
        precipitation_max: hourly.precipitation[i],
        wind_min: hourly.wind_speed_10m[i],
        wind_max: hourly.wind_speed_10m[i],
        humidity_min: hourly.relative_humidity_2m[i],
        humidity_max: hourly.relative_humidity_2m[i],
        cloud_min: hourly.cloudcover[i],
        cloud_max: hourly.cloudcover[i],
      };
    } else {
      summaries[date].temperature_min = Math.min(
        summaries[date].temperature_min,
        hourly.temperature_2m[i]
      );
      summaries[date].temperature_max = Math.max(
        summaries[date].temperature_max,
        hourly.temperature_2m[i]
      );
      summaries[date].precipitation_min = Math.min(
        summaries[date].precipitation_min,
        hourly.precipitation[i]
      );
      summaries[date].precipitation_max = Math.max(
        summaries[date].precipitation_max,
        hourly.precipitation[i]
      );
      summaries[date].wind_min = Math.min(
        summaries[date].wind_min,
        hourly.wind_speed_10m[i]
      );
      summaries[date].wind_max = Math.max(
        summaries[date].wind_max,
        hourly.wind_speed_10m[i]
      );
      summaries[date].humidity_min = Math.min(
        summaries[date].humidity_min,
        hourly.relative_humidity_2m[i]
      );
      summaries[date].humidity_max = Math.max(
        summaries[date].humidity_max,
        hourly.relative_humidity_2m[i]
      );
      summaries[date].cloud_min = Math.min(
        summaries[date].cloud_min,
        hourly.cloudcover[i]
      );
      summaries[date].cloud_max = Math.max(
        summaries[date].cloud_max,
        hourly.cloudcover[i]
      );
    }
  });

  return Object.entries(summaries).map(([date, data]) => ({
    date,
    ...data,
  }));
}
