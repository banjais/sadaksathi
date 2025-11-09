import type { POI } from "./poiCategories";

export const SAMPLE_POIS: POI[] = [
  // Emergency & SOS
  {
    id: 'poi-1',
    name: 'Metropolitan Police Range',
    type: 'police_station',
    categories: ['sos', 'emergency', 'daily'],
    location: { lat: 27.7172, lng: 85.324, address: 'Thamel, Kathmandu' },
    rating: 4.0,
    description: '24/7 police station with emergency response',
    phone: '100',
    hours: 'Open 24 hours',
    distance: 0.5
  },
  {
    id: 'poi-2',
    name: 'Teaching Hospital',
    type: 'hospital',
    categories: ['sos', 'emergency', 'medical', 'daily'],
    location: { lat: 27.7355, lng: 85.3340, address: 'Maharajgunj, Kathmandu' },
    rating: 4.5,
    reviews: 234,
    description: 'Major hospital with emergency services and all departments',
    phone: '102',
    hours: 'Open 24 hours',
    amenities: ['Emergency Room', 'ICU', 'Ambulance', 'Pharmacy'],
    distance: 2.3,
    open: true
  },

  // Food & Dining
  {
    id: 'poi-3',
    name: 'Fire and Ice Pizzeria',
    type: 'restaurant',
    categories: ['food', 'friends', 'family', 'tourist'],
    location: { lat: 27.7145, lng: 85.3150, address: 'Thamel, Kathmandu' },
    rating: 4.7,
    reviews: 1823,
    description: 'Italian pizzeria famous for wood-fired pizzas',
    phone: '+977-1-4250210',
    hours: '11:00 AM - 10:00 PM',
    priceRange: '$$',
    amenities: ['WiFi', 'Outdoor Seating', 'Delivery'],
    distance: 0.8,
    open: true
  },
  {
    id: 'poi-4',
    name: 'Himalayan Java Coffee',
    type: 'cafe',
    categories: ['food', 'friends', 'youth'],
    location: { lat: 27.7172, lng: 85.3240, address: 'Thamel, Kathmandu' },
    rating: 4.5,
    reviews: 892,
    description: 'Popular coffee chain with great atmosphere',
    phone: '+977-1-4700234',
    hours: '7:00 AM - 9:00 PM',
    priceRange: '$',
    amenities: ['WiFi', 'Power Outlets', 'Pastries'],
    distance: 0.3,
    open: true
  },

  // Tourist Attractions
  {
    id: 'poi-5',
    name: 'Pashupatinath Temple',
    type: 'temple',
    categories: ['tourist', 'worship', 'culture', 'family'],
    location: { lat: 27.7105, lng: 85.3487, address: 'Pashupati Nath, Kathmandu' },
    rating: 4.9,
    reviews: 5432,
    description: 'Sacred Hindu temple complex, UNESCO World Heritage Site',
    phone: '+977-1-4470459',
    hours: '4:00 AM - 9:00 PM',
    amenities: ['Guided Tours', 'Museum', 'Prayer Hall'],
    distance: 3.5,
    open: true
  },
  {
    id: 'poi-6',
    name: 'Swayambhunath Stupa',
    type: 'monastery',
    categories: ['tourist', 'worship', 'culture'],
    location: { lat: 27.7149, lng: 85.2906, address: 'Swayambhu, Kathmandu' },
    rating: 4.8,
    reviews: 3421,
    description: 'Ancient Buddhist stupa with panoramic city views',
    hours: '5:00 AM - 9:00 PM',
    amenities: ['Viewpoint', 'Monastery', 'Souvenir Shops'],
    distance: 2.8,
    open: true
  },

  // Accommodation
  {
    id: 'poi-7',
    name: 'Hotel Yak & Yeti',
    type: 'hotel',
    categories: ['stay', 'tourist', 'family'],
    location: { lat: 27.7172, lng: 85.3240, address: 'Durbar Marg, Kathmandu' },
    rating: 4.6,
    reviews: 1234,
    description: 'Luxury hotel with casino, spa, and fine dining',
    phone: '+977-1-4248999',
    priceRange: '$$$$',
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Parking'],
    distance: 1.2,
    open: true
  },

  // Daily Needs
  {
    id: 'poi-8',
    name: 'Ncell Service Center',
    type: 'convenience_store',
    categories: ['daily'],
    location: { lat: 27.7172, lng: 85.3240, address: 'New Road, Kathmandu' },
    rating: 4.0,
    description: 'Mobile service provider center',
    phone: '+977-1-5555555',
    hours: '8:00 AM - 8:00 PM',
    distance: 1.0,
    open: true
  },
  {
    id: 'poi-9',
    name: 'Shell Petrol Pump',
    type: 'gas_station',
    categories: ['daily', 'fuel'],
    location: { lat: 27.7050, lng: 85.3220, address: 'Kalimati, Kathmandu' },
    rating: 4.2,
    description: 'Fuel station with convenience store',
    hours: 'Open 24 hours',
    amenities: ['Diesel', 'Petrol', 'ATM', 'Air Pump'],
    distance: 1.5,
    open: true
  },

  // Youth & Entertainment
  {
    id: 'poi-10',
    name: 'QFX Cinemas',
    type: 'cinema',
    categories: ['entertainment', 'youth', 'friends', 'family'],
    location: { lat: 27.6999, lng: 85.3140, address: 'Civil Mall, Kathmandu' },
    rating: 4.5,
    reviews: 678,
    description: 'Modern multiplex cinema with latest movies',
    phone: '+977-1-5970140',
    priceRange: '$$',
    amenities: ['3D Screen', 'Food Court', 'Parking'],
    distance: 2.0,
    open: true
  },
  {
    id: 'poi-11',
    name: 'Club LOD',
    type: 'nightclub',
    categories: ['entertainment', 'youth', 'friends'],
    location: { lat: 27.7145, lng: 85.3150, address: 'Thamel, Kathmandu' },
    rating: 4.3,
    reviews: 234,
    description: 'Popular nightclub with live DJ and dance floor',
    phone: '+977-1-4700789',
    hours: '8:00 PM - 2:00 AM',
    priceRange: '$$$',
    distance: 0.9,
    open: false
  },

  // Shopping
  {
    id: 'poi-12',
    name: 'Civil Mall',
    type: 'shopping_mall',
    categories: ['shopping', 'youth', 'friends', 'family'],
    location: { lat: 27.6999, lng: 85.3140, address: 'Sundhara, Kathmandu' },
    rating: 4.4,
    reviews: 2341,
    description: 'Large shopping mall with retail stores, cinema, and food court',
    phone: '+977-1-5970100',
    hours: '10:00 AM - 9:00 PM',
    amenities: ['Cinema', 'Food Court', 'Parking', 'ATM'],
    distance: 2.1,
    open: true
  },

  // Adventure
  {
    id: 'poi-13',
    name: 'Everest Base Camp Trek',
    type: 'trekking_point',
    categories: ['adventure', 'nature', 'tourist'],
    location: { lat: 27.9881, lng: 86.9250, address: 'Solukhumbu, Nepal' },
    rating: 5.0,
    reviews: 8765,
    description: 'World-famous trekking destination to Everest Base Camp',
    amenities: ['Teahouses', 'Guides', 'Permits Required'],
    distance: 140,
    open: true
  },
  {
    id: 'poi-14',
    name: 'The Last Resort Bungee',
    type: 'bungee_jumping',
    categories: ['adventure', 'youth', 'friends'],
    location: { lat: 27.8900, lng: 85.8540, address: 'Bhote Koshi, Nepal' },
    rating: 4.9,
    reviews: 1234,
    description: 'Nepal\'s first bungee jumping at 160m height',
    phone: '+977-1-4700525',
    priceRange: '$$$',
    amenities: ['Safety Equipment', 'Photos', 'Certificate'],
    distance: 95,
    open: true
  },

  // Nature
  {
    id: 'poi-15',
    name: 'Chitwan National Park',
    type: 'national_park',
    categories: ['nature', 'tourist', 'family'],
    location: { lat: 27.5291, lng: 84.3542, address: 'Chitwan, Nepal' },
    rating: 4.8,
    reviews: 3456,
    description: 'UNESCO World Heritage Site with wildlife safari',
    phone: '+977-56-580722',
    amenities: ['Safari', 'Elephant Ride', 'Bird Watching', 'Hotels'],
    distance: 165,
    open: true
  },

  // More Food Options
  {
    id: 'poi-16',
    name: 'New Everest Momo Center',
    type: 'local_dhaba',
    categories: ['food', 'tourist', 'daily'],
    location: { lat: 27.7160, lng: 85.3230, address: 'Thamel, Kathmandu' },
    rating: 4.6,
    reviews: 567,
    description: 'Famous for authentic Nepali momos',
    phone: '+977-1-4701234',
    hours: '10:00 AM - 10:00 PM',
    priceRange: '$',
    amenities: ['Takeaway', 'Quick Service'],
    distance: 0.6,
    open: true
  },

  // Education
  {
    id: 'poi-17',
    name: 'Tribhuvan University',
    type: 'university',
    categories: ['education', 'youth'],
    location: { lat: 27.6784, lng: 85.3477, address: 'Kirtipur, Kathmandu' },
    rating: 4.1,
    description: 'Nepal\'s oldest and largest university',
    phone: '+977-1-4330433',
    distance: 6.8
  },

  // More attractions
  {
    id: 'poi-18',
    name: 'Garden of Dreams',
    type: 'park',
    categories: ['tourist', 'nature', 'family', 'daily'],
    location: { lat: 27.7155, lng: 85.3171, address: 'Kaiser Mahal, Kathmandu' },
    rating: 4.7,
    reviews: 2345,
    description: 'Beautiful neo-classical garden with cafe and peaceful atmosphere',
    phone: '+977-1-4425340',
    hours: '9:00 AM - 10:00 PM',
    priceRange: '$',
    amenities: ['Cafe', 'WiFi', 'Garden', 'Events'],
    distance: 0.9,
    open: true
  },

  // Medical
  {
    id: 'poi-19',
    name: 'Nepal Mediciti Hospital',
    type: 'hospital',
    categories: ['medical', 'emergency', 'daily'],
    location: { lat: 27.6695, lng: 85.3590, address: 'Bhaisepati, Lalitpur' },
    rating: 4.6,
    reviews: 456,
    description: 'Private hospital with advanced medical facilities',
    phone: '+977-1-5159266',
    hours: 'Open 24 hours',
    amenities: ['Emergency', 'Surgery', 'ICU', 'Parking'],
    distance: 7.5,
    open: true
  },

  // More accommodation
  {
    id: 'poi-20',
    name: 'Zostel Kathmandu',
    type: 'hostel',
    categories: ['stay', 'youth', 'friends'],
    location: { lat: 27.7140, lng: 85.3145, address: 'Thamel, Kathmandu' },
    rating: 4.4,
    reviews: 789,
    description: 'Backpacker hostel with social atmosphere',
    phone: '+977-1-4700999',
    priceRange: '$',
    amenities: ['Dorms', 'Common Room', 'WiFi', 'Kitchen'],
    distance: 0.7,
    open: true
  }
];
