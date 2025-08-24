"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

import WeatherChart from "./WeatherChart";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
import { useLocation } from "@/hooks/useLocationSearch";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { getWeatherStatus } from "@/utils/weather-status";
import { WEATHER_STATUS_ICONS } from "@/constants/images";

export default function WeatherPanel() {
  const [days, setDays] = useState(0);
  const {
    query,
    setQuery,
    coords,
    setCoords,
    suggestions,
    isSuggestLoading,
    currentAddress,
    isAddrLoading,
    fetchSuggestions,
  } = useLocation();

  const { data, isLoading: isWeatherLoading, error } = useWeatherForecast(
    coords?.lat || 0,
    coords?.lon || 0,
    days
  );

  const debouncedQuery = useDebouncedValue(query, 2000);

  useEffect(() => {
    if (debouncedQuery.trim().length > 2) {
      fetchSuggestions(debouncedQuery);
    }
  }, [debouncedQuery, fetchSuggestions]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      });
    }
  }, [setCoords]);

  const handleSelectSuggestion = (
    lat: number,
    lon: number,
    fullAddr: string
  ) => {
    setQuery(fullAddr);
    setCoords({ lat, lon });
  };

  if (!coords) return <p className="text-white">Đang lấy vị trí của bạn...</p>;
  if (isWeatherLoading)
    return <p className="text-white">Đang tải dự báo thời tiết...</p>;
  if (error)
    return <p className="text-red-300">Lỗi: {(error as Error).message}</p>;

  const currentData = data?.hourly
    ? {
        temperature: data.hourly.temperature_2m[0],
        precipitation: data.hourly.precipitation[0],
        wind: data.hourly.wind_speed_10m[0],
        humidity: data.hourly.relative_humidity_2m[0],
        cloud: data.hourly.cloudcover[0],
      }
    : null;

  const { status, background } = currentData
    ? getWeatherStatus(currentData)
    : { status: "Unknown", background: "" };

  return (
    <div
      className="relative shadow rounded-2xl overflow-hidden mt-6 text-white p-6"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center p-6">
        <div className="flex-1">
          <div className="flex flex-row text-lg font-bold mb-2 gap-2 items-center">
            <FaLocationDot />
            <span className="font-normal">
              {isAddrLoading
                ? "Đang xác định..."
                : currentAddress || "Không xác định"}
            </span>
          </div>
          <p className="text-5xl my-4 font-bold">{status}</p>
          <p className="mb-4">
            <span className="font-bold text-5xl">
              {currentData ? `${Math.round(currentData.temperature)}°C` : "--"}
            </span>
          </p>

          <p className="mb-4">
            <span className="font-semibold">
              <span>GMT+7 | </span>
              {new Date().toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </p>
        </div>

        <div className="flex-shrink-0 mt-4 md:mt-0">
          <Image
            src={WEATHER_STATUS_ICONS[status] || WEATHER_STATUS_ICONS["Sunny"]}
            alt={status}
            width={200}
            height={200}
            className="drop-shadow-lg"
          />
        </div>
      </div>

      <div className="relative mt-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-start">
          {/* Input tìm địa chỉ */}
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nhập địa chỉ..."
              className="border px-3 py-2 rounded-lg border-white w-full bg-white/60 text-black placeholder-gray-600"
            />
            {isSuggestLoading && (
              <p className="absolute top-full mt-1 text-sm text-gray-200">
                Đang tải gợi ý...
              </p>
            )}
            {suggestions.length > 0 && (
              <ul className="absolute border rounded mt-1 w-full max-h-48 overflow-auto z-10 shadow bg-white text-black">
                {suggestions.map((s, idx) => {
                  const fullAddr = Object.values(s.address).join(", ");
                  return (
                    <li
                      key={idx}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() =>
                        handleSelectSuggestion(
                          parseFloat(s.lat),
                          parseFloat(s.lon),
                          fullAddr
                        )
                      }
                    >
                      {fullAddr}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Select chọn chế độ ngày */}
          <div className="flex items-center">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="border border-white px-2 py-2 rounded bg-white/60 text-black"
            >
              <option value={0}>Hôm nay</option>
              <option value={7}>7 ngày tới</option>
              <option value={10}>10 ngày tới</option>
            </select>
          </div>
        </div>

        {/* Biểu đồ */}
        <div className="mt-4">
          {data && <WeatherChart hourly={data.hourly} days={days} />}
        </div>
      </div>
    </div>
  );
}
