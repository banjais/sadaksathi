import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// Types for your properties (adjust as needed)
interface ScriptProps {
  DHM_API_KEY: string;
  TOMTOM_API_KEY: string;
  WAZE_JSON: string;
  // ... other props
}

export const MapView = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [scriptProps, setScriptProps] = useState<ScriptProps | null>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  // Load script-properties.json
  useEffect(() => {
    fetch("/script-properties.json")
      .then((res) => res.json())
      .then((data) => setScriptProps(data))
      .catch((err) =>
        console.error("Error loading script-properties.json:", err)
      );
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance) return;

    const map = L.map(mapRef.current).setView([28.3949, 84.1240], 7); // Nepal center
    setMapInstance(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [mapRef, mapInstance]);

  // Load GeoJSON layers
  useEffect(() => {
    if (!mapInstance) return;

    const geoJsonLayers: L.GeoJSON[] = [];

    const loadGeoJson = async (url: string, name: string) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        const layer = L.geoJSON(data, {
          style: { color: "blue", weight: 2 },
          onEachFeature: (feature, layer) => {
            layer.bindPopup(
              `<b>${name}</b><br>${feature.properties?.name || ""}`
            );
          },
        }).addTo(mapInstance);
        geoJsonLayers.push(layer);
      } catch (err) {
        console.error(`Failed to load ${name}:`, err);
      }
    };

    // Highways
    loadGeoJson("/index.json", "Highways");

    // Local authorities
    loadGeoJson("/index_district.json", "Local Authorities");

    // Provinces
    loadGeoJson("/province.geojson", "Provinces");

    return () => {
      geoJsonLayers.forEach((layer) => mapInstance.removeLayer(layer));
    };
  }, [mapInstance]);

  // Fetch traffic incidents (TomTom)
  useEffect(() => {
    if (!mapInstance || !scriptProps?.TOMTOM_API_KEY) return;

    const fetchTomTom = async () => {
      try {
        const res = await fetch(
          `https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/10/json?key=${scriptProps.TOMTOM_API_KEY}`
        );
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        // TODO: parse data and add markers
        console.log("TomTom traffic:", data);
      } catch (err) {
        console.error("Failed to fetch TomTom traffic:", err);
      }
    };

    fetchTomTom();
  }, [mapInstance, scriptProps]);

  // Waze incidents (requires server proxy due to CORS)
  useEffect(() => {
    if (!mapInstance || !scriptProps?.WAZE_JSON) return;

    const fetchWaze = async () => {
      try {
        const res = await fetch("/api/waze"); // fetch from your own server/proxy
        const data = await res.json();
        // TODO: parse data and add markers
        console.log("Waze incidents:", data);
      } catch (err) {
        console.error("Failed to fetch Waze incidents:", err);
      }
    };

    fetchWaze();
  }, [mapInstance, scriptProps]);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
};
