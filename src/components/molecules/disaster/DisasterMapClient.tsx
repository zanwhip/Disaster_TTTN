"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { DisasterEvent } from "@/types/disaster";
import "leaflet/dist/leaflet.css";

const iconProto = Object.getPrototypeOf(L.Icon.Default);
delete iconProto._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function DisasterMapClient({
  disasters,
}: {
  disasters: DisasterEvent[];
}) {
  return (
    <div className="relative z-0">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={1}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {disasters.map((d) => (
          <Marker
            key={d.id}
            position={[
              d.geometry[0].coordinates[1],
              d.geometry[0].coordinates[0],
            ]}
          >
            <Popup>
              <strong>{d.title}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
