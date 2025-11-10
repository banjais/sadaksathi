import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  X,
  Navigation,
  Clock,
  MapPin,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Check,
  Star,
  DollarSign,
  Fuel,
  Camera,
  ThermometerSun,
  Wind,
  Eye,
  Droplets,
  Route as RouteIcon
} from "lucide-react";
import type { LanguageCode } from "../utils/translations";
import {
  RouteAlternative,
  RouteIssue,
  WeatherForecast,
  getTrafficColor,
  getTrafficLabel,
  getIssueIcon,
  getIssueColor,
  getWeatherIcon,
  compareRoutes
} from "../utils/routeAlternatives";

interface RouteAlternativesProps {
  currentLanguage: LanguageCode;
  alternatives: RouteAlternative[];
  currentRoute?: RouteAlternative;
  weatherForecast: WeatherForecast[];
  onSelectRoute: (route: RouteAlternative) => void;
  onClose: () => void;
}

export function RouteAlternatives({
  currentLanguage,
  alternatives,
  currentRoute,
  weatherForecast,
  onSelectRoute,
  onClose
}: RouteAlternativesProps) {
  const [selectedRoute, setSelectedRoute] = useState<RouteAlternative | null>(
    currentRoute || alternatives.find(r => r.recommended) || alternatives[0]
  );
  const [activeTab, setActiveTab] = useState('routes');

  const handleSelectRoute = (route: RouteAlternative) => {
    setSelectedRoute(route);
  };

  const handleConfirm = () => {
    if (selectedRoute) {
      onSelectRoute(selectedRoute);
      onClose();
    }
  };

  const fastestRoute = alternatives.reduce((prev, curr) => 
    curr.durationWithTraffic < prev.durationWithTraffic ? curr : prev
  );

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
        className="w-full max-w-6xl max-h-[90vh] flex flex-col"
      >
        <Card className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-700/50 shadow-2xl flex flex-col h-full">
          {/* Header */}
          <CardHeader className="border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                  <RouteIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Route Alternatives</CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {alternatives.length} routes available • Choose the best option
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="mx-6 mt-4">
                <TabsTrigger value="routes" className="gap-2">
                  <Navigation className="h-4 w-4" />
                  Routes ({alternatives.length})
                </TabsTrigger>
                <TabsTrigger value="incidents" className="gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Incidents
                </TabsTrigger>
                <TabsTrigger value="weather" className="gap-2">
                  <ThermometerSun className="h-4 w-4" />
                  Weather
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1">
                {/* Routes Tab */}
                <TabsContent value="routes" className="p-6 space-y-4 m-0">
                  {alternatives.map((route, index) => {
                    const isSelected = selectedRoute?.id === route.id;
                    const isCurrent = currentRoute?.id === route.id;
                    const comparison = currentRoute ? compareRoutes(currentRoute, route) : null;

                    return (
                      <motion.div
                        key={route.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all ${
                            isSelected
                              ? 'border-2 border-blue-500 shadow-lg'
                              : 'border border-slate-200 dark:border-slate-700 hover:border-blue-300'
                          }`}
                          onClick={() => handleSelectRoute(route)}
                        >
                          <CardContent className="p-4">
                            {/* Route Header */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-lg">{route.name}</h3>
                                  {route.recommended && (
                                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 gap-1">
                                      <Star className="h-3 w-3" />
                                      Recommended
                                    </Badge>
                                  )}
                                  {isCurrent && (
                                    <Badge variant="outline" className="gap-1">
                                      <Check className="h-3 w-3" />
                                      Current
                                    </Badge>
                                  )}
                                  {route.id === fastestRoute.id && !route.recommended && (
                                    <Badge variant="outline" className="gap-1">
                                      ⚡ Fastest
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {route.description}
                                </p>
                              </div>
                              {isSelected && (
                                <div className="p-2 rounded-full bg-blue-500">
                                  <Check className="h-4 w-4 text-white" />
                                </div>
                              )}
                            </div>

                            {/* Key Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-3">
                              <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <Clock className="h-4 w-4 text-blue-500" />
                                </div>
                                <div className="font-semibold">{route.durationWithTraffic} min</div>
                                <div className="text-xs text-slate-500">
                                  {route.duration !== route.durationWithTraffic && (
                                    <span className="text-orange-500">
                                      +{route.durationWithTraffic - route.duration} traffic
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                  <Navigation className="h-4 w-4 text-green-500" />
                                </div>
                                <div className="font-semibold">{route.distance.toFixed(1)} km</div>
                                <div className="text-xs text-slate-500">Distance</div>
                              </div>

                              <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <div 
                                  className="w-3 h-3 rounded-full mx-auto mb-1"
                                  style={{ backgroundColor: getTrafficColor(route.averageTraffic) }}
                                />
                                <div className="font-semibold text-sm">
                                  {getTrafficLabel(route.averageTraffic)}
                                </div>
                              </div>
                            </div>

                            {/* Comparison with current route */}
                            {comparison && !isCurrent && (
                              <div className="flex gap-2 mb-3">
                                {comparison.timeSaved !== 0 && (
                                  <Badge 
                                    variant="outline" 
                                    className={`gap-1 ${
                                      comparison.timeSaved > 0 
                                        ? 'text-green-600 dark:text-green-400' 
                                        : 'text-red-600 dark:text-red-400'
                                    }`}
                                  >
                                    {comparison.timeSaved > 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                                    {Math.abs(comparison.timeSaved)} min {comparison.timeSaved > 0 ? 'faster' : 'slower'}
                                  </Badge>
                                )}
                                {comparison.distanceSaved !== 0 && (
                                  <Badge 
                                    variant="outline"
                                    className={`gap-1 ${
                                      comparison.distanceSaved > 0 
                                        ? 'text-green-600 dark:text-green-400' 
                                        : 'text-red-600 dark:text-red-400'
                                    }`}
                                  >
                                    {Math.abs(comparison.distanceSaved).toFixed(1)} km {comparison.distanceSaved > 0 ? 'shorter' : 'longer'}
                                  </Badge>
                                )}
                              </div>
                            )}

                            {/* Via Roads */}
                            <div className="mb-3">
                              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                                Via:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {route.viaRoads.map((road, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {road}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Advantages & Disadvantages */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div>
                                <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">
                                  ✓ Advantages
                                </div>
                                <ul className="text-xs space-y-0.5">
                                  {route.advantages.slice(0, 3).map((adv, i) => (
                                    <li key={i} className="text-slate-600 dark:text-slate-400">
                                      • {adv}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <div className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-1">
                                  ⚠ Consider
                                </div>
                                <ul className="text-xs space-y-0.5">
                                  {route.disadvantages.slice(0, 3).map((dis, i) => (
                                    <li key={i} className="text-slate-600 dark:text-slate-400">
                                      • {dis}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Issues Alert */}
                            {route.issues.length > 0 && (
                              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                <div className="flex items-center gap-2 text-xs">
                                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                                  <span className="font-medium text-amber-900 dark:text-amber-100">
                                    {route.issues.length} issue{route.issues.length > 1 ? 's' : ''} on this route
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Attractions */}
                            {route.attractions.length > 0 && (
                              <div className="mt-3">
                                <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                                  Points of Interest:
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {route.attractions.slice(0, 4).map((attr) => (
                                    <Badge key={attr.id} variant="outline" className="gap-1 text-xs">
                                      {attr.type === 'temple' && '🛕'}
                                      {attr.type === 'viewpoint' && '🏔️'}
                                      {attr.type === 'restaurant' && '🍽️'}
                                      {attr.type === 'gas' && '⛽'}
                                      {attr.type === 'hotel' && '🏨'}
                                      {attr.name}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Costs */}
                            <div className="flex gap-3 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                              {route.tolls && route.tolls > 0 && (
                                <div className="flex items-center gap-1 text-xs">
                                  <DollarSign className="h-3 w-3 text-slate-400" />
                                  <span className="text-slate-600 dark:text-slate-400">
                                    Toll: ₹{route.tolls}
                                  </span>
                                </div>
                              )}
                              {route.fuelCost && (
                                <div className="flex items-center gap-1 text-xs">
                                  <Fuel className="h-3 w-3 text-slate-400" />
                                  <span className="text-slate-600 dark:text-slate-400">
                                    Fuel: ₹{route.fuelCost}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Recommendation reason */}
                            {route.recommended && route.recommendationReason && (
                              <div className="mt-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <div className="flex items-start gap-2">
                                  <Star className="h-4 w-4 text-blue-500 mt-0.5" />
                                  <p className="text-xs text-blue-700 dark:text-blue-300">
                                    {route.recommendationReason}
                                  </p>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </TabsContent>

                {/* Incidents Tab */}
                <TabsContent value="incidents" className="p-6 space-y-3 m-0">
                  {alternatives.flatMap(r => r.issues).length === 0 ? (
                    <div className="text-center py-12">
                      <Check className="h-16 w-16 mx-auto mb-4 text-green-500" />
                      <p className="text-slate-500 dark:text-slate-400">
                        No incidents reported on any route
                      </p>
                    </div>
                  ) : (
                    alternatives.map((route) => 
                      route.issues.map((issue) => (
                        <Card key={issue.id} className="border-l-4" style={{ 
                          borderLeftColor: issue.severity === 'critical' ? '#ef4444' : 
                                          issue.severity === 'high' ? '#f97316' : 
                                          issue.severity === 'medium' ? '#eab308' : '#84cc16'
                        }}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="text-3xl">{getIssueIcon(issue.type)}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold capitalize">
                                    {issue.type.replace('_', ' ')}
                                  </h4>
                                  <Badge className={getIssueColor(issue.severity)}>
                                    {issue.severity}
                                  </Badge>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                  {issue.description}
                                </p>
                                <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {issue.location.address}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    +{issue.delayMinutes} min delay
                                  </div>
                                  <div>
                                    On: {route.name}
                                  </div>
                                </div>
                                {issue.estimatedClearTime && (
                                  <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                                    Expected clear by: {issue.estimatedClearTime.toLocaleTimeString()}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )
                  )}
                </TabsContent>

                {/* Weather Tab */}
                <TabsContent value="weather" className="p-6 space-y-4 m-0">
                  {/* Current Weather for Selected Route */}
                  {selectedRoute && selectedRoute.weatherConditions.length > 0 && (
                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-3">Current Weather on {selectedRoute.name}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                            <ThermometerSun className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                            <div className="font-semibold">
                              {selectedRoute.weatherConditions[0].temperature}°C
                            </div>
                            <div className="text-xs text-slate-500">Temperature</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                            <Wind className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                            <div className="font-semibold">
                              {selectedRoute.weatherConditions[0].windSpeed} km/h
                            </div>
                            <div className="text-xs text-slate-500">Wind</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                            <Eye className="h-5 w-5 mx-auto mb-1 text-slate-500" />
                            <div className="font-semibold">
                              {selectedRoute.weatherConditions[0].visibility} km
                            </div>
                            <div className="text-xs text-slate-500">Visibility</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                            <Droplets className="h-5 w-5 mx-auto mb-1 text-cyan-500" />
                            <div className="font-semibold">
                              {selectedRoute.weatherConditions[0].humidity}%
                            </div>
                            <div className="text-xs text-slate-500">Humidity</div>
                          </div>
                        </div>

                        {selectedRoute.weatherConditions[0].warnings.length > 0 && (
                          <div className="mt-3 p-3 rounded-lg bg-amber-100 dark:bg-amber-900/20">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                              <div className="text-sm text-amber-900 dark:text-amber-100">
                                {selectedRoute.weatherConditions[0].warnings.join(', ')}
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Forecast */}
                  <div>
                    <h3 className="font-semibold mb-3">3-Day Forecast</h3>
                    <div className="space-y-3">
                      {weatherForecast.map((day, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="font-medium mb-3">
                              {day.date.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                              {day.hourly.map((hour, i) => (
                                <div 
                                  key={i}
                                  className="flex-shrink-0 text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 min-w-[80px]"
                                >
                                  <div className="text-xs text-slate-500 mb-1">{hour.time}</div>
                                  <div className="text-2xl mb-1">{getWeatherIcon(hour.condition)}</div>
                                  <div className="font-semibold text-sm">{Math.round(hour.temperature)}°C</div>
                                  {hour.precipitation > 30 && (
                                    <div className="text-xs text-blue-500 mt-1">
                                      {Math.round(hour.precipitation)}%
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {selectedRoute && (
                  <span>
                    Selected: <strong>{selectedRoute.name}</strong> • 
                    {selectedRoute.durationWithTraffic} min • {selectedRoute.distance.toFixed(1)} km
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleConfirm}
                  disabled={!selectedRoute}
                  className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  <Navigation className="h-4 w-4" />
                  Use This Route
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
