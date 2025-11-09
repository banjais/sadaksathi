import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Search,
  Mic,
  MicOff,
  MapPin,
  Zap,
  X,
  Navigation,
  Clock,
  Star,
  TrendingUp,
  Loader2,
  MapPinned,
  Fuel,
  Hotel,
  Utensils,
  Coffee,
  History,
  ArrowRight
} from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onVoiceSearch: () => void;
  onAIAssist: () => void;
  onLocationSelect: (location: string) => void;
  currentLanguage: string;
  themeGradient?: string;
}

const searchPlaceholders = {
  en: "Where do you want to go?",
  ne: "तपाईं कहाँ जान चाहनुहुन्छ?",
  hi: "आप कहाँ जाना चाहते हैं?",
  new: "छु गां वनेगु खाः?",
  ta: "तपाईं कत जाने हो?",
  bho: "रउआ कहाँ जाए चाहत बानी?",
  mai: "अहाँ कतए जाए चाहैत छी?"
};

const recentSearches = [
  { query: "Pokhara Airport", type: "airport", icon: "✈️" },
  { query: "Chitwan National Park", type: "attraction", icon: "🦏" },
  { query: "Nagarkot Sunrise Point", type: "viewpoint", icon: "🌅" },
  { query: "Thamel Kathmandu", type: "area", icon: "🏪" }
];

const popularDestinations = [
  { name: "Everest Base Camp", distance: "240 km", icon: "🏔️" },
  { name: "Lumbini", distance: "320 km", icon: "🏛️" },
  { name: "Annapurna Circuit", distance: "200 km", icon: "🥾" },
  { name: "Bandipur", distance: "150 km", icon: "🏘️" }
];

const quickCategories = [
  { name: "Gas Stations", icon: Fuel, color: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-900/20" },
  { name: "Hotels", icon: Hotel, color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
  { name: "Restaurants", icon: Utensils, color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-900/20" },
  { name: "Cafes", icon: Coffee, color: "text-amber-500", bgColor: "bg-amber-50 dark:bg-amber-900/20" }
];

export function SearchBar({ 
  placeholder, 
  onSearch, 
  onVoiceSearch, 
  onAIAssist, 
  onLocationSelect,
  currentLanguage,
  themeGradient = 'from-blue-500 via-purple-500 to-pink-500'
}: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentPlaceholder = placeholder || searchPlaceholders[currentLanguage as keyof typeof searchPlaceholders] || searchPlaceholders.en;

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        onSearch(searchQuery);
        setIsSearching(false);
        setIsExpanded(false);
        setShowSuggestions(false);
      }, 500);
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    onVoiceSearch();
    
    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setSearchQuery("Pokhara");
        setShowSuggestions(true);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    onLocationSelect(suggestion);
    setIsExpanded(false);
    setShowSuggestions(false);
  };

  return (
    <motion.div
      className="absolute top-24 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-2xl px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <motion.div
        layout
        className="relative"
      >
        <Card 
          className={`backdrop-blur-2xl bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-slate-900/95 border border-slate-200/60 dark:border-slate-700/60 shadow-2xl transition-all duration-500 overflow-hidden ${
            isExpanded ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] ring-2 ring-blue-500/20' : 'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.25)]'
          }`}
        >
          {/* Top Accent Line */}
          <div className={`h-1 bg-gradient-to-r ${themeGradient}`} />
          
          {/* Main Search Input */}
          <div className="flex items-center p-4 gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`p-3 rounded-xl transition-all duration-300 ${
                isExpanded 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30' 
                  : 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 hover:from-blue-200 hover:to-blue-300 dark:hover:from-blue-900/50 dark:hover:to-blue-800/50'
              }`}>
                {isSearching ? (
                  <Loader2 className={`h-5 w-5 animate-spin ${isExpanded ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                ) : (
                  <Search className={`h-5 w-5 ${isExpanded ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
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
                      setShowSuggestions(e.target.value.length >= 0);
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder={currentPlaceholder}
                    className="border-0 bg-transparent focus:ring-0 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-500"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 cursor-pointer"
                  onClick={() => setIsExpanded(true)}
                >
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    {currentPlaceholder}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              {/* Voice Search */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceSearch}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    isListening 
                      ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 animate-pulse' 
                      : 'hover:bg-gradient-to-br hover:from-green-100 hover:to-green-200 dark:hover:from-green-900/40 dark:hover:to-green-800/40 text-green-600 dark:text-green-400'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </motion.div>

              {/* AI Assist */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onAIAssist}
                  className="p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-900/40 dark:hover:to-purple-800/40 text-purple-600 dark:text-purple-400 transition-all duration-300 hover:shadow-md"
                >
                  <Zap className="h-4 w-4" />
                </Button>
              </motion.div>

              {/* Map Marker */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/40 dark:hover:to-blue-800/40 text-blue-600 dark:text-blue-400 transition-all duration-300 hover:shadow-md"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </motion.div>

              {/* Close Button (when expanded) */}
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
                    onClick={() => {
                      setIsExpanded(false);
                      setShowSuggestions(false);
                      setSearchQuery("");
                      setSelectedCategory(null);
                    }}
                    className="p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/40 dark:hover:to-red-800/40 text-red-500 dark:text-red-400 transition-all duration-300 hover:shadow-md"
                  >
                    <X className="h-4 w-4" />
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
              className="px-4 pb-3 border-b border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {quickCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setSearchQuery(category.name);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                        selectedCategory === category.name
                          ? `${category.bgColor} ${category.color} shadow-md ring-2 ring-offset-2 ${category.color.replace('text-', 'ring-')}`
                          : `${category.bgColor} ${category.color} hover:shadow-md hover:scale-105`
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category.name}</span>
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
                className="max-h-96 overflow-y-auto scrollbar-hide"
              >
                {/* Recent Searches */}
                {searchQuery.length === 0 && (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                          <History className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        </div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          Recent Searches
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                        Clear all
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((item, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSuggestionClick(item.query)}
                          className="w-full group flex items-center gap-3 p-3 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 dark:hover:from-slate-800 dark:hover:to-slate-800/50 rounded-xl transition-all duration-300 text-left border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-md"
                        >
                          <div className="text-2xl p-2 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {item.query}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                              {item.type}
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Results */}
                {searchQuery.length > 0 && (
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40">
                        <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Suggestions
                      </span>
                    </div>
                    <div className="space-y-2">
                      {popularDestinations
                        .filter(dest => dest.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((destination, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSuggestionClick(destination.name)}
                          className="w-full group flex items-center justify-between p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 rounded-xl transition-all duration-300 text-left border border-transparent hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl p-2 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
                              {destination.icon}
                            </div>
                            <div>
                              <div className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {destination.name}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <MapPinned className="h-3 w-3" />
                                {destination.distance} away
                              </div>
                            </div>
                          </div>
                          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                            <Navigation className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Destinations */}
                {searchQuery.length === 0 && (
                  <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40">
                        <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Popular in Nepal
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {popularDestinations.map((destination, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + index * 0.05, type: "spring" }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSuggestionClick(destination.name)}
                          className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:from-amber-50 hover:to-amber-100 dark:hover:from-amber-900/20 dark:hover:to-amber-800/20 rounded-xl transition-all duration-300 text-center border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-lg"
                        >
                          <div className="text-3xl mb-2">{destination.icon}</div>
                          <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                            {destination.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center gap-1">
                            <MapPinned className="h-3 w-3" />
                            {destination.distance}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
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
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
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