import React, { useEffect, useRef, useState } from "react";
import L, { LatLngExpression, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import { Button } from "./ui/button";
import { Navigation, MapPin } from "lucide-react";

interface POI {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "fuel" | "hotel" | "restaurant" | "hospital";
}

interface MapViewProps {
  pois?: POI[];
}

export function MapView({ pois = [] }: MapViewProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [27.7172, 85.3240],
      zoom: 8,
      minZoom: 5,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);

    map.locate({ setView: true, maxZoom: 16, watch: true });
    map.on("locationfound", (e) => {
      setCurrentLocation([e.latitude, e.longitude]);
      L.circle([e.latitude, e.longitude], { radius: 10, color: "blue" }).addTo(map);
    });
    map.on("locationerror", () => console.warn("Unable to retrieve current location"));

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!mapRef.current || pois.length === 0) return;
    const markerCluster = (L as any).markerClusterGroup();
    pois.forEach((poi) => {
      const marker = L.marker([poi.lat, poi.lng], {
        title: poi.name,
        icon: L.divIcon({
          html: `<div class="text-white bg-red-500 p-1 rounded-full shadow-lg"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg></div>`,
          className: "",
          iconSize: [24, 24],
        }),
      });
      marker.bindPopup(`<strong>${poi.name}</strong><br/>Type: ${poi.type}`);
      markerCluster.addLayer(marker);
    });
    mapRef.current.addLayer(markerCluster);
  }, [pois]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute bottom-24 right-4 flex flex-col gap-2 z-50">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full p-3 shadow-lg"
          onClick={() => mapRef.current && currentLocation && mapRef.current.setView(currentLocation, 16)}
        >
          <MapPin className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full p-3 shadow-lg"
          onClick={() => alert("Route Finder panel")}
        >
          <Navigation className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
