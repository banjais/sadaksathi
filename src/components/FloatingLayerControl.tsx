import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import {
  Plus,
  X,
  Map,
  Layers,
  Mountain,
  Satellite,
  Navigation2,
  Cloud,
  Zap,
  Camera,
  Users,
  MapPin,
  AlertTriangle,
  Compass,
  Eye,
  EyeOff,
  Building,
  Trees,
  Droplets,
  Sun,
  Moon
} from "lucide-react";

export type MapLayer = 'standard' | 'satellite' | 'terrain' | 'hybrid' | 'dark' | 'light';

export interface LayerOptions {
  // Map layers
  mapLayer: MapLayer;
  show3D: boolean;
  
  // Overlays
  showTraffic: boolean;
  showIncidents: boolean;
  showWeather: boolean;
  showPOIs: boolean;
  showCameras: boolean;
  showConstruction: boolean;
  
  // POI Categories
  showEmergency: boolean;
  showFood: boolean;
  showStay: boolean;
  showFuel: boolean;
  showTourist: boolean;
  
  // Other
  showLabels: boolean;
  showBuildings: boolean;
  showParks: boolean;
}

interface FloatingLayerControlProps {
  options: LayerOptions;
  onChange: (options: LayerOptions) => void;
  isDarkMode?: boolean;
}

export function FloatingLayerControl({
  options,
  onChange,
  isDarkMode
}: FloatingLayerControlProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const mapLayers: Array<{ id: MapLayer; name: string; icon: any; description: string; gradient: string }> = [
    { id: 'standard', name: 'Standard', icon: Map, description: 'Default map view', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'satellite', name: 'Satellite', icon: Satellite, description: 'Aerial imagery', gradient: 'from-purple-500 to-pink-500' },
    { id: 'terrain', name: 'Terrain', icon: Mountain, description: 'Topographic view', gradient: 'from-green-500 to-emerald-500' },
    { id: 'hybrid', name: 'Hybrid', icon: Layers, description: 'Satellite + labels', gradient: 'from-orange-500 to-amber-500' },
    { id: 'dark', name: 'Dark', icon: Moon, description: 'Dark theme map', gradient: 'from-slate-600 to-slate-800' },
    { id: 'light', name: 'Light', icon: Sun, description: 'Light theme map', gradient: 'from-slate-200 to-slate-400' }
  ];

  const overlays = [
    { key: 'showTraffic' as const, name: 'Traffic', icon: Zap, color: 'text-red-500', description: 'Real-time traffic' },
    { key: 'showIncidents' as const, name: 'Incidents', icon: AlertTriangle, color: 'text-orange-500', description: 'Road incidents' },
    { key: 'showWeather' as const, name: 'Weather', icon: Cloud, color: 'text-blue-500', description: 'Weather conditions' },
    { key: 'showPOIs' as const, name: 'Places', icon: MapPin, color: 'text-purple-500', description: 'Points of interest' },
    { key: 'showCameras' as const, name: 'Cameras', icon: Camera, color: 'text-slate-500', description: 'Traffic cameras' },
    { key: 'showConstruction' as const, name: 'Construction', icon: Building, color: 'text-amber-500', description: 'Road work' }
  ];

  const poiCategories = [
    { key: 'showEmergency' as const, name: 'Emergency', icon: '🚨', color: 'text-red-600' },
    { key: 'showFood' as const, name: 'Food', icon: '🍽️', color: 'text-orange-600' },
    { key: 'showStay' as const, name: 'Hotels', icon: '🏨', color: 'text-purple-600' },
    { key: 'showFuel' as const, name: 'Fuel', icon: '⛽', color: 'text-blue-600' },
    { key: 'showTourist' as const, name: 'Tourist', icon: '🗺️', color: 'text-green-600' }
  ];

  const otherOptions = [
    { key: 'show3D' as const, name: '3D Buildings', icon: Building, color: 'text-indigo-500' },
    { key: 'showLabels' as const, name: 'Labels', icon: Eye, color: 'text-slate-500' },
    { key: 'showBuildings' as const, name: 'Buildings', icon: Building, color: 'text-gray-500' },
    { key: 'showParks' as const, name: 'Parks', icon: Trees, color: 'text-green-500' }
  ];

  const handleToggle = (key: keyof LayerOptions) => {
    onChange({ ...options, [key]: !options[key] });
  };

  const handleMapLayerChange = (layer: MapLayer) => {
    onChange({ ...options, mapLayer: layer });
  };

  const activeOverlaysCount = overlays.filter(o => options[o.key]).length;
  const activePOIsCount = poiCategories.filter(p => options[p.key]).length;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className="absolute bottom-20 right-0 w-80 max-h-[70vh] overflow-hidden"
          >
            <div className="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                      <Layers className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Map Layers</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Customize your map view
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(70vh-80px)] scrollbar-thin">
                {/* Map Layer Selection */}
                <div className="p-4">
                  <h4 className="text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">
                    Base Map
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {mapLayers.map((layer) => {
                      const Icon = layer.icon;
                      const isActive = options.mapLayer === layer.id;
                      
                      return (
                        <motion.button
                          key={layer.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleMapLayerChange(layer.id)}
                          className={`relative p-3 rounded-xl border-2 transition-all ${
                            isActive
                              ? 'border-blue-500 shadow-lg'
                              : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                          }`}
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${layer.gradient} mb-2 mx-auto w-fit`}>
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="text-xs font-medium">{layer.name}</div>
                          {isActive && (
                            <motion.div
                              layoutId="activeLayer"
                              className="absolute inset-0 rounded-xl border-2 border-blue-500"
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Overlays */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Overlays
                    </h4>
                    {activeOverlaysCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {activeOverlaysCount} active
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    {overlays.map((overlay) => {
                      const Icon = overlay.icon;
                      return (
                        <motion.div
                          key={overlay.key}
                          whileHover={{ x: 2 }}
                          className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                            options[overlay.key]
                              ? 'bg-blue-50 dark:bg-blue-900/20'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`h-4 w-4 ${overlay.color}`} />
                            <div>
                              <div className="text-sm font-medium">{overlay.name}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                {overlay.description}
                              </div>
                            </div>
                          </div>
                          <Switch
                            checked={options[overlay.key]}
                            onCheckedChange={() => handleToggle(overlay.key)}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* POI Categories */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      POI Categories
                    </h4>
                    {activePOIsCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {activePOIsCount} active
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {poiCategories.map((poi) => {
                      const isActive = options[poi.key];
                      return (
                        <motion.button
                          key={poi.key}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleToggle(poi.key)}
                          className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all ${
                            isActive
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
                          }`}
                        >
                          <span className="text-lg">{poi.icon}</span>
                          <span className={`text-xs font-medium ${poi.color}`}>
                            {poi.name}
                          </span>
                          {isActive && (
                            <div className="ml-auto w-2 h-2 rounded-full bg-blue-500" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Other Options */}
                <div className="p-4">
                  <h4 className="text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">
                    Other Options
                  </h4>
                  <div className="space-y-2">
                    {otherOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <motion.div
                          key={option.key}
                          whileHover={{ x: 2 }}
                          className={`flex items-center justify-between p-2.5 rounded-lg transition-colors ${
                            options[option.key]
                              ? 'bg-slate-50 dark:bg-slate-800/50'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${option.color}`} />
                            <span className="text-sm">{option.name}</span>
                          </div>
                          <Switch
                            checked={options[option.key]}
                            onCheckedChange={() => handleToggle(option.key)}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      onChange({
                        mapLayer: 'standard',
                        show3D: false,
                        showTraffic: true,
                        showIncidents: true,
                        showWeather: false,
                        showPOIs: true,
                        showCameras: false,
                        showConstruction: true,
                        showEmergency: true,
                        showFood: false,
                        showStay: false,
                        showFuel: true,
                        showTourist: false,
                        showLabels: true,
                        showBuildings: true,
                        showParks: true
                      });
                    }}
                    className="flex-1 text-xs"
                  >
                    Reset to Default
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsExpanded(false)}
                    className="text-xs"
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
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
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

      {/* Active Indicators */}
      {!isExpanded && (activeOverlaysCount > 0 || activePOIsCount > 0) && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold shadow-lg"
        >
          {activeOverlaysCount + activePOIsCount}
        </motion.div>
      )}
    </div>
  );
}
