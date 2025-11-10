import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  MinusCircle,
  Car,
  Navigation,
  MapPin,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { getTranslation, type LanguageCode } from "../utils/translations";
import { 
  nepalRoads, 
  weatherData, 
  trafficData, 
  incidentReports,
  nearbyServices,
  getRoadStatusColor,
  getTrafficLevelColor,
  getSeverityColor
} from "../utils/mockData";
import type { NavigationMode } from "../App";

interface RealTimeDataCardsProps {
  activeMode: NavigationMode;
  currentLanguage: LanguageCode;
  isDarkMode: boolean;
}

export function RealTimeDataCards({ activeMode, currentLanguage, isDarkMode }: RealTimeDataCardsProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clear': return <CheckCircle className="w-4 h-4" />;
      case 'blocked': return <XCircle className="w-4 h-4" />;
      case 'one-lane': return <MinusCircle className="w-4 h-4" />;
      case 'construction': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 pointer-events-none">
      <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pointer-events-auto">
        {/* Weather Card */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader 
              className="pb-2 cursor-pointer"
              onClick={() => toggleCard('weather')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-orange-500" />
                  {getTranslation('weather', currentLanguage)}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {weatherData[0].location}
                  </Badge>
                  {expandedCard === 'weather' ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  }
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold">
                    {weatherData[0].temperature}°C
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {currentLanguage === 'ne' ? weatherData[0].conditionNe : weatherData[0].condition}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLastUpdated(new Date());
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              
              <AnimatePresence>
                {expandedCard === 'weather' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 space-y-2 border-t border-slate-200/50 dark:border-slate-700/50 pt-3"
                  >
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <div>
                          <div className="text-xs text-slate-500">{getTranslation('humidity', currentLanguage)}</div>
                          <div className="font-medium">{weatherData[0].humidity}%</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="text-xs text-slate-500">{getTranslation('windSpeed', currentLanguage)}</div>
                          <div className="font-medium">{weatherData[0].windSpeed} km/h</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-purple-500" />
                        <div>
                          <div className="text-xs text-slate-500">Visibility</div>
                          <div className="font-medium">{weatherData[0].visibility} km</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Road Status Card */}
        {activeMode !== 'drive' && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <CardHeader 
                className="pb-2 cursor-pointer"
                onClick={() => toggleCard('roads')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-blue-500" />
                    {getTranslation('roadStatus', currentLanguage)}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {nepalRoads.filter(road => road.status === 'clear').length} Clear
                    </Badge>
                    {expandedCard === 'roads' ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    }
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {nepalRoads.slice(0, expandedCard === 'roads' ? nepalRoads.length : 2).map((road) => (
                    <div
                      key={road.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-2">
                        <div className={getRoadStatusColor(road.status)}>
                          {getStatusIcon(road.status)}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {currentLanguage === 'ne' ? road.nameNe : road.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {currentLanguage === 'ne' ? road.descriptionNe : road.description}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={road.status === 'clear' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {getTranslation(road.status === 'clear' ? 'roadClear' : 
                                       road.status === 'blocked' ? 'roadBlocked' : 
                                       'oneLaneOpen', currentLanguage)}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                {!expandedCard && nepalRoads.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-xs"
                    onClick={() => toggleCard('roads')}
                  >
                    +{nepalRoads.length - 2} more roads
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Traffic Card */}
        {(activeMode === 'traffic' || activeMode === 'navigation') && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <CardHeader 
                className="pb-2 cursor-pointer"
                onClick={() => toggleCard('traffic')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Car className="w-4 h-4 text-red-500" />
                    {getTranslation('traffic', currentLanguage)}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Live
                    </Badge>
                    {expandedCard === 'traffic' ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    }
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {trafficData.map((traffic) => (
                    <div
                      key={traffic.routeId}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-2">
                        <div className={getTrafficLevelColor(traffic.trafficLevel)}>
                          <Car className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {currentLanguage === 'ne' ? traffic.routeNameNe : traffic.routeName}
                          </div>
                          <div className="text-xs text-slate-500">
                            {traffic.averageSpeed} km/h • {traffic.travelTime}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={traffic.trafficLevel === 'light' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {getTranslation(traffic.trafficLevel === 'light' ? 'lightTraffic' : 'heavyTraffic', currentLanguage)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Nearby Services Card */}
        {activeMode === 'nearby' && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <CardHeader 
                className="pb-2 cursor-pointer"
                onClick={() => toggleCard('services')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-500" />
                    {getTranslation('nearby', currentLanguage)}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {nearbyServices.filter(s => s.isOpen).length} Open
                    </Badge>
                    {expandedCard === 'services' ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    }
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {nearbyServices.slice(0, expandedCard === 'services' ? nearbyServices.length : 3).map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          service.type === 'hospital' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' :
                          service.type === 'police' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                          service.type === 'fuel' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' :
                          service.type === 'mechanic' ? 'bg-gray-100 dark:bg-gray-900/30 text-gray-600' :
                          service.type === 'restaurant' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' :
                          'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                        }`}>
                          {service.type === 'hospital' ? '🏥' :
                           service.type === 'police' ? '👮' :
                           service.type === 'fuel' ? '⛽' :
                           service.type === 'mechanic' ? '🔧' :
                           service.type === 'restaurant' ? '🍽️' : '🏨'}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {currentLanguage === 'ne' ? service.nameNe : service.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {service.distance} km • ⭐ {service.rating}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={service.isOpen ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {service.isOpen ? 'Open' : 'Closed'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3 h-3" />
            Last updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
