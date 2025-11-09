// Type definitions for Sadak-Sathi

export interface RoadIncident {
  id?: string;
  coordinate?: [number, number];
  highwayName?: {
    en?: string;
    ne?: string;
    [key: string]: string | undefined;
  };
  place?: {
    en?: string;
    ne?: string;
    [key: string]: string | undefined;
  };
  status?: "Blocked" | "One-Lane" | "Resumed" | "Normal";
  chainage?: number | string;
  description?: string;
  reportedAt?: string;
  severity?: "Low" | "Medium" | "High" | "Critical";
}

export interface WeatherData {
  location: [number, number];
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  forecast?: string;
}

export interface TrafficData {
  roadId: string;
  coordinates: [number, number][];
  level: "Clear" | "Light" | "Moderate" | "Heavy" | "Standstill";
  speed: number;
  color: string;
}

export interface POIData {
  id: string;
  name: {
    en: string;
    ne?: string;
    [key: string]: string | undefined;
  };
  type: string;
  category: string;
  coordinate: [number, number];
  icon: string;
  description?: string;
  rating?: number;
}

export interface HighwayData {
  file: string;
  name: string;
  code?: string;
}
