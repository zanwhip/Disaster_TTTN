"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
});

type Props = {
  lat: number;
  lon: number;
};

export default function MapPreview({ lat, lon }: Props) {
  return <MapClient lat={lat} lon={lon} />;
}
