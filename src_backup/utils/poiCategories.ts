export type POICategory = 
  | 'youth'
  | 'family'
  | 'friends'
  | 'tourist'
  | 'emergency'
  | 'education'
  | 'daily'
  | 'sos'
  | 'food'
  | 'stay'
  | 'fuel'
  | 'medical'
  | 'worship'
  | 'entertainment'
  | 'shopping'
  | 'adventure'
  | 'culture'
  | 'nature';

export type POIType = 
  // Emergency & SOS
  | 'police_station'
  | 'hospital'
  | 'fire_station'
  | 'ambulance'
  | 'emergency_phone'
  | 'pharmacy'
  
  // Food & Dining
  | 'restaurant'
  | 'cafe'
  | 'fast_food'
  | 'street_food'
  | 'bar'
  | 'bakery'
  | 'local_dhaba'
  | 'coffee_shop'
  
  // Stay & Accommodation
  | 'hotel'
  | 'resort'
  | 'guest_house'
  | 'hostel'
  | 'camping'
  | 'homestay'
  
  // Daily Needs
  | 'gas_station'
  | 'atm'
  | 'bank'
  | 'supermarket'
  | 'pharmacy_store'
  | 'convenience_store'
  | 'mechanic'
  | 'car_wash'
  
  // Tourist Attractions
  | 'temple'
  | 'monastery'
  | 'church'
  | 'mosque'
  | 'historical_site'
  | 'museum'
  | 'viewpoint'
  | 'park'
  | 'lake'
  | 'waterfall'
  | 'mountain_peak'
  
  // Entertainment & Youth
  | 'cinema'
  | 'mall'
  | 'nightclub'
  | 'disco'
  | 'game_zone'
  | 'sports_complex'
  | 'gym'
  | 'fitness_center'
  | 'swimming_pool'
  | 'spa'
  | 'adventure_park'
  | 'bowling'
  | 'karaoke'
  | 'lounge'
  
  // Education
  | 'school'
  | 'college'
  | 'university'
  | 'library'
  | 'training_center'
  
  // Shopping
  | 'market'
  | 'shopping_mall'
  | 'handicraft_shop'
  | 'souvenir_shop'
  
  // Adventure
  | 'trekking_point'
  | 'rafting_point'
  | 'paragliding'
  | 'zipline'
  | 'rock_climbing'
  | 'bungee_jumping'
  
  // Nature
  | 'national_park'
  | 'wildlife_reserve'
  | 'botanical_garden'
  | 'hiking_trail';

export interface POI {
  id: string;
  name: string;
  type: POIType;
  categories: POICategory[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  rating?: number;
  reviews?: number;
  description?: string;
  phone?: string;
  hours?: string;
  website?: string;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  amenities?: string[];
  images?: string[];
  distance?: number; // from user location in km
  open?: boolean;
}

export interface POICategoryInfo {
  id: POICategory;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  emoji: string;
  types: POIType[];
}

export const POI_CATEGORIES: Record<POICategory, POICategoryInfo> = {
  sos: {
    id: 'sos',
    name: 'SOS & Emergency',
    icon: '🚨',
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
    description: 'Critical emergency services',
    emoji: '🆘',
    types: ['police_station', 'hospital', 'fire_station', 'ambulance', 'emergency_phone']
  },
  emergency: {
    id: 'emergency',
    name: 'Emergency Services',
    icon: '🏥',
    color: '#f97316',
    gradient: 'from-orange-500 to-red-500',
    description: 'Medical and urgent services',
    emoji: '⚕️',
    types: ['hospital', 'pharmacy', 'ambulance', 'emergency_phone']
  },
  daily: {
    id: 'daily',
    name: 'Daily Needs',
    icon: '🛒',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Essential daily services',
    emoji: '🏪',
    types: ['gas_station', 'atm', 'bank', 'supermarket', 'pharmacy_store', 'convenience_store', 'mechanic']
  },
  food: {
    id: 'food',
    name: 'Food & Dining',
    icon: '🍽️',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-500',
    description: 'Restaurants and eateries',
    emoji: '🍔',
    types: ['restaurant', 'cafe', 'fast_food', 'street_food', 'bar', 'bakery', 'local_dhaba']
  },
  stay: {
    id: 'stay',
    name: 'Stay & Accommodation',
    icon: '🏨',
    color: '#8b5cf6',
    gradient: 'from-purple-500 to-pink-500',
    description: 'Hotels and lodging',
    emoji: '🛏️',
    types: ['hotel', 'resort', 'guest_house', 'hostel', 'camping', 'homestay']
  },
  tourist: {
    id: 'tourist',
    name: 'Tourist Attractions',
    icon: '🗺️',
    color: '#10b981',
    gradient: 'from-green-500 to-emerald-500',
    description: 'Must-visit places',
    emoji: '📸',
    types: ['temple', 'monastery', 'historical_site', 'museum', 'viewpoint', 'park']
  },
  youth: {
    id: 'youth',
    name: 'Youth & Entertainment',
    icon: '🎮',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-500',
    description: 'Fun and entertainment',
    emoji: '🎉',
    types: ['cinema', 'mall', 'nightclub', 'disco', 'game_zone', 'sports_complex', 'gym', 'fitness_center', 'swimming_pool', 'spa', 'adventure_park', 'bowling', 'karaoke', 'lounge']
  },
  family: {
    id: 'family',
    name: 'Family Friendly',
    icon: '👨‍👩‍👧‍👦',
    color: '#14b8a6',
    gradient: 'from-teal-500 to-cyan-500',
    description: 'Perfect for families',
    emoji: '🏡',
    types: ['park', 'museum', 'zoo', 'restaurant', 'hotel', 'shopping_mall', 'cinema']
  },
  friends: {
    id: 'friends',
    name: 'Friends Hangout',
    icon: '🎊',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-purple-500',
    description: 'Great for groups',
    emoji: '🎯',
    types: ['cafe', 'coffee_shop', 'bar', 'nightclub', 'disco', 'lounge', 'karaoke', 'bowling', 'sports_complex', 'adventure_park', 'restaurant']
  },
  education: {
    id: 'education',
    name: 'Education',
    icon: '📚',
    color: '#0891b2',
    gradient: 'from-cyan-600 to-blue-600',
    description: 'Learning centers',
    emoji: '🎓',
    types: ['school', 'college', 'university', 'library', 'training_center']
  },
  worship: {
    id: 'worship',
    name: 'Worship Places',
    icon: '🛕',
    color: '#f97316',
    gradient: 'from-orange-400 to-amber-500',
    description: 'Religious sites',
    emoji: '🙏',
    types: ['temple', 'monastery', 'church', 'mosque']
  },
  entertainment: {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎭',
    color: '#a855f7',
    gradient: 'from-purple-500 to-fuchsia-500',
    description: 'Fun activities',
    emoji: '🎪',
    types: ['cinema', 'nightclub', 'disco', 'lounge', 'karaoke', 'bowling', 'game_zone', 'sports_complex']
  },
  shopping: {
    id: 'shopping',
    name: 'Shopping',
    icon: '🛍️',
    color: '#ec4899',
    gradient: 'from-pink-500 to-purple-500',
    description: 'Shopping destinations',
    emoji: '🛒',
    types: ['market', 'shopping_mall', 'handicraft_shop', 'souvenir_shop']
  },
  adventure: {
    id: 'adventure',
    name: 'Adventure',
    icon: '🏔️',
    color: '#059669',
    gradient: 'from-emerald-600 to-teal-600',
    description: 'Thrilling activities',
    emoji: '⛰️',
    types: ['trekking_point', 'rafting_point', 'paragliding', 'zipline', 'rock_climbing', 'bungee_jumping']
  },
  culture: {
    id: 'culture',
    name: 'Culture & Heritage',
    icon: '🏛️',
    color: '#d97706',
    gradient: 'from-amber-600 to-orange-600',
    description: 'Cultural experiences',
    emoji: '🎨',
    types: ['museum', 'historical_site', 'handicraft_shop', 'cultural_center']
  },
  nature: {
    id: 'nature',
    name: 'Nature & Wildlife',
    icon: '🌳',
    color: '#16a34a',
    gradient: 'from-green-600 to-lime-600',
    description: 'Natural beauty',
    emoji: '🦋',
    types: ['national_park', 'wildlife_reserve', 'botanical_garden', 'hiking_trail', 'lake', 'waterfall']
  },
  fuel: {
    id: 'fuel',
    name: 'Fuel & Service',
    icon: '⛽',
    color: '#0284c7',
    gradient: 'from-sky-600 to-blue-600',
    description: 'Fuel stations',
    emoji: '🚗',
    types: ['gas_station', 'mechanic', 'car_wash']
  },
  medical: {
    id: 'medical',
    name: 'Medical Services',
    icon: '💊',
    color: '#dc2626',
    gradient: 'from-red-500 to-pink-500',
    description: 'Healthcare facilities',
    emoji: '⚕️',
    types: ['hospital', 'pharmacy', 'pharmacy_store']
  }
};

export const POI_TYPE_INFO: Record<POIType, {
  name: string;
  icon: string;
  color: string;
  categories: POICategory[];
}> = {
  // Emergency & SOS
  police_station: { name: 'Police Station', icon: '👮', color: '#3b82f6', categories: ['sos', 'emergency', 'daily'] },
  hospital: { name: 'Hospital', icon: '🏥', color: '#ef4444', categories: ['sos', 'emergency', 'medical', 'daily'] },
  fire_station: { name: 'Fire Station', icon: '🚒', color: '#f97316', categories: ['sos', 'emergency'] },
  ambulance: { name: 'Ambulance', icon: '🚑', color: '#ef4444', categories: ['sos', 'emergency', 'medical'] },
  emergency_phone: { name: 'Emergency Phone', icon: '📞', color: '#dc2626', categories: ['sos', 'emergency'] },
  pharmacy: { name: 'Pharmacy', icon: '💊', color: '#10b981', categories: ['emergency', 'medical', 'daily'] },
  
  // Food & Dining
  restaurant: { name: 'Restaurant', icon: '🍽️', color: '#f59e0b', categories: ['food', 'friends', 'family', 'tourist'] },
  cafe: { name: 'Café', icon: '☕', color: '#8b5cf6', categories: ['food', 'friends', 'youth'] },
  coffee_shop: { name: 'Coffee Shop', icon: '☕', color: '#8b5cf6', categories: ['food', 'friends', 'youth', 'daily'] },
  fast_food: { name: 'Fast Food', icon: '🍔', color: '#ef4444', categories: ['food', 'youth', 'daily'] },
  street_food: { name: 'Street Food', icon: '🌮', color: '#f97316', categories: ['food', 'tourist', 'daily'] },
  bar: { name: 'Bar', icon: '🍺', color: '#ec4899', categories: ['food', 'friends', 'youth', 'entertainment'] },
  bakery: { name: 'Bakery', icon: '🥐', color: '#fbbf24', categories: ['food', 'daily'] },
  local_dhaba: { name: 'Local Dhaba', icon: '🍛', color: '#f59e0b', categories: ['food', 'tourist', 'daily'] },
  
  // Stay & Accommodation
  hotel: { name: 'Hotel', icon: '🏨', color: '#8b5cf6', categories: ['stay', 'tourist', 'family'] },
  resort: { name: 'Resort', icon: '🏖️', color: '#06b6d4', categories: ['stay', 'tourist', 'family', 'friends'] },
  guest_house: { name: 'Guest House', icon: '🏠', color: '#10b981', categories: ['stay', 'tourist'] },
  hostel: { name: 'Hostel', icon: '🎒', color: '#6366f1', categories: ['stay', 'youth', 'friends'] },
  camping: { name: 'Camping', icon: '⛺', color: '#059669', categories: ['stay', 'adventure', 'nature', 'friends'] },
  homestay: { name: 'Homestay', icon: '🏡', color: '#14b8a6', categories: ['stay', 'tourist', 'culture'] },
  
  // Daily Needs
  gas_station: { name: 'Gas Station', icon: '⛽', color: '#0284c7', categories: ['daily', 'fuel'] },
  atm: { name: 'ATM', icon: '🏧', color: '#3b82f6', categories: ['daily'] },
  bank: { name: 'Bank', icon: '🏦', color: '#1e40af', categories: ['daily'] },
  supermarket: { name: 'Supermarket', icon: '🛒', color: '#10b981', categories: ['daily', 'shopping'] },
  pharmacy_store: { name: 'Pharmacy Store', icon: '💊', color: '#10b981', categories: ['daily', 'medical'] },
  convenience_store: { name: 'Convenience Store', icon: '🏪', color: '#06b6d4', categories: ['daily'] },
  mechanic: { name: 'Mechanic', icon: '🔧', color: '#64748b', categories: ['daily', 'fuel'] },
  car_wash: { name: 'Car Wash', icon: '🚿', color: '#06b6d4', categories: ['daily', 'fuel'] },
  
  // Tourist Attractions
  temple: { name: 'Temple', icon: '🛕', color: '#f97316', categories: ['tourist', 'worship', 'culture', 'family'] },
  monastery: { name: 'Monastery', icon: '🏯', color: '#d97706', categories: ['tourist', 'worship', 'culture'] },
  church: { name: 'Church', icon: '⛪', color: '#94a3b8', categories: ['tourist', 'worship'] },
  mosque: { name: 'Mosque', icon: '🕌', color: '#10b981', categories: ['tourist', 'worship'] },
  historical_site: { name: 'Historical Site', icon: '🏛️', color: '#d97706', categories: ['tourist', 'culture', 'education'] },
  museum: { name: 'Museum', icon: '🏛️', color: '#6366f1', categories: ['tourist', 'culture', 'education', 'family'] },
  viewpoint: { name: 'Viewpoint', icon: '🏔️', color: '#059669', categories: ['tourist', 'nature', 'adventure'] },
  park: { name: 'Park', icon: '🌳', color: '#16a34a', categories: ['tourist', 'nature', 'family', 'daily'] },
  lake: { name: 'Lake', icon: '🏞️', color: '#0891b2', categories: ['tourist', 'nature'] },
  waterfall: { name: 'Waterfall', icon: '💧', color: '#06b6d4', categories: ['tourist', 'nature', 'adventure'] },
  mountain_peak: { name: 'Mountain Peak', icon: '⛰️', color: '#64748b', categories: ['tourist', 'nature', 'adventure'] },
  
  // Entertainment & Youth
  cinema: { name: 'Cinema', icon: '🎬', color: '#a855f7', categories: ['entertainment', 'youth', 'friends', 'family'] },
  mall: { name: 'Mall', icon: '🏬', color: '#ec4899', categories: ['shopping', 'youth', 'friends', 'family'] },
  nightclub: { name: 'Nightclub', icon: '🎶', color: '#ec4899', categories: ['entertainment', 'youth', 'friends'] },
  disco: { name: 'Disco', icon: '💃', color: '#ec4899', categories: ['entertainment', 'youth', 'friends'] },
  lounge: { name: 'Lounge', icon: '🍸', color: '#a855f7', categories: ['entertainment', 'youth', 'friends'] },
  karaoke: { name: 'Karaoke', icon: '🎤', color: '#f97316', categories: ['entertainment', 'youth', 'friends'] },
  bowling: { name: 'Bowling', icon: '🎳', color: '#3b82f6', categories: ['entertainment', 'youth', 'friends', 'family'] },
  game_zone: { name: 'Game Zone', icon: '🎮', color: '#8b5cf6', categories: ['entertainment', 'youth', 'friends', 'family'] },
  sports_complex: { name: 'Sports Complex', icon: '⚽', color: '#10b981', categories: ['entertainment', 'youth', 'friends'] },
  gym: { name: 'Gym', icon: '💪', color: '#f97316', categories: ['daily', 'youth'] },
  fitness_center: { name: 'Fitness Center', icon: '🏋️', color: '#f97316', categories: ['daily', 'youth'] },
  spa: { name: 'Spa & Wellness', icon: '💆', color: '#ec4899', categories: ['youth', 'friends'] },
  swimming_pool: { name: 'Swimming Pool', icon: '🏊', color: '#06b6d4', categories: ['entertainment', 'youth', 'family'] },
  adventure_park: { name: 'Adventure Park', icon: '🎢', color: '#ec4899', categories: ['entertainment', 'youth', 'friends', 'family', 'adventure'] },
  
  // Education
  school: { name: 'School', icon: '🏫', color: '#3b82f6', categories: ['education'] },
  college: { name: 'College', icon: '🎓', color: '#6366f1', categories: ['education', 'youth'] },
  university: { name: 'University', icon: '🏛️', color: '#8b5cf6', categories: ['education', 'youth'] },
  library: { name: 'Library', icon: '📚', color: '#0891b2', categories: ['education', 'daily'] },
  training_center: { name: 'Training Center', icon: '👨‍🏫', color: '#06b6d4', categories: ['education'] },
  
  // Shopping
  market: { name: 'Market', icon: '🏪', color: '#f59e0b', categories: ['shopping', 'daily', 'tourist'] },
  shopping_mall: { name: 'Shopping Mall', icon: '🏬', color: '#ec4899', categories: ['shopping', 'youth', 'friends', 'family'] },
  handicraft_shop: { name: 'Handicraft Shop', icon: '🎨', color: '#d97706', categories: ['shopping', 'tourist', 'culture'] },
  souvenir_shop: { name: 'Souvenir Shop', icon: '🎁', color: '#f97316', categories: ['shopping', 'tourist'] },
  
  // Adventure
  trekking_point: { name: 'Trekking Point', icon: '🥾', color: '#059669', categories: ['adventure', 'nature', 'tourist'] },
  rafting_point: { name: 'Rafting Point', icon: '🚣', color: '#0891b2', categories: ['adventure', 'friends', 'youth'] },
  paragliding: { name: 'Paragliding', icon: '🪂', color: '#06b6d4', categories: ['adventure', 'youth', 'tourist'] },
  zipline: { name: 'Zipline', icon: '🎿', color: '#10b981', categories: ['adventure', 'youth', 'friends'] },
  rock_climbing: { name: 'Rock Climbing', icon: '🧗', color: '#64748b', categories: ['adventure', 'youth', 'friends'] },
  bungee_jumping: { name: 'Bungee Jumping', icon: '🤸', color: '#ef4444', categories: ['adventure', 'youth', 'friends'] },
  
  // Nature
  national_park: { name: 'National Park', icon: '🌲', color: '#16a34a', categories: ['nature', 'tourist', 'family'] },
  wildlife_reserve: { name: 'Wildlife Reserve', icon: '🦁', color: '#059669', categories: ['nature', 'tourist', 'family'] },
  botanical_garden: { name: 'Botanical Garden', icon: '🌺', color: '#10b981', categories: ['nature', 'family', 'tourist'] },
  hiking_trail: { name: 'Hiking Trail', icon: '🥾', color: '#16a34a', categories: ['nature', 'adventure', 'friends'] }
};

// Get POIs by category
export const getPOIsByCategory = (pois: POI[], category: POICategory): POI[] => {
  return pois.filter(poi => poi.categories.includes(category));
};

// Get POIs by multiple categories
export const getPOIsByCategories = (pois: POI[], categories: POICategory[]): POI[] => {
  return pois.filter(poi => 
    categories.some(cat => poi.categories.includes(cat))
  );
};

// Get nearby POIs sorted by distance
export const getNearbyPOIs = (pois: POI[], maxDistance: number = 10): POI[] => {
  return pois
    .filter(poi => poi.distance !== undefined && poi.distance <= maxDistance)
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
};
