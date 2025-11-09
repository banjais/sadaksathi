export type InterestGroup = 
  | 'driver'
  | 'tourist'
  | 'parent'
  | 'commuter'
  | 'business'
  | 'emergency_responder';

export type InfoCard = 
  | 'weather'
  | 'traffic'
  | 'road_status'
  | 'incidents'
  | 'nearby_services'
  | 'family_tracking'
  | 'speed_camera'
  | 'fuel_prices';

export interface UserInfoPreferences {
  interestGroups: InterestGroup[];
  enabledCards: InfoCard[];
  autoShowInModes: {
    navigation: InfoCard[];
    traffic: InfoCard[];
    nearby: InfoCard[];
    drive: InfoCard[];
  };
  compactMode: boolean;
}

// Default preferences for different interest groups
export const interestGroupDefaults: Record<InterestGroup, InfoCard[]> = {
  driver: ['traffic', 'road_status', 'fuel_prices', 'speed_camera'],
  tourist: ['weather', 'nearby_services', 'incidents'],
  parent: ['family_tracking', 'speed_camera', 'incidents', 'weather'],
  commuter: ['traffic', 'road_status', 'incidents'],
  business: ['traffic', 'road_status', 'nearby_services'],
  emergency_responder: ['incidents', 'road_status', 'traffic', 'weather']
};

export const interestGroupInfo = {
  driver: {
    name: 'Driver',
    icon: '🚗',
    description: 'Daily driving, routes, fuel info'
  },
  tourist: {
    name: 'Tourist',
    icon: '🗺️',
    description: 'Attractions, weather, places of interest'
  },
  parent: {
    name: 'Parent',
    icon: '👨‍👩‍👧‍👦',
    description: 'Family safety, tracking, alerts'
  },
  commuter: {
    name: 'Commuter',
    icon: '🚌',
    description: 'Traffic, fastest routes, updates'
  },
  business: {
    name: 'Business',
    icon: '💼',
    description: 'Efficient travel, services, routes'
  },
  emergency_responder: {
    name: 'Emergency',
    icon: '🚨',
    description: 'Critical alerts, incidents, access'
  }
};

export const infoCardDetails = {
  weather: { name: 'Weather', icon: '🌤️', description: 'Temperature, conditions, alerts' },
  traffic: { name: 'Traffic', icon: '🚦', description: 'Live traffic updates' },
  road_status: { name: 'Road Status', icon: '🛣️', description: 'Highway conditions' },
  incidents: { name: 'Incidents', icon: '⚠️', description: 'Accidents, blockages' },
  nearby_services: { name: 'Nearby', icon: '📍', description: 'Gas, food, hotels' },
  family_tracking: { name: 'Family', icon: '👥', description: 'Track family members' },
  speed_camera: { name: 'Cameras', icon: '📹', description: 'Speed camera alerts' },
  fuel_prices: { name: 'Fuel', icon: '⛽', description: 'Local fuel prices' }
};

export const getDefaultPreferences = (groups: InterestGroup[]): UserInfoPreferences => {
  const enabledCards = new Set<InfoCard>();
  
  groups.forEach(group => {
    interestGroupDefaults[group].forEach(card => enabledCards.add(card));
  });

  return {
    interestGroups: groups,
    enabledCards: Array.from(enabledCards),
    autoShowInModes: {
      navigation: [],
      traffic: [],
      nearby: [],
      drive: []
    },
    compactMode: true
  };
};
