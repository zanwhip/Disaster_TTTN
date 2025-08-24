"use client";

import dynamic from "next/dynamic";
import { DisasterEvent } from "@/types/disaster";

const DisasterMapClient = dynamic(() => import("./DisasterMapClient"), {
  ssr: false,
});

export default function DisasterMap({ disasters }: { disasters: DisasterEvent[] }) {
  return <DisasterMapClient disasters={disasters} />;
}
