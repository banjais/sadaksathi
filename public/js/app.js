// /public/js/app.js

// -------------------------
// CONFIG
// -------------------------
const API_URL = "/api/data";       // server endpoint for real-time fetch
const FALLBACK_JSON = "/data/merged.json"; // fallback offline merged data
const REFRESH_INTERVAL = 30_000;   // 30 seconds auto-refresh
const MAP_CONTAINER = "map";       // div id for Leaflet map

// -------------------------
// GLOBALS
// -------------------------
let map, markersLayer;

// -------------------------
// INITIALIZE MAP
// -------------------------
function initMap() {
  map = L.map(MAP_CONTAINER).setView([27.7172, 85.3240], 7); // Kathmandu center

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  markersLayer = L.layerGroup().addTo(map);
}

// -------------------------
// FETCH DATA
// -------------------------
async function fetchData() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const data = await res.json();
    console.log("✅ Fetched live data from server:", data);
    updateMap(data);
  } catch (err) {
    console.warn("⚠ Failed to fetch server data, falling back to merged.json:", err.message);
    try {
      const fallbackRes = await fetch(FALLBACK_JSON);
      const fallbackData = await fallbackRes.json();
      console.log("ℹ Using fallback merged.json data:", fallbackData);
      updateMap(fallbackData);
    } catch (fallbackErr) {
      console.error("❌ Failed to load fallback data:", fallbackErr.message);
    }
  }
}

// -------------------------
// UPDATE MAP MARKERS
// -------------------------
function updateMap(data) {
  markersLayer.clearLayers();

  // Example: Road closures from merged data
  if (data.wazeJSON?.alerts) {
    data.wazeJSON.alerts.forEach(alert => {
      const { x, y } = alert.location || {};
      if (x && y) {
        const marker = L.marker([y, x]);
        marker.bindPopup(`<b>${alert.type}</b><br>${alert.city || ""}<br>${alert.reportDescription || ""}`);
        markersLayer.addLayer(marker);
      }
    });
  }

  // Example: POIs (if any)
  if (data.pois) {
    data.pois.forEach(poi => {
      const marker = L.circleMarker([poi.lat, poi.lon], { radius: 6, color: "blue" });
      marker.bindPopup(`<b>${poi.name}</b><br>${poi.type || ""}`);
      markersLayer.addLayer(marker);
    });
  }

  console.log("ℹ Map updated with current data.");
}

// -------------------------
// INIT
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById(MAP_CONTAINER)) {
    const mapDiv = document.createElement("div");
    mapDiv.id = MAP_CONTAINER;
    mapDiv.style.width = "100%";
    mapDiv.style.height = "500px";
    document.body.appendChild(mapDiv);
  }

  initMap();
  fetchData();
  setInterval(fetchData, REFRESH_INTERVAL);
});
