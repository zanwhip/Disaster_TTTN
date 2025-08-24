import { WEATHER_ICONS } from "./images";
import { ChartDataItem } from "@/types/weather";

export const WEATHER_ATTRIBUTES = [
  { key: "temperature", label: "Nhiệt độ (°C)", color: "#ff7300" },
  { key: "precipitation", label: "Mưa (mm)", color: "#00aaff" },
  { key: "wind", label: "Gió (km/h)", color: "#82ca9d" },
  { key: "humidity", label: "Độ ẩm (%)", color: "#8884d8" },
  { key: "cloud", label: "Mây (%)", color: "#ffc658" },
];

export const createCardsConfig = (
  currentData: ChartDataItem | null,
  chartDataToday: ChartDataItem[]
) => [
  {
    label: "Nhiệt độ",
    value: currentData ? `${Math.round(currentData.temperature)}°C` : "--",
    icon: WEATHER_ICONS.temperature,
    data: chartDataToday,
    dataKey: "temperature",
    color: "#FF6B6B",
  },
  {
    label: "Mưa",
    value: currentData ? `${currentData.precipitation.toFixed(1)} mm` : "--",
    icon: WEATHER_ICONS.precipitation,
    data: chartDataToday,
    dataKey: "precipitation",
    color: "#4FC3F7",
  },
  {
    label: "Gió",
    value: currentData ? `${currentData.wind.toFixed(1)} km/h` : "--",
    icon: WEATHER_ICONS.wind,
    data: chartDataToday,
    dataKey: "wind",
    color: "#81C784",
  },
];
