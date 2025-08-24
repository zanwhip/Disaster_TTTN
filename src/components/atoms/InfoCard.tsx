"use client";

import Image from "next/image";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import {  InfoCardProps } from "@/types/weather";

export default function InfoCard({
  label,
  value,
  icon,
  data,
  dataKey,
  color,
}: InfoCardProps) {
  return (
    <div className="bg-black/20 flex flex-col items-center justify-center gap-4 text-white rounded-xl p-6 w-full">
      <div className="flex flex-row items-center gap-4">
        <Image src={icon} alt={label} width={50} height={50} />
        <div>
          <p className="text-lg font-semibold">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
      <div className="w-full h-16 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
