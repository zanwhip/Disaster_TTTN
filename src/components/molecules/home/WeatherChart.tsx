"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { WiHumidity } from "react-icons/wi";
import { FaCloud, FaWind } from "react-icons/fa";
import { LuCloudRain } from "react-icons/lu";

import InfoCard from "@/components/atoms/InfoCard";
import { WEATHER_ATTRIBUTES } from "@/constants/weather";
import { WEATHER_ICONS } from "@/constants/images";
import { groupDailySummary } from "@/utils/weather-utils";

import {
  WeatherChartProps,
  ChartDataItem,
  ChartDataSummary,
  DailySummary,
} from "@/types/weather";

export default function WeatherChart({ hourly, days }: WeatherChartProps) {
  const [selectedAttrs] = useState<string[]>([
    "temperature",
    "precipitation",
    "wind",
    "humidity",
    "cloud",
  ]);

  const dailySummary: DailySummary[] = useMemo(
    () => groupDailySummary(hourly),
    [hourly]
  );

  const chartDataToday: ChartDataItem[] = useMemo(
    () =>
      hourly.time.map((t, i) => ({
        time: t,
        temperature: hourly.temperature_2m[i],
        precipitation: hourly.precipitation[i],
        wind: hourly.wind_speed_10m[i],
        humidity: hourly.relative_humidity_2m[i],
        cloud: hourly.cloudcover[i],
      })),
    [hourly]
  );

  const chartDataSummary: ChartDataSummary[] = useMemo(
    () =>
      dailySummary.map((d) => ({
        time: d.date,
        temperature: (d.temperature_min + d.temperature_max) / 2,
        precipitation: (d.precipitation_min + d.precipitation_max) / 2,
        wind: (d.wind_min + d.wind_max) / 2,
        humidity: (d.humidity_min + d.humidity_max) / 2,
        cloud: (d.cloud_min + d.cloud_max) / 2,
        ranges: {
          temperature: [d.temperature_min, d.temperature_max],
          precipitation: [d.precipitation_min, d.precipitation_max],
          wind: [d.wind_min, d.wind_max],
          humidity: [d.humidity_min, d.humidity_max],
          cloud: [d.cloud_min, d.cloud_max],
        },
      })),
    [dailySummary]
  );

  const currentData = chartDataToday[0] || null;

  const cardsConfig = [
    {
      label: "Nhiệt độ",
      value: currentData ? `${Math.round(currentData.temperature)}°C` : "--",
      icon: WEATHER_ICONS.temperature,
      data: chartDataToday,
      dataKey: "temperature" as keyof ChartDataItem,
      color: "#FF6B6B",
    },
    {
      label: "Mưa",
      value: currentData ? `${currentData.precipitation.toFixed(1)} mm` : "--",
      icon: WEATHER_ICONS.precipitation,
      data: chartDataToday,
      dataKey: "precipitation" as keyof ChartDataItem,
      color: "#4FC3F7",
    },
    {
      label: "Gió",
      value: currentData ? `${currentData.wind.toFixed(1)} km/h` : "--",
      icon: WEATHER_ICONS.wind,
      data: chartDataToday,
      dataKey: "wind" as keyof ChartDataItem,
      color: "#81C784",
    },
  ];

  return (
    <div className="mt-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-[3] flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cardsConfig.map((card) => (
              <InfoCard key={card.label} {...card} />
            ))}
          </div>
          <div className="h-80 bg-black/20 p-4 rounded-lg">
            <ResponsiveContainer>
              {days === 0 ? (
                <LineChart data={chartDataToday}>
                  <XAxis
                    dataKey="time"
                    tick={{ fill: "#FFFFFF" }}
                    tickLine={{ stroke: "#FFFFFF" }}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }
                  />
                  <YAxis
                    tick={{ fill: "#FFFFFF" }}
                    tickLine={{ stroke: "#FFFFFF" }}
                  />
                  <Tooltip />
                  <Legend />
                  {selectedAttrs.map((attr) => (
                    <Line
                      key={attr}
                      type="monotone"
                      dataKey={attr}
                      stroke={
                        WEATHER_ATTRIBUTES.find((a) => a.key === attr)?.color ||
                        "#FFFFFF"
                      }
                      dot={false}
                      name={
                        WEATHER_ATTRIBUTES.find((a) => a.key === attr)?.label
                      }
                    />
                  ))}
                </LineChart>
              ) : (
                <BarChart data={chartDataSummary}>
                  <XAxis
                    dataKey="time"
                    tick={{ fill: "#FFFFFF" }}
                    tickLine={{ stroke: "#FFFFFF" }}
                  />
                  <YAxis
                    tick={{ fill: "#FFFFFF" }}
                    tickLine={{ stroke: "#FFFFFF" }}
                  />
                  <Tooltip />
                  <Legend />
                  {selectedAttrs.map((attr) => (
                    <Bar
                      key={attr}
                      dataKey={attr}
                      fill={
                        WEATHER_ATTRIBUTES.find((a) => a.key === attr)?.color ||
                        "#FFFFFF"
                      }
                      name={
                        WEATHER_ATTRIBUTES.find((a) => a.key === attr)?.label
                      }
                    />
                  ))}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex-[1] bg-black/30 p-4 rounded-lg text-white">
          <h4 className="font-semibold text-lg mb-4 text-center">
            Chi tiết hiện tại
          </h4>
          {currentData ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DetailItem
                icon={<WiHumidity />}
                label="Độ ẩm"
                value={`${currentData.humidity}%`}
              />
              <DetailItem
                icon={<FaCloud />}
                label="Mây"
                value={`${currentData.cloud}%`}
              />
              <DetailItem
                icon={<FaWind />}
                label="Gió"
                value={`${currentData.wind} km/h`}
              />
              <DetailItem
                icon={<LuCloudRain />}
                label="Mưa"
                value={`${currentData.precipitation} mm`}
              />
            </div>
          ) : (
            <p className="text-center text-gray-300">Không có dữ liệu</p>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
      <div className="text-white text-2xl">{icon}</div>
      <div>
        <p className="text-md font-bold text-white">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}