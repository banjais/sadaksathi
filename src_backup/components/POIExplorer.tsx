import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  X,
  Search,
  MapPin,
  Star,
  Phone,
  Clock,
  DollarSign,
  Navigation,
  Filter,
  Heart,
  Share2,
  ChevronRight
} from "lucide-react";
import type { LanguageCode } from "../utils/translations";
import {
  POI,
  POICategory,
  POI_CATEGORIES,
  POI_TYPE_INFO,
  getPOIsByCategory
} from "../utils/poiCategories";

interface POIExplorerProps {
  currentLanguage: LanguageCode;
  pois: POI[];
  onClose: () => void;
  onSelectPOI: (poi: POI) => void;
  onNavigateTo: (poi: POI) => void;
}

export function POIExplorer({
  currentLanguage,
  pois,
  onClose,
  onSelectPOI,
  onNavigateTo
}: POIExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<POICategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredPOIs = pois.filter(poi => {
    const matchesCategory = selectedCategory === 'all' || poi.categories.includes(selectedCategory);
    const matchesSearch = poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         poi.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (poiId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(poiId)) {
      newFavorites.delete(poiId);
    } else {
      newFavorites.add(poiId);
    }
    setFavorites(newFavorites);
  };

  const topCategories: POICategory[] = ['sos', 'daily', 'food', 'stay', 'tourist', 'youth'];
  const allCategories = Object.values(POI_CATEGORIES);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-7xl max-h-[95vh] flex flex-col"
      >
        {/* Modern Glass Card */}
        <Card className="backdrop-blur-2xl bg-gradient-to-br from-white/95 to-white/80 dark:from-slate-900/95 dark:to-slate-800/80 border-0 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex flex-col h-full overflow-hidden">
          {/* Animated Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient" />
            <div className="relative p-6 border-b border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Explore Places
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Discover amazing places around you
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search for places, restaurants, hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 rounded-2xl"
                />
              </div>

              {/* Quick Category Pills */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory('all')}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ✨ All Places
                </motion.button>
                {topCategories.map((catId) => {
                  const cat = POI_CATEGORIES[catId];
                  return (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all ${
                        selectedCategory === cat.id
                          ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                          : 'bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden flex">
            {/* Categories Sidebar */}
            <div className="w-64 border-r border-slate-200/50 dark:border-slate-700/50 p-4 overflow-y-auto">
              <h3 className="font-semibold text-sm text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
                All Categories
              </h3>
              <div className="space-y-1">
                {allCategories.map((cat) => {
                  const count = getPOIsByCategory(pois, cat.id).length;
                  return (
                    <motion.button
                      key={cat.id}
                      whileHover={{ x: 4 }}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                        selectedCategory === cat.id
                          ? `bg-gradient-to-r ${cat.gradient} text-white shadow-md`
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <div className="flex-1 text-left">
                        <div className={`font-medium text-sm ${
                          selectedCategory === cat.id ? 'text-white' : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {cat.name}
                        </div>
                        <div className={`text-xs ${
                          selectedCategory === cat.id ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {count} places
                        </div>
                      </div>
                      {selectedCategory === cat.id && (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* POI Grid */}
            <ScrollArea className="flex-1 p-6">
              {filteredPOIs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No places found</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPOIs.map((poi, index) => {
                    const typeInfo = POI_TYPE_INFO[poi.type];
                    const isFavorite = favorites.has(poi.id);

                    return (
                      <motion.div
                        key={poi.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="group"
                      >
                        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
                          <CardContent className="p-0">
                            {/* Image/Icon Header */}
                            <div 
                              className={`relative h-32 bg-gradient-to-br ${POI_CATEGORIES[poi.categories[0]]?.gradient || 'from-blue-500 to-purple-500'} flex items-center justify-center overflow-hidden`}
                            >
                              <div className="absolute inset-0 bg-black/10" />
                              <span className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                                {typeInfo.icon}
                              </span>
                              
                              {/* Favorite Button */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleFavorite(poi.id)}
                                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-lg z-20"
                              >
                                <Heart
                                  className={`h-4 w-4 ${
                                    isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600 dark:text-slate-400'
                                  }`}
                                />
                              </motion.button>

                              {/* Distance Badge */}
                              {poi.distance !== undefined && (
                                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-medium flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {poi.distance.toFixed(1)} km
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                              {/* Title & Rating */}
                              <div className="mb-2">
                                <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                                  {poi.name}
                                </h3>
                                {poi.rating && (
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                      <span className="font-medium">{poi.rating}</span>
                                    </div>
                                    {poi.reviews && (
                                      <span className="text-xs text-slate-500 dark:text-slate-400">
                                        ({poi.reviews} reviews)
                                      </span>
                                    )}
                                    {poi.priceRange && (
                                      <span className="text-sm text-green-600 dark:text-green-400 ml-auto">
                                        {poi.priceRange}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Type */}
                              <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 mb-2">
                                <span>{typeInfo.name}</span>
                                {poi.open !== undefined && (
                                  <>
                                    <span>•</span>
                                    <span className={poi.open ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                      {poi.open ? 'Open' : 'Closed'}
                                    </span>
                                  </>
                                )}
                              </div>

                              {/* Description */}
                              {poi.description && (
                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                                  {poi.description}
                                </p>
                              )}

                              {/* Categories */}
                              <div className="flex flex-wrap gap-1 mb-3">
                                {poi.categories.slice(0, 3).map((catId) => {
                                  const cat = POI_CATEGORIES[catId];
                                  return (
                                    <Badge
                                      key={catId}
                                      variant="outline"
                                      className="text-xs px-2 py-0.5 border-0"
                                      style={{ 
                                        background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}10)`,
                                        color: cat.color
                                      }}
                                    >
                                      {cat.emoji}
                                    </Badge>
                                  );
                                })}
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => onNavigateTo(poi)}
                                  className="flex-1 gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                                >
                                  <Navigation className="h-4 w-4" />
                                  Navigate
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => onSelectPOI(poi)}
                                  className="gap-2"
                                >
                                  Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Footer Stats */}
          <div className="border-t border-slate-200/50 dark:border-slate-700/50 p-4 bg-gradient-to-r from-slate-50/50 to-white/50 dark:from-slate-900/50 dark:to-slate-800/50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-slate-600 dark:text-slate-400">
                  Showing <strong className="text-slate-900 dark:text-white">{filteredPOIs.length}</strong> places
                </span>
                {selectedCategory !== 'all' && (
                  <Badge className={`bg-gradient-to-r ${POI_CATEGORIES[selectedCategory].gradient}`}>
                    {POI_CATEGORIES[selectedCategory].name}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedCategory('all')}
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
