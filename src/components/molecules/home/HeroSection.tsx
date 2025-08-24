"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/atoms/SearchBar";
import { IMAGES } from "@/constants/images";

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 flex items-center justify-start">
      <Image
        src={IMAGES.heroBanner[0]}
        alt="Disaster Monitoring Hero"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="flex flex-col relative text-white max-w-4xl px-4 md:px-12 gap-y-6">
        <div
          className="flex flex-col p-6 md:p-12 gap-y-4 bg-white/10 backdrop-blur-md"
          style={{
            clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)",
          }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-snug">
            Disaster AWARE
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-semibold tracking-wide uppercase text-gray-100">
            The #1 award-winning early warning and risk intelligence technology
            trusted by disaster managers worldwide
          </p>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed text-gray-200">
            Providing near real-time, AI-enhanced hazard information for 28
            natural, man-made, and biological hazard types as well as
            customizable Smart Alerts to protect your stationary and moving
            assets.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4">
          <Link href="/disaster">
            <button className="w-full sm:w-auto px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-bold rounded-lg shadow-lg transition">
              Get Disaster
            </button>
          </Link>

          <Link href="/post">
            <button className="w-full sm:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-lg font-bold rounded-lg shadow-lg transition">
              Post Disaster
            </button>
          </Link>
        </div>

        <div className="mt-6">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
