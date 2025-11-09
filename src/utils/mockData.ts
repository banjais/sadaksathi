// Mock data for Nepal road conditions, weather, and services
export interface RoadCondition {
  id: string;
  name: string;
  nameNe: string;
  status: 'clear' | 'blocked' | 'one-lane' | 'construction';
  lastUpdated: string;
  description: string;
  descriptionNe: string;
  severity: 'low' | 'medium' | 'high';
}

export interface WeatherData {
  location: string;
  locationNe: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  conditionNe: string;
  visibility: number;
  lastUpdated: string;
}

export interface TrafficData {
  routeId: string;
  routeName: string;
  routeNameNe: string;
  trafficLevel: 'light' | 'moderate' | 'heavy' | 'severe';
  averageSpeed: number;
  travelTime: string;
  incidents: number;
  lastUpdated: string;
}

export interface NearbyService {
  id: string;
  name: string;
  nameNe: string;
  type: 'hospital' | 'police' | 'fuel' | 'mechanic' | 'restaurant' | 'hotel';
  distance: number;
  rating: number;
  isOpen: boolean;
  phone: string;
  coordinates: { lat: number; lng: number };
}

export interface IncidentReport {
  id: string;
  type: 'accident' | 'breakdown' | 'roadwork' | 'weather' | 'other';
  location: string;
  locationNe: string;
  description: string;
  descriptionNe: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedAt: string;
  status: 'active' | 'resolved' | 'investigating';
  reportedBy: string;
}

// Major highways and roads in Nepal
export const nepalRoads: RoadCondition[] = [
  {
    id: 'mahendra-highway',
    name: 'Mahendra Highway (East-West Highway)',
    nameNe: 'महेन्द्र राजमार्ग (पूर्व-पश्चिम राजमार्ग)',
    status: 'clear',
    lastUpdated: '2024-12-08 10:30 AM',
    description: 'Clear traffic, normal conditions',
    descriptionNe: 'सफा ट्राफिक, सामान्य अवस्था',
    severity: 'low'
  },
  {
    id: 'prithvi-highway',
    name: 'Prithvi Highway (Kathmandu-Pokhara)',
    nameNe: 'पृथ्वी राजमार्ग (काठमाडौं-पोखरा)',
    status: 'one-lane',
    lastUpdated: '2024-12-08 11:15 AM',
    description: 'One lane open due to landslide near Mugling',
    descriptionNe: 'मुग्लिङ नजिक पहिरोको कारण एक लेन मात्र खुला',
    severity: 'medium'
  },
  {
    id: 'tribhuvan-highway',
    name: 'Tribhuvan Highway (Kathmandu-Birgunj)',
    nameNe: 'त्रिभुवन राजमार्ग (काठमाडौं-वीरगञ्ज)',
    status: 'clear',
    lastUpdated: '2024-12-08 09:45 AM',
    description: 'Heavy traffic near Thankot, allow extra time',
    descriptionNe: 'थानकोट नजिक भारी ट्राफिक, अतिरिक्त समय दिनुहोस्',
    severity: 'medium'
  },
  {
    id: 'araniko-highway',
    name: 'Araniko Highway (Kathmandu-Kodari)',
    nameNe: 'अरनिको राजमार्ग (काठमाडौं-कोदारी)',
    status: 'blocked',
    lastUpdated: '2024-12-08 08:20 AM',
    description: 'Road blocked due to construction work near Dhulikhel',
    descriptionNe: 'धुलिखेल नजिक निर्माण कार्यको कारण सडक बन्द',
    severity: 'high'
  },
  {
    id: 'karnali-highway',
    name: 'Karnali Highway',
    nameNe: 'कर्णाली राजमार्ग',
    status: 'one-lane',
    lastUpdated: '2024-12-08 07:30 AM',
    description: 'Difficult conditions due to fog and narrow roads',
    descriptionNe: 'कुहिरो र साँघुरो सडकको कारण कठिन अवस्था',
    severity: 'high'
  },
  {
    id: 'bp-highway',
    name: 'B.P. Highway (Kathmandu-Bardibas)',
    nameNe: 'बी.पी. राजमार्ग (काठमाडौं-बर्दिबास)',
    status: 'clear',
    lastUpdated: '2024-12-08 10:00 AM',
    description: 'Normal traffic flow',
    descriptionNe: 'सामान्य ट्राफिक प्रवाह',
    severity: 'low'
  }
];

export const weatherData: WeatherData[] = [
  {
    location: 'Kathmandu',
    locationNe: 'काठमाडौं',
    temperature: 18,
    humidity: 65,
    windSpeed: 8,
    condition: 'Partly Cloudy',
    conditionNe: 'आंशिक बादल',
    visibility: 8,
    lastUpdated: '2024-12-08 11:30 AM'
  },
  {
    location: 'Pokhara',
    locationNe: 'पोखरा',
    temperature: 22,
    humidity: 70,
    windSpeed: 12,
    condition: 'Clear Sky',
    conditionNe: 'सफा आकाश',
    visibility: 10,
    lastUpdated: '2024-12-08 11:25 AM'
  },
  {
    location: 'Chitwan',
    locationNe: 'चितवन',
    temperature: 25,
    humidity: 80,
    windSpeed: 6,
    condition: 'Foggy',
    conditionNe: 'कुहिरो',
    visibility: 3,
    lastUpdated: '2024-12-08 11:20 AM'
  },
  {
    location: 'Biratnagar',
    locationNe: 'विराटनगर',
    temperature: 24,
    humidity: 75,
    windSpeed: 10,
    condition: 'Light Rain',
    conditionNe: 'हल्का पानी',
    visibility: 6,
    lastUpdated: '2024-12-08 11:15 AM'
  }
];

export const trafficData: TrafficData[] = [
  {
    routeId: 'ktm-ring-road',
    routeName: 'Kathmandu Ring Road',
    routeNameNe: 'काठमाडौं रिङ रोड',
    trafficLevel: 'heavy',
    averageSpeed: 15,
    travelTime: '45-60 min',
    incidents: 3,
    lastUpdated: '2024-12-08 11:30 AM'
  },
  {
    routeId: 'ktm-bhaktapur',
    routeName: 'Kathmandu - Bhaktapur',
    routeNameNe: 'काठमाडौं - भक्तपुर',
    trafficLevel: 'moderate',
    averageSpeed: 25,
    travelTime: '30-40 min',
    incidents: 1,
    lastUpdated: '2024-12-08 11:25 AM'
  },
  {
    routeId: 'ktm-lalitpur',
    routeName: 'Kathmandu - Lalitpur',
    routeNameNe: 'काठमाडौं - ललितपुर',
    trafficLevel: 'light',
    averageSpeed: 35,
    travelTime: '20-25 min',
    incidents: 0,
    lastUpdated: '2024-12-08 11:20 AM'
  }
];

export const nearbyServices: NearbyService[] = [
  {
    id: 'hospital-1',
    name: 'Tribhuvan University Teaching Hospital',
    nameNe: 'त्रिभुवन विश्वविद्यालय शिक्षण अस्पताल',
    type: 'hospital',
    distance: 2.5,
    rating: 4.2,
    isOpen: true,
    phone: '01-4412404',
    coordinates: { lat: 27.7172, lng: 85.3240 }
  },
  {
    id: 'police-1',
    name: 'Metropolitan Police Circle',
    nameNe: 'महानगरीय प्रहरी वृत्त',
    type: 'police',
    distance: 1.2,
    rating: 3.8,
    isOpen: true,
    phone: '01-4261945',
    coordinates: { lat: 27.7172, lng: 85.3140 }
  },
  {
    id: 'fuel-1',
    name: 'Nepal Oil Corporation Petrol Pump',
    nameNe: 'नेपाल आयल निगम पेट्रोल पम्प',
    type: 'fuel',
    distance: 0.8,
    rating: 4.0,
    isOpen: true,
    phone: '01-4123456',
    coordinates: { lat: 27.7072, lng: 85.3200 }
  },
  {
    id: 'mechanic-1',
    name: 'Auto Care Service Center',
    nameNe: 'अटो केयर सेवा केन्द्र',
    type: 'mechanic',
    distance: 1.5,
    rating: 4.3,
    isOpen: true,
    phone: '01-4567890',
    coordinates: { lat: 27.7100, lng: 85.3180 }
  },
  {
    id: 'restaurant-1',
    name: 'Local Nepali Restaurant',
    nameNe: 'स्थानीय नेपाली रेस्टुरेन्ट',
    type: 'restaurant',
    distance: 0.5,
    rating: 4.5,
    isOpen: true,
    phone: '01-4234567',
    coordinates: { lat: 27.7150, lng: 85.3220 }
  },
  {
    id: 'hotel-1',
    name: 'Kathmandu Guest House',
    nameNe: 'काठमाडौं गेस्ट हाउस',
    type: 'hotel',
    distance: 3.0,
    rating: 4.1,
    isOpen: true,
    phone: '01-4700632',
    coordinates: { lat: 27.7120, lng: 85.3160 }
  }
];

export const incidentReports: IncidentReport[] = [
  {
    id: 'incident-1',
    type: 'accident',
    location: 'Kathmandu Ring Road, New Baneshwor',
    locationNe: 'काठमाडौं रिङ रोड, न्यु बनेश्वर',
    description: 'Minor vehicle collision, traffic moving slowly',
    descriptionNe: 'सानो गाडी दुर्घटना, ट्राफिक बिस्तारै चलिरहेको',
    severity: 'medium',
    reportedAt: '2024-12-08 10:15 AM',
    status: 'active',
    reportedBy: 'Traffic Police'
  },
  {
    id: 'incident-2',
    type: 'roadwork',
    location: 'Prithvi Highway, Mugling',
    locationNe: 'पृथ्वी राजमार्ग, मुग्लिङ',
    description: 'Road construction work in progress, expect delays',
    descriptionNe: 'सडक निर्माण कार्य चलिरहेको, ढिलाइ हुन सक्छ',
    severity: 'high',
    reportedAt: '2024-12-08 08:00 AM',
    status: 'active',
    reportedBy: 'Road Department'
  },
  {
    id: 'incident-3',
    type: 'weather',
    location: 'Araniko Highway, Dhulikhel',
    locationNe: 'अरनिको राजमार्ग, धुलिखेल',
    description: 'Heavy fog reducing visibility, drive carefully',
    descriptionNe: 'बाक्लो कुहिरोले दृश्यता कम, सावधानीपूर्वक चलाउनुहोस्',
    severity: 'medium',
    reportedAt: '2024-12-08 06:30 AM',
    status: 'active',
    reportedBy: 'Local Authorities'
  },
  {
    id: 'incident-4',
    type: 'breakdown',
    location: 'Tribhuvan Highway, Thankot',
    locationNe: 'त्रिभुवन राजमार्ग, थानकोट',
    description: 'Large truck breakdown cleared, traffic resumed',
    descriptionNe: 'ठूलो ट्रकको बिग्रेको सफा गरियो, ट्राफिक फेरि सुरु',
    severity: 'low',
    reportedAt: '2024-12-08 09:00 AM',
    status: 'resolved',
    reportedBy: 'Highway Police'
  }
];

// User roles and permissions
export type UserRole = 'superadmin' | 'admin' | 'user' | 'guest';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  preferences: {
    language: string;
    darkMode: boolean;
    notifications: boolean;
    voiceEnabled: boolean;
    aiAssistantRole: 'friend' | 'boss' | 'family' | 'guide';
    aiAssistantGender: 'male' | 'female';
    aiAssistantAvatar?: string;
  };
  infoPreferences?: {
    interestGroups: string[];
    enabledCards: string[];
    autoShowInModes: Record<string, string[]>;
    compactMode: boolean;
  };
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  emergencyContacts: {
    name: string;
    phone: string;
    relation: string;
  }[];
}

export const mockUserProfiles: UserProfile[] = [
  {
    id: 'user-1',
    email: 'admin@sadaksathi.np',
    name: 'Super Admin',
    role: 'superadmin',
    preferences: {
      language: 'ne',
      darkMode: false,
      notifications: true,
      voiceEnabled: true,
      aiAssistantRole: 'guide',
      aiAssistantGender: 'female'
    },
    emergencyContacts: [
      { name: 'Emergency Services', phone: '100', relation: 'Emergency' },
      { name: 'Traffic Police', phone: '103', relation: 'Traffic' }
    ]
  },
  {
    id: 'user-2',
    email: 'moderator@sadaksathi.np',
    name: 'Admin User',
    role: 'admin',
    preferences: {
      language: 'en',
      darkMode: true,
      notifications: true,
      voiceEnabled: true,
      aiAssistantRole: 'boss',
      aiAssistantGender: 'male'
    },
    emergencyContacts: [
      { name: 'Family Contact', phone: '9841234567', relation: 'Family' }
    ]
  },
  {
    id: 'user-3',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    preferences: {
      language: 'ne',
      darkMode: false,
      notifications: true,
      voiceEnabled: false,
      aiAssistantRole: 'friend',
      aiAssistantGender: 'female'
    },
    location: {
      lat: 27.7172,
      lng: 85.3240,
      address: 'Kathmandu, Nepal'
    },
    emergencyContacts: [
      { name: 'Mom', phone: '9841111111', relation: 'Mother' },
      { name: 'Dad', phone: '9841111112', relation: 'Father' }
    ]
  }
];

// Helper functions
export function getRoadStatusColor(status: RoadCondition['status']): string {
  switch (status) {
    case 'clear': return 'text-green-600 dark:text-green-400';
    case 'one-lane': return 'text-yellow-600 dark:text-yellow-400';
    case 'blocked': return 'text-red-600 dark:text-red-400';
    case 'construction': return 'text-orange-600 dark:text-orange-400';
    default: return 'text-gray-600 dark:text-gray-400';
  }
}

export function getTrafficLevelColor(level: TrafficData['trafficLevel']): string {
  switch (level) {
    case 'light': return 'text-green-600 dark:text-green-400';
    case 'moderate': return 'text-yellow-600 dark:text-yellow-400';
    case 'heavy': return 'text-orange-600 dark:text-orange-400';
    case 'severe': return 'text-red-600 dark:text-red-400';
    default: return 'text-gray-600 dark:text-gray-400';
  }
}

export function getSeverityColor(severity: 'low' | 'medium' | 'high' | 'critical'): string {
  switch (severity) {
    case 'low': return 'text-green-600 dark:text-green-400';
    case 'medium': return 'text-yellow-600 dark:text-yellow-400';
    case 'high': return 'text-orange-600 dark:text-orange-400';
    case 'critical': return 'text-red-600 dark:text-red-400';
    default: return 'text-gray-600 dark:text-gray-400';
  }
}