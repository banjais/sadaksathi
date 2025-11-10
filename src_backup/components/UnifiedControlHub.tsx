import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Plus,
  X,
  Map,
  Layers,
  MapPin,
  Navigation,
  Info,
  User,
  Bell,
  Volume2,
  Shield,
  Sliders,
  Settings
} from "lucide-react";
import type { LanguageCode } from "../utils/translations";
import type { POI, POICategory } from "../utils/poiCategories";
import { POI_CATEGORIES } from "../utils/poiCategories";

export type MapLayer = 'standard' | 'satellite' | 'terrain' | 'hybrid' | 'dark' | 'light';

export interface LayerOptions {
  // Map layers
  mapLayer: MapLayer;
  show3D: boolean;
  
  // Overlays
  showTraffic: boolean;
  showIncidents: boolean;
  showWeather: boolean;
  showConstruction: boolean;
  
  // Display
  showLabels: boolean;
  showBuildings: boolean;
  showParks: boolean;
}

export interface POIFilters {
  // Emergency & Essential
  showEmergency: boolean;
  showMedical: boolean;
  showFuel: boolean;
  
  // Food & Stay
  showFood: boolean;
  showStay: boolean;
  
  // Activities
  showTourist: boolean;
  showYouth: boolean;
  showFamily: boolean;
  showAdventure: boolean;
  showNature: boolean;
  
  // Services
  showShopping: boolean;
  showEducation: boolean;
  showWorship: boolean;
}

interface UnifiedControlHubProps {
  currentLanguage: LanguageCode;
  layerOptions: LayerOptions;
  poiFilters: POIFilters;
  onLayerChange: (options: LayerOptions) => void;
  onPOIFilterChange: (filters: POIFilters) => void;
  onOpenPOIExplorer: () => void;
  onOpenPreferences: () => void;
  isDarkMode?: boolean;
}

export function UnifiedControlHub({
  currentLanguage,
  layerOptions,
  poiFilters,
  onLayerChange,
  onPOIFilterChange,
  onOpenPOIExplorer,
  onOpenPreferences,
  isDarkMode
}: UnifiedControlHubProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'layers' | 'pois' | 'overlays' | 'settings'>('layers');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [voiceNavEnabled, setVoiceNavEnabled] = useState(true);
  const [emergencyAlertsEnabled, setEmergencyAlertsEnabled] = useState(true);

  // Map Layers
  const mapLayers = [
    { id: 'standard' as MapLayer, name: 'Standard', icon: '🗺️', desc: 'Default view' },
    { id: 'satellite' as MapLayer, name: 'Satellite', icon: '🛰️', desc: 'Aerial imagery' },
    { id: 'terrain' as MapLayer, name: 'Terrain', icon: '⛰️', desc: 'Topographic' },
    { id: 'hybrid' as MapLayer, name: 'Hybrid', icon: '🗺️', desc: 'Sat + labels' },
    { id: 'dark' as MapLayer, name: 'Dark', icon: '🌙', desc: 'Night mode' },
    { id: 'light' as MapLayer, name: 'Light', icon: '☀️', desc: 'Day mode' }
  ];

  // Overlays
  const overlays = [
    { key: 'showTraffic' as const, name: 'Traffic Flow', icon: '🚦', color: 'text-red-500' },
    { key: 'showIncidents' as const, name: 'Road Incidents', icon: '⚠️', color: 'text-orange-500' },
    { key: 'showWeather' as const, name: 'Weather', icon: '🌤️', color: 'text-blue-500' },
    { key: 'showConstruction' as const, name: 'Construction', icon: '🚧', color: 'text-amber-500' }
  ];

  // Display options
  const displayOptions = [
    { key: 'show3D' as const, name: '3D Buildings', icon: '🏢' },
    { key: 'showLabels' as const, name: 'Place Labels', icon: '🏷️' },
    { key: 'showBuildings' as const, name: 'Buildings', icon: '🏛️' },
    { key: 'showParks' as const, name: 'Parks & Nature', icon: '🌳' }
  ];

  // POI Categories (organized by importance)
  const poiGroups = [
    {
      title: 'Essential Services',
      filters: [
        { key: 'showEmergency' as const, name: 'Emergency', icon: '🚨', color: 'text-red-600' },
        { key: 'showMedical' as const, name: 'Medical', icon: '⚕️', color: 'text-red-500' },
        { key: 'showFuel' as const, name: 'Fuel Stations', icon: '⛽', color: 'text-blue-600' }
      ]
    },
    {
      title: 'Food & Accommodation',
      filters: [
        { key: 'showFood' as const, name: 'Food & Dining', icon: '🍽️', color: 'text-orange-600' },
        { key: 'showStay' as const, name: 'Hotels & Stay', icon: '🏨', color: 'text-purple-600' }
      ]
    },
    {
      title: 'Activities & Interests',
      filters: [
        { key: 'showYouth' as const, name: 'Youth & Fun', icon: '🎉', color: 'text-pink-600' },
        { key: 'showFamily' as const, name: 'Family Places', icon: '👨‍👩‍👧', color: 'text-teal-600' },
        { key: 'showTourist' as const, name: 'Tourist Sites', icon: '📸', color: 'text-green-600' },
        { key: 'showAdventure' as const, name: 'Adventure', icon: '⛰️', color: 'text-emerald-600' },
        { key: 'showNature' as const, name: 'Nature', icon: '🦋', color: 'text-green-500' }
      ]
    },
    {
      title: 'Other Services',
      filters: [
        { key: 'showShopping' as const, name: 'Shopping', icon: '🛍️', color: 'text-pink-500' },
        { key: 'showEducation' as const, name: 'Education', icon: '🎓', color: 'text-blue-500' },
        { key: 'showWorship' as const, name: 'Worship', icon: '🙏', color: 'text-orange-500' }
      ]
    }
  ];

  // Count active filters
  const activeOverlays = overlays.filter(o => layerOptions[o.key]).length;
  const activePOIs = Object.values(poiFilters).filter(Boolean).length;
  const totalActive = activeOverlays + activePOIs;

  const handleLayerToggle = (key: keyof LayerOptions) => {
    onLayerChange({ ...layerOptions, [key]: !layerOptions[key] });
  };

  const handlePOIToggle = (key: keyof POIFilters) => {
    onPOIFilterChange({ ...poiFilters, [key]: !poiFilters[key] });
  };

  return (
    <div className="relative">
      {/* Expanded Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className="absolute bottom-20 right-0 w-96 max-h-[75vh] overflow-hidden"
          >
            <div className="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Map Controls</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Customize your view
                    </p>
                  </div>
                  {totalActive > 0 && (
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">
                      {totalActive} active
                    </Badge>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex flex-col h-full">
                <TabsList className="w-full rounded-none border-b grid grid-cols-4 bg-transparent">
                  <TabsTrigger value="layers" className="gap-1 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20">
                    <Map className="h-4 w-4" />
                    <span className="text-xs">Layers</span>
                  </TabsTrigger>
                  <TabsTrigger value="overlays" className="gap-1 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20">
                    <Layers className="h-4 w-4" />
                    <span className="text-xs">Data</span>
                  </TabsTrigger>
                  <TabsTrigger value="pois" className="gap-1 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs">Places</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="gap-1 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20">
                    <Settings className="h-4 w-4" />
                    <span className="text-xs">Settings</span>
                  </TabsTrigger>
                </TabsList>

                <ScrollArea className="flex-1 max-h-[calc(75vh-180px)]">
                  {/* Map Layers Tab */}
                  <TabsContent value="layers" className="p-4 m-0 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Base Map</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {mapLayers.map((layer) => (
                          <motion.button
                            key={layer.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onLayerChange({ ...layerOptions, mapLayer: layer.id })}
                            className={`p-3 rounded-lg border-2 text-left transition-all ${
                              layerOptions.mapLayer === layer.id
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                            }`}
                          >
                            <div className="text-2xl mb-1">{layer.icon}</div>
                            <div className="font-medium text-sm">{layer.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{layer.desc}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-3">Display Options</h4>
                      <div className="space-y-2">
                        {displayOptions.map((opt) => (
                          <div
                            key={opt.key}
                            className={`flex items-center justify-between p-2.5 rounded-lg transition-colors ${
                              layerOptions[opt.key] ? 'bg-slate-50 dark:bg-slate-800/50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{opt.icon}</span>
                              <span className="text-sm">{opt.name}</span>
                            </div>
                            <Switch
                              checked={layerOptions[opt.key]}
                              onCheckedChange={() => handleLayerToggle(opt.key)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Overlays Tab */}
                  <TabsContent value="overlays" className="p-4 m-0 space-y-3">
                    {overlays.map((overlay) => (
                      <motion.div
                        key={overlay.key}
                        whileHover={{ x: 2 }}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                          layerOptions[overlay.key]
                            ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{overlay.icon}</span>
                          <span className="font-medium">{overlay.name}</span>
                        </div>
                        <Switch
                          checked={layerOptions[overlay.key]}
                          onCheckedChange={() => handleLayerToggle(overlay.key)}
                        />
                      </motion.div>
                    ))}
                  </TabsContent>

                  {/* POIs Tab */}
                  <TabsContent value="pois" className="p-4 m-0 space-y-4">
                    <Button
                      onClick={onOpenPOIExplorer}
                      className="w-full gap-2 bg-gradient-to-r from-blue-500 to-purple-500"
                    >
                      <Navigation className="h-4 w-4" />
                      Explore All Places
                    </Button>

                    <Separator />

                    {poiGroups.map((group) => (
                      <div key={group.title}>
                        <h4 className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">
                          {group.title}
                        </h4>
                        <div className="space-y-1.5">
                          {group.filters.map((filter) => (
                            <motion.button
                              key={filter.key}
                              whileHover={{ x: 2 }}
                              onClick={() => handlePOIToggle(filter.key)}
                              className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all ${
                                poiFilters[filter.key]
                                  ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{filter.icon}</span>
                                <span className={`text-sm font-medium ${filter.color}`}>
                                  {filter.name}
                                </span>
                              </div>
                              {poiFilters[filter.key] && (
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  {/* Settings Tab */}
                  <TabsContent value="settings" className="p-4 m-0 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Quick Settings</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                          <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-blue-500" />
                            <span className="text-sm">Notifications</span>
                          </div>
                          <Switch
                            checked={notificationsEnabled}
                            onCheckedChange={setNotificationsEnabled}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                          <div className="flex items-center gap-3">
                            <Volume2 className="h-5 w-5 text-green-500" />
                            <span className="text-sm">Voice Navigation</span>
                          </div>
                          <Switch
                            checked={voiceNavEnabled}
                            onCheckedChange={setVoiceNavEnabled}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                          <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-orange-500" />
                            <span className="text-sm">Emergency Alerts</span>
                          </div>
                          <Switch
                            checked={emergencyAlertsEnabled}
                            onCheckedChange={setEmergencyAlertsEnabled}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Button
                        onClick={onOpenPreferences}
                        className="w-full gap-2 bg-gradient-to-r from-blue-500 to-purple-500"
                      >
                        <Sliders className="h-4 w-4" />
                        Advanced Preferences
                      </Button>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">Location Services</h4>
                      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div className="text-xs text-blue-700 dark:text-blue-300">
                            <p className="font-medium mb-1">Enable Location Access</p>
                            <p className="text-blue-600 dark:text-blue-400">
                              Click the 🔒 or ⓘ icon in your browser's address bar, then allow location access. If blocked by security policy, use the search bar to find your location.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-3 text-slate-600 dark:text-slate-400">About</h4>
                      <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex justify-between">
                          <span>Version</span>
                          <span className="font-medium">1.0.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Updated</span>
                          <span className="font-medium">Oct 16, 2025</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>

              {/* Footer - Action Buttons */}
              <div className="border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      onLayerChange({
                        mapLayer: 'standard',
                        show3D: false,
                        showTraffic: true,
                        showIncidents: true,
                        showWeather: false,
                        showConstruction: true,
                        showLabels: true,
                        showBuildings: true,
                        showParks: true
                      });
                      onPOIFilterChange({
                        showEmergency: true,
                        showMedical: false,
                        showFuel: true,
                        showFood: false,
                        showStay: false,
                        showTourist: false,
                        showYouth: false,
                        showFamily: false,
                        showAdventure: false,
                        showNature: false,
                        showShopping: false,
                        showEducation: false,
                        showWorship: false
                      });
                    }}
                    className="flex-1"
                  >
                    Reset All
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsExpanded(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="lg"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`h-14 w-14 rounded-full shadow-2xl transition-all ${
            isExpanded
              ? 'bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
              : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
          }`}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Active Badge */}
      {!isExpanded && totalActive > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold shadow-lg"
        >
          {totalActive}
        </motion.div>
      )}
    </div>
  );
}
