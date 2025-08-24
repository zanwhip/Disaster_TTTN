export interface WeatherHourly {
  time: string[];
  temperature_2m: number[];
  precipitation: number[];
}

export interface WeatherForecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  hourly_units: {
    time: string;
    temperature_2m: string;
    precipitation: string;
  };
  hourly: WeatherHourly;
}

export interface WeatherChartProps {
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
    wind_speed_10m: number[];
    relative_humidity_2m: number[];
    cloudcover: number[];
  };
  days: number; 
}

export interface ChartDataToday {
  time: string;
  temperature: number;
  precipitation: number;
  wind: number;
  humidity: number;
  cloud: number;
}


export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
    wind_speed_10m: number[];
    relative_humidity_2m: number[];
    cloudcover: number[];
  };
}
export interface WeatherCardConfig {
  label: string;
  icon: string;
  dataKey: string;
  color: string;
  getValue: (data: ChartDataToday | null) => string;
}
export interface ChartDataItem {
  time: string;
  temperature: number;
  precipitation: number;
  wind: number;
  humidity: number;
  cloud: number;
}

export interface ChartDataSummary extends ChartDataItem {
  ranges: {
    temperature: [number, number];
    precipitation: [number, number];
    wind: [number, number];
    humidity: [number, number];
    cloud: [number, number];
  };
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

export interface InfoCardProps {
  label: string;
  value: string;
  icon: string;
  data: ChartDataItem[];
  dataKey: keyof ChartDataItem;
  color: string;
}