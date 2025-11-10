import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Search,
  Mic,
  MicOff,
  MapPin,
  Zap,
  X,
  Navigation,
  History,
  Star,
  TrendingUp,
  Loader2,
  MapPinned,
  Route,
  Mountain,
  Landmark,
  TreePine,
  Building2,
  Plane,
  Navigation2,
  ArrowRight,
  Maximize2
} from "lucide-react";

interface ModernSearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onVoiceSearch: () => void;
  onAIAssist: () => void;
  onLocationSelect: (location: NepalLocation) => void;
  currentLanguage: string;
  themeGradient?: string;
}

export interface NepalLocation {
  name: string;
  district?: string;
  province?: string;
  type: 'city' | 'district' | 'landmark' | 'airport' | 'highway' | 'viewpoint' | 'temple' | 'park' | 'mountain';
  lat: number;
  lng: number;
  shortDistance?: number; // Direct distance in km
  roadDistance?: number; // Road distance in km
  icon: string;
  description?: string;
}

// Comprehensive Nepal locations database
const nepalLocations: NepalLocation[] = [
  // Major Cities
  { name: "Kathmandu", district: "Kathmandu", province: "Bagmati", type: "city", lat: 27.7172, lng: 85.3240, icon: "🏙️", description: "Capital city of Nepal" },
  { name: "Pokhara", district: "Kaski", province: "Gandaki", type: "city", lat: 28.2096, lng: 83.9856, icon: "🏞️", description: "Tourist city with lakes" },
  { name: "Lalitpur", district: "Lalitpur", province: "Bagmati", type: "city", lat: 27.6667, lng: 85.3333, icon: "🏛️", description: "City of fine arts" },
  { name: "Bhaktapur", district: "Bhaktapur", province: "Bagmati", type: "city", lat: 27.6710, lng: 85.4298, icon: "🏰", description: "Ancient heritage city" },
  { name: "Biratnagar", district: "Morang", province: "Koshi", type: "city", lat: 26.4525, lng: 87.2718, icon: "🏭", description: "Industrial city" },
  { name: "Birgunj", district: "Parsa", province: "Madhesh", type: "city", lat: 27.0104, lng: 84.8797, icon: "🚛", description: "Border trade city" },
  { name: "Hetauda", district: "Makwanpur", province: "Bagmati", type: "city", lat: 27.4287, lng: 85.0324, icon: "🏢", description: "Industrial hub" },
  { name: "Dharan", district: "Sunsari", province: "Koshi", type: "city", lat: 26.8125, lng: 87.2847, icon: "🎓", description: "Educational city" },
  { name: "Butwal", district: "Rupandehi", province: "Lumbini", type: "city", lat: 27.7000, lng: 83.4500, icon: "🏪", description: "Commercial hub" },
  { name: "Janakpur", district: "Dhanusha", province: "Madhesh", type: "city", lat: 26.7288, lng: 85.9244, icon: "🕉️", description: "Religious city" },
  { name: "Nepalgunj", district: "Banke", province: "Lumbini", type: "city", lat: 28.0500, lng: 81.6167, icon: "🌾", description: "Gateway to western Nepal" },
  { name: "Dhangadhi", district: "Kailali", province: "Sudurpashchim", type: "city", lat: 28.6978, lng: 80.5889, icon: "🏘️", description: "Far western city" },
  
  // Tourist Destinations
  { name: "Nagarkot", district: "Bhaktapur", province: "Bagmati", type: "viewpoint", lat: 27.7172, lng: 85.5206, icon: "🌅", description: "Sunrise viewpoint" },
  { name: "Dhulikhel", district: "Kavre", province: "Bagmati", type: "viewpoint", lat: 27.6167, lng: 85.5500, icon: "⛰️", description: "Mountain view station" },
  { name: "Sarangkot", district: "Kaski", province: "Gandaki", type: "viewpoint", lat: 28.2442, lng: 83.9561, icon: "🪂", description: "Paragliding & sunrise spot" },
  { name: "Bandipur", district: "Tanahun", province: "Gandaki", type: "landmark", lat: 27.9394, lng: 84.4208, icon: "🏘️", description: "Preserved Newari town" },
  { name: "Gorkha", district: "Gorkha", province: "Gandaki", type: "landmark", lat: 28.0000, lng: 84.6333, icon: "🏯", description: "Birthplace of Nepal" },
  { name: "Tansen", district: "Palpa", province: "Lumbini", type: "landmark", lat: 27.8667, lng: 83.5500, icon: "🏘️", description: "Hill town" },
  
  // National Parks & Nature
  { name: "Chitwan National Park", district: "Chitwan", province: "Bagmati", type: "park", lat: 27.5291, lng: 84.3542, icon: "🦏", description: "Wildlife reserve" },
  { name: "Bardiya National Park", district: "Bardiya", province: "Lumbini", type: "park", lat: 28.5000, lng: 81.4667, icon: "🐅", description: "Tiger reserve" },
  { name: "Sagarmatha National Park", district: "Solukhumbu", province: "Koshi", type: "park", lat: 27.9628, lng: 86.9219, icon: "🏔️", description: "Everest region" },
  { name: "Annapurna Conservation Area", district: "Kaski", province: "Gandaki", type: "park", lat: 28.5967, lng: 83.8200, icon: "🥾", description: "Trekking paradise" },
  { name: "Rara Lake", district: "Mugu", province: "Karnali", type: "park", lat: 29.5256, lng: 82.0800, icon: "🏞️", description: "Largest lake in Nepal" },
  { name: "Shivapuri National Park", district: "Kathmandu", province: "Bagmati", type: "park", lat: 27.8167, lng: 85.3833, icon: "🌲", description: "Near Kathmandu" },
  
  // Religious Sites
  { name: "Pashupatinath Temple", district: "Kathmandu", province: "Bagmati", type: "temple", lat: 27.7106, lng: 85.3489, icon: "🕉️", description: "Sacred Hindu temple" },
  { name: "Swayambhunath Stupa", district: "Kathmandu", province: "Bagmati", type: "temple", lat: 27.7149, lng: 85.2906, icon: "☸️", description: "Monkey temple" },
  { name: "Boudhanath Stupa", district: "Kathmandu", province: "Bagmati", type: "temple", lat: 27.7215, lng: 85.3622, icon: "☸️", description: "Buddhist stupa" },
  { name: "Lumbini", district: "Rupandehi", province: "Lumbini", type: "temple", lat: 27.4678, lng: 83.2757, icon: "☸️", description: "Buddha's birthplace" },
  { name: "Muktinath Temple", district: "Mustang", province: "Gandaki", type: "temple", lat: 28.8167, lng: 83.8667, icon: "🕉️", description: "Sacred pilgrimage site" },
  { name: "Manakamana Temple", district: "Gorkha", province: "Gandaki", type: "temple", lat: 27.9967, lng: 84.5589, icon: "🛕", description: "Cable car temple" },
  
  // Mountains & Trekking
  { name: "Everest Base Camp", district: "Solukhumbu", province: "Koshi", type: "mountain", lat: 27.9881, lng: 86.8250, icon: "🏔️", description: "World's highest mountain base" },
  { name: "Annapurna Base Camp", district: "Kaski", province: "Gandaki", type: "mountain", lat: 28.5300, lng: 83.8700, icon: "⛰️", description: "Popular trek destination" },
  { name: "Langtang Valley", district: "Rasuwa", province: "Bagmati", type: "mountain", lat: 28.2100, lng: 85.5500, icon: "🏔️", description: "Valley of glaciers" },
  { name: "Manaslu Circuit", district: "Gorkha", province: "Gandaki", type: "mountain", lat: 28.5496, lng: 84.5594, icon: "⛰️", description: "Off-beaten trek" },
  { name: "Poon Hill", district: "Kaski", province: "Gandaki", type: "viewpoint", lat: 28.3917, lng: 83.6744, icon: "🌄", description: "Easy trek with Himalayan views" },
  
  // Airports
  { name: "Tribhuvan International Airport", district: "Kathmandu", province: "Bagmati", type: "airport", lat: 27.6966, lng: 85.3591, icon: "✈️", description: "Main international airport" },
  { name: "Pokhara Airport", district: "Kaski", province: "Gandaki", type: "airport", lat: 28.2006, lng: 83.9822, icon: "✈️", description: "Regional airport" },
  { name: "Bharatpur Airport", district: "Chitwan", province: "Bagmati", type: "airport", lat: 27.6783, lng: 84.4294, icon: "✈️", description: "Chitwan airport" },
  { name: "Lukla Airport", district: "Solukhumbu", province: "Koshi", type: "airport", lat: 27.6869, lng: 86.7314, icon: "✈️", description: "Gateway to Everest" },
  { name: "Biratnagar Airport", district: "Morang", province: "Koshi", type: "airport", lat: 26.4815, lng: 87.2640, icon: "✈️", description: "Eastern Nepal airport" },
  
  // Major Highways Points
  { name: "Mugling Checkpoint", district: "Chitwan", province: "Bagmati", type: "highway", lat: 27.8167, lng: 84.5667, icon: "🛣️", description: "Highway junction" },
  { name: "Narayanghat", district: "Chitwan", province: "Bagmati", type: "city", lat: 27.7054, lng: 84.4335, icon: "🚗", description: "Central highway hub" },
  { name: "Thankot", district: "Kathmandu", province: "Bagmati", type: "highway", lat: 27.6833, lng: 85.2000, icon: "⛰️", description: "Entry to Kathmandu valley" },
  { name: "Daman", district: "Makwanpur", province: "Bagmati", type: "viewpoint", lat: 27.6000, lng: 85.0833, icon: "🌄", description: "Mountain viewpoint on highway" },
  
  // Popular Areas in Kathmandu
  { name: "Thamel", district: "Kathmandu", province: "Bagmati", type: "landmark", lat: 27.7144, lng: 85.3119, icon: "🏪", description: "Tourist hub" },
  { name: "Durbar Square Kathmandu", district: "Kathmandu", province: "Bagmati", type: "landmark", lat: 27.7044, lng: 85.3075, icon: "🏛️", description: "Historic palace square" },
  { name: "New Road", district: "Kathmandu", province: "Bagmati", type: "landmark", lat: 27.7020, lng: 85.3130, icon: "🛍️", description: "Shopping street" },
  { name: "Asan Tole", district: "Kathmandu", province: "Bagmati", type: "landmark", lat: 27.7058, lng: 85.3083, icon: "🏪", description: "Traditional market" },
  
  // Popular Areas in Pokhara
  { name: "Lakeside Pokhara", district: "Kaski", province: "Gandaki", type: "landmark", lat: 28.2090, lng: 83.9595, icon: "🌊", description: "Tourist lakeside area" },
  { name: "Phewa Lake", district: "Kaski", province: "Gandaki", type: "landmark", lat: 28.2090, lng: 83.9595, icon: "🚣", description: "Beautiful lake" },
  { name: "World Peace Pagoda", district: "Kaski", province: "Gandaki", type: "temple", lat: 28.1976, lng: 83.9469, icon: "☸️", description: "Buddhist stupa" },
  { name: "Davis Falls", district: "Kaski", province: "Gandaki", type: "landmark", lat: 28.1906, lng: 83.9618, icon: "💧", description: "Waterfall" },
  
  // Eastern Nepal
  { name: "Ilam", district: "Ilam", province: "Koshi", type: "city", lat: 26.9097, lng: 87.9294, icon: "🍃", description: "Tea gardens" },
  { name: "Taplejung", district: "Taplejung", province: "Koshi", type: "city", lat: 27.3500, lng: 87.6667, icon: "🏔️", description: "Kanchenjunga base" },
  { name: "Dhankuta", district: "Dhankuta", province: "Koshi", type: "city", lat: 26.9833, lng: 87.3500, icon: "🏘️", description: "Hill town" },
  
  // Western Nepal
  { name: "Mustang", district: "Mustang", province: "Gandaki", type: "landmark", lat: 29.1800, lng: 83.9800, icon: "🏜️", description: "Desert kingdom" },
  { name: "Jomsom", district: "Mustang", province: "Gandaki", type: "city", lat: 28.7804, lng: 83.7228, icon: "🏔️", description: "Mountain town" },
  { name: "Ridi Bazaar", district: "Gulmi", province: "Lumbini", type: "landmark", lat: 27.9500, lng: 83.4333, icon: "🕉️", description: "Sacred confluence" },
  
  // Central Nepal
  { name: "Sindhupalchok", district: "Sindhupalchok", province: "Bagmati", type: "district", lat: 27.9500, lng: 85.8833, icon: "⛰️", description: "Mountain district" },
  { name: "Dolakha", district: "Dolakha", province: "Bagmati", type: "district", lat: 27.6833, lng: 86.1667, icon: "🏔️", description: "Historic district" },
  { name: "Kalinchowk", district: "Dolakha", province: "Bagmati", type: "temple", lat: 27.7667, lng: 86.0833, icon: "🕉️", description: "Temple with snow views" }
];

const recentSearches = [
  { name: "Pokhara", type: "city", icon: "🏞️" },
  { name: "Chitwan National Park", type: "park", icon: "🦏" },
  { name: "Nagarkot", type: "viewpoint", icon: "🌅" },
  { name: "Lumbini", type: "temple", icon: "☸️" }
];

const quickCategories = [
  { name: "Tourist Spots", icon: Star, color: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-900/20", filter: ["landmark", "viewpoint", "temple"] },
  { name: "Airports", icon: Plane, color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-900/20", filter: ["airport"] },
  { name: "Mountains", icon: Mountain, color: "text-slate-600", bgColor: "bg-slate-50 dark:bg-slate-900/20", filter: ["mountain"] },
  { name: "National Parks", icon: TreePine, color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-900/20", filter: ["park"] },
  { name: "Cities", icon: Building2, color: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-900/20", filter: ["city"] },
  { name: "Temples", icon: Landmark, color: "text-amber-600", bgColor: "bg-amber-50 dark:bg-amber-900/20", filter: ["temple"] }
];

const searchPlaceholders = {
  en: "Search destinations across Nepal...",
  ne: "नेपालभरी गन्तव्यहरू खोज्नुहोस्...",
  hi: "नेपाल में गंतव्य खोजें...",
  new: "नेपालया सबे ठेगन खन्...",
  ta: "नेपालमा गन्तव्यहरू खोज्नुहोस्...",
  bho: "नेपाल में गंतव्य खोजीं...",
  mai: "नेपाल में गंतव्य खोजू..."
};

export function ModernSearchBar({
  placeholder,
  onSearch,
  onVoiceSearch,
  onAIAssist,
  onLocationSelect,
  currentLanguage,
  themeGradient = 'from-blue-500 via-purple-500 to-pink-500'
}: ModernSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string[] | null>(null);
  const [showDistanceMode, setShowDistanceMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentPlaceholder = placeholder || searchPlaceholders[currentLanguage as keyof typeof searchPlaceholders] || searchPlaceholders.en;

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Calculate distances (mock - in real app would use geolocation)
  const calculateDistances = (location: NepalLocation) => {
    const userLat = 27.7172; // Mock user location (Kathmandu)
    const userLng = 85.3240;
    
    // Haversine formula for straight-line distance
    const R = 6371; // Earth radius in km
    const dLat = (location.lat - userLat) * Math.PI / 180;
    const dLng = (location.lng - userLng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLat * Math.PI / 180) * Math.cos(location.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const shortDistance = R * c;
    
    // Road distance is typically 1.3-1.5x straight line distance in Nepal
    const roadDistance = shortDistance * 1.4;
    
    return {
      ...location,
      shortDistance: Math.round(shortDistance),
      roadDistance: Math.round(roadDistance)
    };
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        onSearch(searchQuery);
        setIsSearching(false);
        setShowSuggestions(false);
      }, 500);
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    onVoiceSearch();
    
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setSearchQuery("Pokhara");
        setShowSuggestions(true);
        setIsExpanded(true);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLocationClick = (location: NepalLocation) => {
    const locationWithDistance = calculateDistances(location);
    onLocationSelect(locationWithDistance);
    setSearchQuery(location.name);
    if (!showDistanceMode) {
      setIsExpanded(false);
      setShowSuggestions(false);
    }
  };

  // Filter locations based on search and category
  const getFilteredLocations = () => {
    let filtered = nepalLocations;
    
    // Filter by category
    if (selectedCategory && selectedCategory.length > 0) {
      filtered = filtered.filter(loc => selectedCategory.includes(loc.type));
    }
    
    // Filter by search query
    if (searchQuery.length > 0) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(loc => 
        loc.name.toLowerCase().includes(query) ||
        loc.district?.toLowerCase().includes(query) ||
        loc.province?.toLowerCase().includes(query) ||
        loc.description?.toLowerCase().includes(query)
      );
    }
    
    return filtered.slice(0, 20); // Limit to 20 results
  };

  const filteredLocations = getFilteredLocations();

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        layout
        className="relative"
      >
        <Card 
          className={`backdrop-blur-2xl bg-gradient-to-br from-white/98 via-white/95 to-white/98 dark:from-slate-900/98 dark:via-slate-900/95 dark:to-slate-900/98 border-2 transition-all duration-500 overflow-hidden ${
            isExpanded 
              ? 'shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] ring-4 ring-blue-500/30 border-blue-300/60 dark:border-blue-700/60' 
              : 'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.25)] border-slate-300/60 dark:border-slate-700/60 hover:ring-2 hover:ring-blue-500/20'
          }`}
          onClick={() => !isExpanded && setIsExpanded(true)}
        >
          {/* Top Gradient Accent */}
          <div className={`h-1.5 bg-gradient-to-r ${themeGradient}`} />
          
          {/* Main Search Input */}
          <div className="flex items-center p-5 gap-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <div className={`p-4 rounded-2xl transition-all duration-300 ${
                isExpanded 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl shadow-blue-500/40' 
                  : 'bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-900/40 dark:to-purple-900/40 hover:from-blue-200 hover:to-purple-300 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50'
              }`}>
                {isSearching ? (
                  <Loader2 className={`h-6 w-6 animate-spin ${isExpanded ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                ) : (
                  <Search className={`h-6 w-6 ${isExpanded ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                )}
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1"
                >
                  <Input
                    ref={inputRef}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                      setSelectedCategory(null);
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder={currentPlaceholder}
                    className="border-0 bg-transparent focus:ring-0 text-lg text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-500"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 cursor-pointer"
                >
                  <span className="text-slate-600 dark:text-slate-400 text-lg">
                    {currentPlaceholder}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Voice Search - Larger and More Prominent */}
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVoiceSearch();
                  }}
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    isListening 
                      ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl shadow-red-500/40 animate-pulse scale-110' 
                      : 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/50 dark:hover:to-emerald-900/50 text-green-600 dark:text-green-400 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {isListening ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
                </Button>
              </motion.div>

              {/* AI Assist - Larger and More Prominent */}
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAIAssist();
                  }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 text-purple-600 dark:text-purple-400 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <Zap className="h-7 w-7" />
                </Button>
              </motion.div>

              {/* Distance Mode Toggle */}
              {isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDistanceMode(!showDistanceMode);
                    }}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      showDistanceMode
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/40 dark:hover:to-blue-800/40 text-blue-600 dark:text-blue-400'
                    }`}
                  >
                    <Maximize2 className="h-5 w-5" />
                  </Button>
                </motion.div>
              )}

              {/* Close Button */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                      setShowSuggestions(false);
                      setSearchQuery("");
                      setSelectedCategory(null);
                      setShowDistanceMode(false);
                    }}
                    className="p-3 rounded-xl hover:bg-gradient-to-br hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/40 dark:hover:to-red-800/40 text-red-500 dark:text-red-400 transition-all duration-300 hover:shadow-md"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Quick Categories */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-5 pb-4 border-b border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {quickCategories.map((category, index) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory?.some(c => category.filter.includes(c));
                  return (
                    <motion.button
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(isSelected ? null : category.filter);
                        setSearchQuery("");
                        setShowSuggestions(true);
                      }}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                        isSelected
                          ? `${category.bgColor} ${category.color} shadow-lg ring-2 ring-offset-2 ${category.color.replace('text-', 'ring-')} scale-105`
                          : `${category.bgColor} ${category.color} hover:shadow-md hover:scale-105`
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{category.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {(isExpanded && showSuggestions) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ScrollArea className="max-h-[60vh]">
                  {/* Recent Searches */}
                  {searchQuery.length === 0 && !selectedCategory && (
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                            <History className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                          </div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            Recent Searches
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {recentSearches.map((item, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchQuery(item.name);
                              setShowSuggestions(true);
                            }}
                            className="flex items-center gap-3 p-3 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 dark:hover:from-slate-800 dark:hover:to-slate-800/50 rounded-xl transition-all duration-300 text-left border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-md"
                          >
                            <div className="text-2xl">{item.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-slate-800 dark:text-slate-200 truncate text-sm">
                                {item.name}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                                {item.type}
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search Results */}
                  {(searchQuery.length > 0 || selectedCategory) && (
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40">
                          <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {filteredLocations.length} Destinations Found
                        </span>
                      </div>
                      <div className="space-y-2">
                        {filteredLocations.map((location, index) => {
                          const locationWithDistance = calculateDistances(location);
                          return (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.03 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLocationClick(location);
                              }}
                              className="w-full group flex items-center gap-3 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-xl transition-all duration-300 text-left border border-transparent hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-lg"
                            >
                              <div className="text-3xl p-2 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 flex-shrink-0">
                                {location.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                  {location.name}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                                  <MapPinned className="h-3 w-3" />
                                  <span className="truncate">
                                    {location.district && `${location.district}, `}
                                    {location.province}
                                  </span>
                                </div>
                                {location.description && (
                                  <div className="text-xs text-slate-400 dark:text-slate-500 mt-1 truncate">
                                    {location.description}
                                  </div>
                                )}
                                {showDistanceMode && (
                                  <div className="flex gap-3 mt-2">
                                    <div className="flex items-center gap-1 text-xs">
                                      <Navigation2 className="h-3 w-3 text-green-500" />
                                      <span className="text-green-600 dark:text-green-400 font-medium">
                                        {locationWithDistance.shortDistance} km
                                      </span>
                                      <span className="text-slate-400">direct</span>
                                    </div>
                                    <Separator orientation="vertical" className="h-4" />
                                    <div className="flex items-center gap-1 text-xs">
                                      <Route className="h-3 w-3 text-blue-500" />
                                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                                        {locationWithDistance.roadDistance} km
                                      </span>
                                      <span className="text-slate-400">by road</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex-shrink-0 p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                                <Navigation className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Voice Recognition Indicator */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute -bottom-24 left-1/2 transform -translate-x-1/2"
            >
              <Card className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-2xl shadow-red-500/50 border-0">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="p-2 bg-white/20 rounded-full"
                  >
                    <Mic className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <div className="font-semibold">Listening...</div>
                    <div className="text-xs text-white/80">Speak your destination</div>
                  </div>
                  <motion.div
                    className="flex gap-1"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-white rounded-full"
                        animate={{ height: ["8px", "20px", "8px"] }}
                        transition={{ 
                          duration: 0.8, 
                          repeat: Infinity,
                          delay: i * 0.1 
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
