import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Locate,
  Navigation2,
  Loader2
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface QuickMapControlsProps {
  isSatellite: boolean;
  onToggleSatellite: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRecenter: () => void;
  onWhereAmI: () => void;
}

export function QuickMapControls({
  isSatellite,
  onToggleSatellite,
  onZoomIn,
  onZoomOut,
  onRecenter,
  onWhereAmI
}: QuickMapControlsProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [mapRotation, setMapRotation] = useState(0);
  const [locationAvailable, setLocationAvailable] = useState(true);

  const handleWhereAmI = async () => {
    setIsLocating(true);
    try {
      // Check if geolocation is available
      if (!navigator.geolocation) {
        setLocationAvailable(false);
      }
      await onWhereAmI();
    } catch (error) {
      console.error('Location error:', error);
      setLocationAvailable(false);
    } finally {
      setTimeout(() => setIsLocating(false), 1500);
    }
  };

  const handleCompassClick = () => {
    // Reset map rotation to north
    setMapRotation(0);
    onRecenter();
  };

  const handleCompassRotate = (direction: 'left' | 'right') => {
    const newRotation = direction === 'left' 
      ? (mapRotation - 45) % 360 
      : (mapRotation + 45) % 360;
    setMapRotation(newRotation);
    // This rotation would be applied to the map in a real implementation
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-2 mobile-map-controls"
      >
        {/* Map Layers Toggle - Google Maps Style */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="icon"
                onClick={onToggleSatellite}
                className="h-10 w-10 rounded-lg shadow-lg backdrop-blur-md bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
              >
                <Layers className="h-5 w-5" />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="left">
            {isSatellite ? 'Switch to Map' : 'Switch to Satellite'}
          </TooltipContent>
        </Tooltip>

        {/* My Location - Google Maps Style */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: isLocating ? 1 : 1.05 }} whileTap={{ scale: isLocating ? 1 : 0.95 }}>
              <Button
                size="icon"
                onClick={handleWhereAmI}
                disabled={isLocating}
                className={`h-10 w-10 rounded-lg shadow-lg backdrop-blur-md border relative ${
                  !locationAvailable 
                    ? 'bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-700/60'
                    : 'bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-slate-200/60 dark:border-slate-700/60'
                } disabled:opacity-80 disabled:cursor-wait`}
              >
                {isLocating ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Locate className="h-5 w-5" />
                )}
                {!locationAvailable && !isLocating && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"
                  />
                )}
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <div className="text-center">
              <div className="font-semibold">
                {isLocating ? 'Locating...' : locationAvailable ? 'My Location' : 'Default Location'}
              </div>
              {!locationAvailable && !isLocating && (
                <div className="text-xs text-amber-500 dark:text-amber-400 mt-1">
                  Using fallback location
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>

        {/* Compass Control - Interactive */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="icon"
                onClick={handleCompassClick}
                className="h-10 w-10 rounded-lg shadow-lg backdrop-blur-md bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 relative overflow-visible"
              >
                <motion.div
                  animate={{ rotate: -mapRotation }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative"
                >
                  <Navigation2 className="h-5 w-5 text-red-500" />
                </motion.div>
                {mapRotation !== 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                  />
                )}
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <div className="text-center">
              <div className="font-semibold">Compass</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Click to reset to North
              </div>
            </div>
          </TooltipContent>
        </Tooltip>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent my-1" />

        {/* Zoom Controls - Google Maps Style (Single Unit) */}
        <div className="backdrop-blur-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 rounded-lg shadow-lg overflow-hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onZoomIn}
                className="h-10 w-10 rounded-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group border-b border-slate-200/60 dark:border-slate-700/60"
              >
                <ZoomIn className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Zoom In</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onZoomOut}
                className="h-10 w-10 rounded-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
              >
                <ZoomOut className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Zoom Out</TooltipContent>
          </Tooltip>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
