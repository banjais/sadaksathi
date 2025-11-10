export type RouteIssueType = 
  | 'accident' 
  | 'roadblock' 
  | 'heavy_traffic' 
  | 'construction' 
  | 'weather' 
  | 'protest'
  | 'landslide';

export type TrafficLevel = 'clear' | 'light' | 'moderate' | 'heavy' | 'standstill';

export interface RouteIssue {
  id: string;
  type: RouteIssueType;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  reportedAt: Date;
  estimatedClearTime?: Date;
  affectedRoads: string[];
  delayMinutes: number;
}

export interface TrafficSegment {
  id: string;
  roadName: string;
  startPoint: { lat: number; lng: number };
  endPoint: { lat: number; lng: number };
  trafficLevel: TrafficLevel;
  speed: number; // km/h
  delayMinutes: number;
}

export interface WeatherCondition {
  temperature: number;
  condition: 'clear' | 'cloudy' | 'rain' | 'storm' | 'fog' | 'snow';
  windSpeed: number;
  visibility: number; // km
  humidity: number;
  warnings: string[];
}

export interface WeatherForecast {
  date: Date;
  hourly: {
    time: string;
    temperature: number;
    condition: string;
    precipitation: number; // percentage
  }[];
}

export interface RouteAttraction {
  id: string;
  name: string;
  type: 'temple' | 'monument' | 'viewpoint' | 'restaurant' | 'hotel' | 'gas' | 'hospital';
  location: { lat: number; lng: number };
  rating?: number;
  distanceFromRoute: number; // meters
  stopDuration?: number; // minutes if user wants to stop
  description?: string;
  image?: string;
}

export interface RouteAlternative {
  id: string;
  name: string;
  description: string;
  distance: number; // km
  duration: number; // minutes
  durationWithTraffic: number; // minutes considering current traffic
  
  // Why this route
  advantages: string[];
  disadvantages: string[];
  
  // Route details
  viaRoads: string[];
  waypoints: { lat: number; lng: number; name: string }[];
  
  // Traffic and issues
  trafficSegments: TrafficSegment[];
  issues: RouteIssue[];
  averageTraffic: TrafficLevel;
  
  // Points of interest
  attractions: RouteAttraction[];
  
  // Comparisons
  timeDifference: number; // minutes compared to fastest
  distanceDifference: number; // km compared to shortest
  
  // Recommendation
  recommended: boolean;
  recommendationReason?: string;
  
  // Weather along route
  weatherConditions: WeatherCondition[];
  
  // Tolls and costs
  tolls?: number;
  fuelCost?: number;
}

export const getTrafficColor = (level: TrafficLevel): string => {
  switch (level) {
    case 'clear': return '#22c55e'; // green
    case 'light': return '#84cc16'; // lime
    case 'moderate': return '#eab308'; // yellow
    case 'heavy': return '#f97316'; // orange
    case 'standstill': return '#ef4444'; // red
  }
};

export const getTrafficLabel = (level: TrafficLevel): string => {
  switch (level) {
    case 'clear': return 'Clear';
    case 'light': return 'Light Traffic';
    case 'moderate': return 'Moderate Traffic';
    case 'heavy': return 'Heavy Traffic';
    case 'standstill': return 'Standstill';
  }
};

export const getIssueIcon = (type: RouteIssueType): string => {
  switch (type) {
    case 'accident': return '🚗💥';
    case 'roadblock': return '🚧';
    case 'heavy_traffic': return '🚦';
    case 'construction': return '👷';
    case 'weather': return '🌧️';
    case 'protest': return '📢';
    case 'landslide': return '⛰️';
  }
};

export const getIssueColor = (severity: string): string => {
  switch (severity) {
    case 'low': return 'text-yellow-600 dark:text-yellow-400';
    case 'medium': return 'text-orange-600 dark:text-orange-400';
    case 'high': return 'text-red-600 dark:text-red-400';
    case 'critical': return 'text-red-700 dark:text-red-300';
    default: return 'text-slate-600 dark:text-slate-400';
  }
};

export const getWeatherIcon = (condition: string): string => {
  switch (condition.toLowerCase()) {
    case 'clear': return '☀️';
    case 'cloudy': return '☁️';
    case 'rain': return '🌧️';
    case 'storm': return '⛈️';
    case 'fog': return '🌫️';
    case 'snow': return '❄️';
    default: return '🌤️';
  }
};

// Mock route alternatives generator
export const generateRouteAlternatives = (
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  issues: RouteIssue[]
): RouteAlternative[] => {
  // This would normally call a routing API
  // For demo, we generate 3 alternatives
  
  const baseDistance = Math.sqrt(
    Math.pow(destination.lat - origin.lat, 2) + 
    Math.pow(destination.lng - origin.lng, 2)
  ) * 100; // Rough km calculation

  return [
    {
      id: 'route-1',
      name: 'Fastest Route',
      description: 'Via Prithvi Highway',
      distance: baseDistance,
      duration: Math.round(baseDistance * 1.5),
      durationWithTraffic: Math.round(baseDistance * 2),
      advantages: ['Shortest distance', 'Well maintained road', 'Multiple rest stops'],
      disadvantages: ['May have moderate traffic during peak hours'],
      viaRoads: ['Prithvi Highway', 'Tribhuvan Highway'],
      waypoints: [],
      trafficSegments: [
        {
          id: 'seg-1',
          roadName: 'Prithvi Highway',
          startPoint: origin,
          endPoint: destination,
          trafficLevel: 'moderate',
          speed: 45,
          delayMinutes: 15
        }
      ],
      issues: issues.filter(i => i.severity !== 'critical'),
      averageTraffic: 'moderate',
      attractions: [
        {
          id: 'attr-1',
          name: 'Manakamana Temple',
          type: 'temple',
          location: { lat: 27.9, lng: 84.8 },
          rating: 4.5,
          distanceFromRoute: 2000,
          description: 'Famous Hindu temple'
        }
      ],
      timeDifference: 0,
      distanceDifference: 0,
      recommended: true,
      recommendationReason: 'Fastest route with acceptable traffic',
      weatherConditions: [
        {
          temperature: 25,
          condition: 'clear',
          windSpeed: 10,
          visibility: 10,
          humidity: 60,
          warnings: []
        }
      ],
      tolls: 200,
      fuelCost: 800
    },
    {
      id: 'route-2',
      name: 'Scenic Route',
      description: 'Via Mountain Road',
      distance: baseDistance * 1.2,
      duration: Math.round(baseDistance * 2),
      durationWithTraffic: Math.round(baseDistance * 2.2),
      advantages: ['Beautiful scenery', 'Less traffic', 'Multiple viewpoints', 'Fresh air'],
      disadvantages: ['Longer distance', 'Narrow roads in some sections', 'Limited facilities'],
      viaRoads: ['Mountain Road', 'Valley Road'],
      waypoints: [],
      trafficSegments: [
        {
          id: 'seg-2',
          roadName: 'Mountain Road',
          startPoint: origin,
          endPoint: destination,
          trafficLevel: 'light',
          speed: 35,
          delayMinutes: 5
        }
      ],
      issues: [],
      averageTraffic: 'light',
      attractions: [
        {
          id: 'attr-2',
          name: 'Himalayan Viewpoint',
          type: 'viewpoint',
          location: { lat: 28.0, lng: 84.9 },
          rating: 5,
          distanceFromRoute: 500,
          stopDuration: 15,
          description: 'Stunning mountain views'
        },
        {
          id: 'attr-3',
          name: 'Mountain Restaurant',
          type: 'restaurant',
          location: { lat: 28.1, lng: 85.0 },
          rating: 4,
          distanceFromRoute: 100
        }
      ],
      timeDifference: 20,
      distanceDifference: baseDistance * 0.2,
      recommended: false,
      weatherConditions: [
        {
          temperature: 20,
          condition: 'cloudy',
          windSpeed: 15,
          visibility: 8,
          humidity: 70,
          warnings: ['Possible fog in morning']
        }
      ],
      tolls: 0,
      fuelCost: 900
    },
    {
      id: 'route-3',
      name: 'Bypass Route',
      description: 'Via Ring Road (Avoids City Center)',
      distance: baseDistance * 1.1,
      duration: Math.round(baseDistance * 1.8),
      durationWithTraffic: Math.round(baseDistance * 1.9),
      advantages: ['Avoids city traffic', 'Consistent speed', 'Good road condition'],
      disadvantages: ['Slightly longer', 'Fewer facilities', 'Toll charges'],
      viaRoads: ['Ring Road', 'Bypass Road'],
      waypoints: [],
      trafficSegments: [
        {
          id: 'seg-3',
          roadName: 'Ring Road',
          startPoint: origin,
          endPoint: destination,
          trafficLevel: 'clear',
          speed: 60,
          delayMinutes: 0
        }
      ],
      issues: [],
      averageTraffic: 'clear',
      attractions: [
        {
          id: 'attr-4',
          name: 'Gas Station',
          type: 'gas',
          location: { lat: 27.8, lng: 85.1 },
          distanceFromRoute: 50
        }
      ],
      timeDifference: 10,
      distanceDifference: baseDistance * 0.1,
      recommended: false,
      weatherConditions: [
        {
          temperature: 26,
          condition: 'clear',
          windSpeed: 8,
          visibility: 15,
          humidity: 55,
          warnings: []
        }
      ],
      tolls: 500,
      fuelCost: 850
    }
  ];
};

// Generate mock weather forecast
export const generateWeatherForecast = (days: number = 3): WeatherForecast[] => {
  const forecasts: WeatherForecast[] = [];
  const conditions = ['clear', 'cloudy', 'rain'];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    const hourly = [];
    for (let h = 6; h <= 20; h += 3) {
      hourly.push({
        time: `${h}:00`,
        temperature: 20 + Math.random() * 10,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        precipitation: Math.random() * 100
      });
    }
    
    forecasts.push({
      date,
      hourly
    });
  }
  
  return forecasts;
};

// Calculate time and distance savings
export const compareRoutes = (
  route1: RouteAlternative,
  route2: RouteAlternative
) => {
  return {
    timeSaved: route1.durationWithTraffic - route2.durationWithTraffic,
    distanceSaved: route1.distance - route2.distance,
    costSaved: (route1.tolls || 0) + (route1.fuelCost || 0) - 
               ((route2.tolls || 0) + (route2.fuelCost || 0))
  };
};
