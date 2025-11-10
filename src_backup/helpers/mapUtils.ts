// Map utility functions for Sadak-Sathi
import L from 'leaflet';
import axios from 'axios';
import type { WeatherData, TrafficData, POIData } from '../types';
import { translateObject, tDynamic } from '../i18n/translator';

// Clear all custom map layers
export function clearMapLayers(map: L.Map) {
  map.eachLayer((layer) => {
    // Keep only the base tile layer and GeoJSON layers
    if ((layer as any)._url || (layer as any)._layers) {
      return; // Skip base tiles and layer groups
    }
    map.removeLayer(layer);
  });
}

// Add weather markers with real API integration
export async function addWeatherMarkers(
  map: L.Map,
  language: string,
  markersRef: React.MutableRefObject<L.Marker[]>
) {
  // Clear existing markers
  markersRef.current.forEach(m => m.remove());
  markersRef.current = [];

  // Major cities in Nepal to fetch weather for
  const cities = [
    { name: 'Kathmandu', lat: 27.7172, lng: 85.3240 },
    { name: 'Pokhara', lat: 28.2096, lng: 83.9856 },
    { name: 'Biratnagar', lat: 26.4525, lng: 87.2718 },
    { name: 'Bharatpur', lat: 27.6710, lng: 84.4298 },
    { name: 'Dharan', lat: 26.8124, lng: 87.2847 }
  ];

  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  for (const city of cities) {
    try {
      // Try to fetch real weather data
      if (apiKey) {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&units=metric&appid=${apiKey}`
        );
        const data = res.data;

        const weatherIcon = getWeatherIcon(data.weather[0].main);
        const marker = L.marker([city.lat, city.lng], {
          icon: L.divIcon({
            className: 'weather-marker',
            html: `<div class="bg-white rounded-full shadow-lg p-2 text-center border-2 border-blue-200">
              <div class="text-2xl">${weatherIcon}</div>
              <div class="text-sm font-bold">${Math.round(data.main.temp)}°C</div>
            </div>`,
            iconSize: [60, 60]
          })
        });

        marker.bindPopup(`
          <div class="p-2">
            <div class="text-lg font-bold">${city.name}</div>
            <div class="text-md mb-2">${data.weather[0].description}</div>
            <div class="text-sm">🌡️ ${Math.round(data.main.temp)}°C (feels like ${Math.round(data.main.feels_like)}°C)</div>
            <div class="text-sm">💧 Humidity: ${data.main.humidity}%</div>
            <div class="text-sm">💨 Wind: ${data.wind.speed} m/s</div>
            <div class="text-sm">👁️ Visibility: ${(data.visibility / 1000).toFixed(1)} km</div>
          </div>
        `);

        marker.addTo(map);
        markersRef.current.push(marker);
      } else {
        // Fallback to mock data
        throw new Error('No API key configured');
      }
    } catch (err) {
      console.warn(`Weather fetch failed for ${city.name}, using mock data:`, err);
      
      // Fallback mock data
      const mockTemp = 20 + Math.random() * 10;
      const mockIcon = ['☀️', '⛅', '🌤️', '☁️'][Math.floor(Math.random() * 4)];
      
      const marker = L.marker([city.lat, city.lng], {
        icon: L.divIcon({
          className: 'weather-marker',
          html: `<div class="bg-white rounded-full shadow-lg p-2 text-center">
            <div class="text-2xl">${mockIcon}</div>
            <div class="text-sm font-bold">${Math.round(mockTemp)}°C</div>
          </div>`,
          iconSize: [60, 60]
        })
      });

      marker.bindPopup(`
        <div class="p-2">
          <div class="text-lg font-bold">${city.name}</div>
          <div class="text-sm text-slate-500">Weather data unavailable</div>
        </div>
      `);

      marker.addTo(map);
      markersRef.current.push(marker);
    }
  }
}

// Helper function to get weather icon
function getWeatherIcon(condition: string): string {
  const icons: Record<string, string> = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '🌨️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️',
    'Dust': '💨',
    'Sand': '💨',
    'Smoke': '💨'
  };
  return icons[condition] || '🌤️';
}

// Add traffic layers with real API integration
export async function addTrafficLayers(
  map: L.Map,
  language: string,
  layersRef: React.MutableRefObject<L.Layer[]>
) {
  // Clear existing layers
  layersRef.current.forEach(l => l.remove());
  layersRef.current = [];

  try {
    // Try TomTom Traffic Flow API
    const tomtomKey = import.meta.env.VITE_TOMTOM_API_KEY;
    
    if (tomtomKey) {
      // Add TomTom traffic tile layer
      const trafficLayer = L.tileLayer(
        `https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?key=${tomtomKey}`,
        {
          attribution: '© TomTom',
          opacity: 0.6,
          maxZoom: 18
        }
      );
      trafficLayer.addTo(map);
      layersRef.current.push(trafficLayer);
    } else {
      throw new Error('No TomTom API key');
    }
  } catch (err) {
    console.warn('Traffic API failed, using mock data:', err);
    
    // Fallback: Mock traffic data for major routes
    const trafficData: TrafficData[] = [
      {
        roadId: 'KTM-PKR-1',
        coordinates: [
          [27.7172, 85.3240],
          [27.8, 85.0],
          [28.0, 84.5],
          [28.2096, 83.9856]
        ],
        level: 'Moderate',
        speed: 45,
        color: '#FFA500'
      },
      {
        roadId: 'KTM-BRT-1',
        coordinates: [
          [27.7172, 85.3240],
          [27.5, 86.0],
          [26.8, 86.8],
          [26.4525, 87.2718]
        ],
        level: 'Light',
        speed: 60,
        color: '#90EE90'
      },
      {
        roadId: 'KTM-BTR-1',
        coordinates: [
          [27.7172, 85.3240],
          [27.6710, 84.4298],
          [27.0, 84.0]
        ],
        level: 'Heavy',
        speed: 25,
        color: '#FF0000'
      }
    ];

    trafficData.forEach(traffic => {
      const polyline = L.polyline(traffic.coordinates, {
        color: traffic.color,
        weight: 6,
        opacity: 0.7,
        dashArray: '10, 10'
      });

      polyline.bindPopup(`
        <div class="p-2">
          <div class="font-bold text-lg mb-1">Traffic: ${traffic.level}</div>
          <div class="text-sm">🚗 Average Speed: ${traffic.speed} km/h</div>
          <div class="text-sm">🛣️ Route: ${traffic.roadId}</div>
        </div>
      `);

      polyline.addTo(map);
      layersRef.current.push(polyline);
    });
  }
}

// Add POI markers with multiple data sources
export async function addPOIMarkers(
  map: L.Map,
  language: string,
  markersRef: React.MutableRefObject<L.Marker[]>
) {
  // Clear existing markers
  markersRef.current.forEach(m => m.remove());
  markersRef.current = [];

  // Define POI data sources
  const poiSources = [
    { 
      url: import.meta.env.VITE_WAZE_FEED_URL, 
      type: 'waze',
      enabled: !!import.meta.env.VITE_WAZE_FEED_URL 
    },
    { 
      url: import.meta.env.VITE_TOMTOM_API_KEY 
        ? `https://api.tomtom.com/search/2/poiSearch.json?key=${import.meta.env.VITE_TOMTOM_API_KEY}&lat=27.7172&lon=85.3240&radius=50000&categorySet=7315`
        : null,
      type: 'tomtom',
      enabled: !!import.meta.env.VITE_TOMTOM_API_KEY
    },
    { 
      url: '/data/openPOIs.json', 
      type: 'open',
      enabled: true 
    }
  ];

  // Fallback POI data
  const fallbackPOIs: POIData[] = [
    {
      id: 'poi-1',
      name: { en: 'Pashupatinath Temple', ne: 'पशुपतिनाथ मन्दिर' },
      type: 'temple',
      category: 'religious',
      coordinate: [27.7106, 85.3489],
      icon: '🕉️',
      rating: 4.8
    },
    {
      id: 'poi-2',
      name: { en: 'Boudhanath Stupa', ne: 'बौद्धनाथ स्तूप' },
      type: 'temple',
      category: 'religious',
      coordinate: [27.7215, 85.3622],
      icon: '☸️',
      rating: 4.7
    },
    {
      id: 'poi-3',
      name: { en: 'Tribhuvan International Airport', ne: 'त्रिभुवन अन्तर्राष्ट्रिय विमानस्थल' },
      type: 'airport',
      category: 'transport',
      coordinate: [27.6966, 85.3591],
      icon: '✈️',
      rating: 3.5
    },
    {
      id: 'poi-4',
      name: { en: 'Swayambhunath Stupa', ne: 'स्वयम्भूनाथ स्तूप' },
      type: 'temple',
      category: 'religious',
      coordinate: [27.7149, 85.2906],
      icon: '🙏',
      rating: 4.6
    },
    {
      id: 'poi-5',
      name: { en: 'Kathmandu Durbar Square', ne: 'काठमाडौं दरबार स्क्वायर' },
      type: 'heritage',
      category: 'heritage',
      coordinate: [27.7045, 85.3077],
      icon: '🏛️',
      rating: 4.5
    },
    {
      id: 'poi-6',
      name: { en: 'Garden of Dreams', ne: 'सपनाको बगैंचा' },
      type: 'park',
      category: 'recreation',
      coordinate: [27.7143, 85.3161],
      icon: '🌳',
      rating: 4.4
    }
  ];

  let poisLoaded = false;

  // Try to load from APIs
  for (const src of poiSources) {
    if (!src.enabled || !src.url) continue;

    try {
      const res = await axios.get(src.url, { timeout: 5000 });
      const data = Array.isArray(res.data) ? res.data : (res.data?.results || []);
      
      if (data.length > 0) {
        data.forEach((poi: any) => {
          const coord = poi.coordinate || 
                       (poi.position ? [poi.position.lat, poi.position.lon] : null) ||
                       [poi.lat, poi.lng];
          
          if (!coord || !coord[0] || !coord[1]) return;

          const name = poi.name || poi.title || poi.poi?.name || 'POI';
          const category = poi.category || poi.type || 'general';
          const icon = getPOIIcon(category);

          const marker = L.marker(coord as [number, number], {
            icon: L.divIcon({
              className: 'poi-marker',
              html: `<div class="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full shadow-lg p-2 text-center text-xl border-2 border-white">
                ${icon}
              </div>`,
              iconSize: [40, 40]
            })
          });

          const translatedName = typeof name === 'string' ? name : translateObject(name, language);
          marker.bindPopup(`
            <div class="p-2">
              <div class="text-lg font-bold">${translatedName}</div>
              <div class="text-sm capitalize text-slate-600">${category}</div>
              ${poi.rating ? `<div class="text-sm">⭐ ${poi.rating}/5</div>` : ''}
              ${poi.address ? `<div class="text-xs text-slate-500 mt-1">${poi.address}</div>` : ''}
            </div>
          `);

          marker.addTo(map);
          markersRef.current.push(marker);
        });
        
        poisLoaded = true;
        console.log(`Loaded ${data.length} POIs from ${src.type}`);
      }
    } catch (err) {
      console.warn(`POI fetch failed (${src.type}):`, (err as any)?.message || err);
    }
  }

  // Use fallback data if no APIs succeeded
  if (!poisLoaded) {
    console.log('Using fallback POI data');
    fallbackPOIs.forEach(poi => {
      const marker = L.marker(poi.coordinate, {
        icon: L.divIcon({
          className: 'poi-marker',
          html: `<div class="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full shadow-lg p-2 text-center text-xl border-2 border-white">
            ${poi.icon}
          </div>`,
          iconSize: [40, 40]
        })
      });

      const name = translateObject(poi.name, language);
      marker.bindPopup(`
        <div class="p-2">
          <div class="text-lg font-bold">${name}</div>
          <div class="text-sm capitalize text-slate-600">${poi.category}</div>
          ${poi.rating ? `<div class="text-sm">⭐ ${poi.rating}/5</div>` : ''}
        </div>
      `);

      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }
}

// Helper function to get POI icon based on category
function getPOIIcon(category: string): string {
  const icons: Record<string, string> = {
    'religious': '🕉️',
    'temple': '🙏',
    'mosque': '🕌',
    'church': '⛪',
    'airport': '✈️',
    'transport': '🚉',
    'hotel': '🏨',
    'restaurant': '🍽️',
    'cafe': '☕',
    'shopping': '🛍️',
    'hospital': '🏥',
    'pharmacy': '💊',
    'fuel': '⛽',
    'parking': '🅿️',
    'atm': '🏧',
    'bank': '🏦',
    'police': '👮',
    'park': '🌳',
    'recreation': '🎭',
    'heritage': '🏛️',
    'museum': '🏛️',
    'school': '🏫',
    'university': '🎓',
    'general': '📍'
  };
  
  const lowerCategory = category.toLowerCase();
  for (const key in icons) {
    if (lowerCategory.includes(key)) {
      return icons[key];
    }
  }
  return icons['general'];
}

// Create custom icon for incidents
export function createIncidentIcon(status: string): L.DivIcon {
  const colors = {
    'Blocked': '#ff0000',
    'One-Lane': '#ff9900',
    'Resumed': '#28a745',
    'Normal': '#007bff'
  };

  const color = colors[status as keyof typeof colors] || '#007bff';

  return L.divIcon({
    className: 'incident-marker',
    html: `<div class="bg-white rounded-full shadow-xl border-4 p-1" style="border-color: ${color}">
      <div class="w-3 h-3 rounded-full" style="background-color: ${color}"></div>
    </div>`,
    iconSize: [24, 24]
  });
}
