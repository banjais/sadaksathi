export type TravelMode = 'drive' | 'walk' | 'trek' | 'bike' | 'bus';

export type TripStatus = 'draft' | 'planned' | 'ongoing' | 'completed' | 'cancelled';

export interface TripLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  type: 'waypoint' | 'destination' | 'poi';
  arrivalTime?: Date;
  departureTime?: Date;
  duration?: number; // minutes
  notes?: string;
}

export interface VehicleInfo {
  type: 'car' | 'motorcycle' | 'bus' | 'bicycle';
  model?: string;
  plateNumber?: string;
  fuelLevel?: number; // percentage
  lastService?: Date;
  insurance?: {
    provider: string;
    expiryDate: Date;
    policyNumber: string;
  };
  healthChecks: {
    tires: boolean;
    brakes: boolean;
    lights: boolean;
    oil: boolean;
    documents: boolean;
  };
}

export interface TravelerInfo {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'leader' | 'member' | 'child' | 'elder';
  healthInfo?: {
    bloodType?: string;
    allergies?: string[];
    medications?: string[];
    emergencyContact?: string;
  };
  location?: {
    lat: number;
    lng: number;
    lastUpdated: Date;
  };
}

export interface TripChecklist {
  category: string;
  items: {
    id: string;
    name: string;
    checked: boolean;
    mandatory: boolean;
  }[];
}

export interface Trip {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  status: TripStatus;
  
  // Schedule
  startDate?: Date;
  endDate?: Date;
  
  // Locations
  origin: TripLocation;
  destination: TripLocation;
  waypoints: TripLocation[];
  
  // Travel
  travelMode: TravelMode;
  distance?: number; // km
  estimatedDuration?: number; // minutes
  
  // Vehicle (for drive mode)
  vehicle?: VehicleInfo;
  
  // Group
  travelers: TravelerInfo[];
  isGroup: boolean;
  
  // Checklists
  checklists: TripChecklist[];
  
  // Offline
  offlineMapDownloaded: boolean;
  offlineDataDownloaded: boolean;
  
  // Reminders
  reminders: {
    id: string;
    message: string;
    time: Date;
    sent: boolean;
  }[];
  
  // Settings
  shareLocation: boolean;
  enableGroupChat: boolean;
  
  // Interest-specific
  interestType?: 'sightseeing' | 'trekking' | 'business' | 'family' | 'pilgrimage' | 'shopping';
  
  // Notes
  notes?: string;
}

// Default checklists for different travel modes
export const getDefaultChecklists = (mode: TravelMode, isGroup: boolean): TripChecklist[] => {
  const common: TripChecklist = {
    category: 'Essentials',
    items: [
      { id: 'phone', name: 'Mobile Phone', checked: false, mandatory: true },
      { id: 'charger', name: 'Phone Charger', checked: false, mandatory: true },
      { id: 'wallet', name: 'Wallet/Money', checked: false, mandatory: true },
      { id: 'id', name: 'ID Documents', checked: false, mandatory: true },
      { id: 'water', name: 'Water Bottle', checked: false, mandatory: true },
      { id: 'snacks', name: 'Snacks', checked: false, mandatory: false },
      { id: 'medicine', name: 'First Aid Kit', checked: false, mandatory: true }
    ]
  };

  const drive: TripChecklist = {
    category: 'Vehicle',
    items: [
      { id: 'license', name: 'Driving License', checked: false, mandatory: true },
      { id: 'insurance', name: 'Insurance Papers', checked: false, mandatory: true },
      { id: 'spare', name: 'Spare Tire', checked: false, mandatory: true },
      { id: 'tools', name: 'Basic Tools', checked: false, mandatory: true },
      { id: 'fuel', name: 'Fuel Tank Full', checked: false, mandatory: true }
    ]
  };

  const trek: TripChecklist = {
    category: 'Trekking Gear',
    items: [
      { id: 'boots', name: 'Trekking Boots', checked: false, mandatory: true },
      { id: 'backpack', name: 'Backpack', checked: false, mandatory: true },
      { id: 'jacket', name: 'Warm Jacket', checked: false, mandatory: true },
      { id: 'map', name: 'Trail Map', checked: false, mandatory: true },
      { id: 'flashlight', name: 'Flashlight', checked: false, mandatory: true },
      { id: 'rope', name: 'Rope/Cord', checked: false, mandatory: false }
    ]
  };

  const group: TripChecklist = {
    category: 'Group Coordination',
    items: [
      { id: 'group-list', name: 'All Members Contact Info', checked: false, mandatory: true },
      { id: 'meeting', name: 'Meeting Point Decided', checked: false, mandatory: true },
      { id: 'emergency', name: 'Emergency Plan Shared', checked: false, mandatory: true },
      { id: 'budget', name: 'Budget Discussed', checked: false, mandatory: false }
    ]
  };

  let checklists = [common];

  if (mode === 'drive') {
    checklists.push(drive);
  } else if (mode === 'trek') {
    checklists.push(trek);
  }

  if (isGroup) {
    checklists.push(group);
  }

  return checklists;
};

// Interest-based recommendations
export const getInterestBasedInfo = (interestType: string, travelMode: TravelMode) => {
  const recommendations: Record<string, any> = {
    sightseeing: {
      title: 'Sightseeing Trip',
      tips: [
        'Best time: Early morning or late afternoon for good lighting',
        'Bring camera and extra batteries',
        'Check monument opening hours',
        'Hire local guide for rich experience'
      ],
      mustBring: ['Camera', 'Guidebook', 'Comfortable shoes', 'Sunscreen'],
      weather: true,
      poi: true
    },
    trekking: {
      title: 'Trekking Adventure',
      tips: [
        'Start early to avoid afternoon weather',
        'Inform someone about your route',
        'Check weather forecast',
        'Carry sufficient water and energy snacks'
      ],
      mustBring: ['Trekking gear', 'Emergency whistle', 'Trail map', 'First aid'],
      weather: true,
      elevation: true
    },
    business: {
      title: 'Business Trip',
      tips: [
        'Check traffic before departure',
        'Keep all documents ready',
        'Plan for alternative routes',
        'Arrive 15 minutes early'
      ],
      mustBring: ['Business cards', 'Laptop', 'Documents', 'Formal attire'],
      traffic: true,
      parking: true
    },
    family: {
      title: 'Family Trip',
      tips: [
        'Plan regular breaks for kids',
        'Pack snacks and entertainment',
        'Check for family-friendly facilities',
        'Share live location with family'
      ],
      mustBring: ['Kids entertainment', 'Snacks', 'Extra clothes', 'Medicine kit'],
      familyFriendly: true,
      restrooms: true
    },
    pilgrimage: {
      title: 'Pilgrimage Journey',
      tips: [
        'Check temple/shrine timings',
        'Dress appropriately',
        'Respect local customs',
        'Plan for crowded places'
      ],
      mustBring: ['Offering items', 'Comfortable clothes', 'Prayer items', 'Water'],
      religious: true,
      parking: true
    }
  };

  return recommendations[interestType] || recommendations.sightseeing;
};

// Travel mode specific information needs
export const getTravelModeInfo = (mode: TravelMode) => {
  const modeInfo: Record<TravelMode, any> = {
    drive: {
      icon: '🚗',
      name: 'Driving',
      infoNeeded: ['traffic', 'road_status', 'fuel_prices', 'speed_camera', 'parking'],
      healthChecks: ['vehicle'],
      preparation: 'Check vehicle, fuel, documents',
      tips: 'Follow traffic rules, take breaks every 2 hours'
    },
    walk: {
      icon: '🚶',
      name: 'Walking',
      infoNeeded: ['weather', 'nearby_services', 'incidents'],
      healthChecks: ['personal'],
      preparation: 'Comfortable shoes, water, sun protection',
      tips: 'Stay hydrated, use pedestrian crossings'
    },
    trek: {
      icon: '🥾',
      name: 'Trekking',
      infoNeeded: ['weather', 'incidents', 'nearby_services'],
      healthChecks: ['personal', 'gear'],
      preparation: 'Proper gear, trail map, emergency kit',
      tips: 'Check weather, inform someone, carry emergency supplies'
    },
    bike: {
      icon: '🚴',
      name: 'Cycling',
      infoNeeded: ['traffic', 'weather', 'road_status'],
      healthChecks: ['personal', 'bicycle'],
      preparation: 'Bike check, helmet, repair kit',
      tips: 'Wear helmet, use bike lanes, carry repair tools'
    },
    bus: {
      icon: '🚌',
      name: 'Bus',
      infoNeeded: ['traffic', 'incidents', 'nearby_services'],
      healthChecks: ['personal'],
      preparation: 'Bus schedule, ticket, emergency contact',
      tips: 'Check bus timings, keep emergency contact handy'
    }
  };

  return modeInfo[mode];
};

// Generate AI reminders based on trip
export const generateSmartReminders = (trip: Trip): Date[] => {
  if (!trip.startDate) return [];

  const reminders: Date[] = [];
  const startTime = trip.startDate.getTime();

  // 1 day before
  reminders.push(new Date(startTime - 24 * 60 * 60 * 1000));
  
  // 3 hours before
  reminders.push(new Date(startTime - 3 * 60 * 60 * 1000));
  
  // 30 minutes before
  reminders.push(new Date(startTime - 30 * 60 * 1000));

  return reminders;
};
