"use client";

import FeatureSection from "@/components/molecules/home/FeatureSection";
import HeroSection from "@/components/molecules/home/HeroSection";
import WeatherPanel from "@/components/molecules/home/WeatherPanel";
import DisasterMap from "@/components/molecules/disaster/DisasterMap";
import { useDisasters } from "@/hooks/useDisasters";
import { useMemo } from "react";
import { DisasterEvent } from "@/types/disaster";
import Link from "next/link";
import ProcessSteps from "@/components/molecules/home/StreamlineSection";

export default function HomePage() {
  const { data } = useDisasters();

  const disasters: DisasterEvent[] = useMemo(() => {
    const map = new Map<string, DisasterEvent>();
    data?.pages.forEach((page) =>
      page.events.forEach((event) => {
        if (!map.has(event.id)) map.set(event.id, event);
      })
    );
    return Array.from(map.values());
  }, [data]);

  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <div className="md:px-20 px-0">
        {/* Section 1 */}
        <div id="section-weather">
          <WeatherPanel />
        </div>

        {/* Section 2 */}

        <div id="section-alerts" className="my-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Bản đồ thiên tai</h2>
            <Link
              href="/disaster"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Xem chi tiết →
            </Link>
          </div>

          <DisasterMap disasters={disasters} />
        </div>

        {/* Section 3 */}
        <div id="section-report"></div>

        {/* Section 4 */}
        <div id="section-guides">
          <ProcessSteps />
        </div>
      </div>
    </div>
  );
}
