import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  X,
  Navigation,
  Star,
  Phone,
  Globe,
  Clock,
  MapPin,
  Share2,
  Heart,
  Bookmark,
  DollarSign,
  Info,
  Image as ImageIcon,
  Users
} from "lucide-react";
import type { LanguageCode } from "../utils/translations";
import { POI, POI_TYPE_INFO, POI_CATEGORIES } from "../utils/poiCategories";

interface POIDetailPanelProps {
  currentLanguage: LanguageCode;
  poi: POI;
  onClose: () => void;
  onNavigate: () => void;
}

export function POIDetailPanel({
  currentLanguage,
  poi,
  onClose,
  onNavigate
}: POIDetailPanelProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const typeInfo = POI_TYPE_INFO[poi.type];
  const primaryCategory = POI_CATEGORIES[poi.categories[0]];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] z-[90] shadow-2xl"
    >
      <Card className="h-full rounded-none border-l border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col overflow-hidden">
        {/* Hero Image/Header */}
        <div className="relative h-64 overflow-hidden">
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${primaryCategory.gradient}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-9xl opacity-30"
              >
                {typeInfo.icon}
              </motion.span>
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Action buttons */}
          <div className="absolute top-4 left-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-lg"
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-600 dark:text-slate-400'
                }`}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSaved(!isSaved)}
              className="p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-lg"
            >
              <Bookmark
                className={`h-5 w-5 ${
                  isSaved ? 'fill-blue-500 text-blue-500' : 'text-slate-600 dark:text-slate-400'
                }`}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-lg"
            >
              <Share2 className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </motion.button>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white mb-2">{poi.name}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`bg-gradient-to-r ${primaryCategory.gradient} text-white border-0`}>
                {primaryCategory.icon} {primaryCategory.name}
              </Badge>
              {poi.distance !== undefined && (
                <Badge variant="secondary" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
                  <MapPin className="h-3 w-3 mr-1" />
                  {poi.distance.toFixed(1)} km
                </Badge>
              )}
              {poi.open !== undefined && (
                <Badge 
                  className={`${
                    poi.open 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {poi.open ? '● Open' : '● Closed'}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="overview" className="p-6 space-y-6 m-0">
                {/* Rating */}
                {poi.rating && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-lg">{poi.rating}</span>
                      </div>
                      {poi.reviews && (
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          ({poi.reviews} reviews)
                        </span>
                      )}
                    </div>
                    {poi.priceRange && (
                      <div className="flex items-center gap-1 ml-auto">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {poi.priceRange}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Type */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-3xl">{typeInfo.icon}</span>
                  <div>
                    <div className="font-medium">{typeInfo.name}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {poi.type.split('_').join(' ')}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {poi.description && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      About
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {poi.description}
                    </p>
                  </div>
                )}

                <Separator />

                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Perfect For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {poi.categories.map((catId) => {
                      const cat = POI_CATEGORIES[catId];
                      return (
                        <Badge
                          key={catId}
                          variant="outline"
                          className="px-3 py-1.5 border-0"
                          style={{
                            background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}10)`,
                            color: cat.color
                          }}
                        >
                          {cat.icon} {cat.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Amenities */}
                {poi.amenities && poi.amenities.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {poi.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-sm"
                        >
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="details" className="p-6 space-y-4 m-0">
                {/* Location */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium mb-1">Address</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {poi.location.address}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        {poi.location.lat.toFixed(6)}, {poi.location.lng.toFixed(6)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                {poi.phone && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium mb-1">Phone</div>
                        <a 
                          href={`tel:${poi.phone}`}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {poi.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hours */}
                {poi.hours && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium mb-1">Opening Hours</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {poi.hours}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Website */}
                {poi.website && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium mb-1">Website</div>
                        <a 
                          href={poi.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
                        >
                          {poi.website}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="p-6 m-0">
                <div className="text-center py-12">
                  <Star className="h-16 w-16 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                  <h3 className="font-semibold mb-2">No Reviews Yet</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Be the first to review this place
                  </p>
                  <Button className="mt-4">Write a Review</Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex gap-3">
            <Button
              onClick={onNavigate}
              className="flex-1 gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
            >
              <Navigation className="h-4 w-4" />
              Navigate Here
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open(`tel:${poi.phone}`)}
              disabled={!poi.phone}
            >
              <Phone className="h-4 w-4" />
              Call
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
