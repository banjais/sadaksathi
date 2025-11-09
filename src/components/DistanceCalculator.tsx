import { useState } from "react";
import { motion } from "motion/react";
import { X, MapPin, Navigation, Calculator } from "lucide-react";
import type { LanguageCode } from "../utils/translations";

const t = (key: string, lang: LanguageCode) => key; // Stub for now
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface DistanceCalculatorProps {
  currentLanguage: LanguageCode;
  onClose: () => void;
}

export function DistanceCalculator({
  currentLanguage,
  onClose
}: DistanceCalculatorProps) {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const calculateDistance = () => {
    // Mock calculation - in real app, use actual routing API
    const mockDistance = Math.floor(Math.random() * 500) + 10;
    const mockDuration = Math.floor(mockDistance / 50 * 60); // ~50km/h average
    
    setDistance(mockDistance);
    setDuration(`${Math.floor(mockDuration / 60)}h ${mockDuration % 60}m`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Distance Calculator
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Calculate distance between two points
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Input fields */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
            <Input
              placeholder="From location"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="pl-11"
            />
          </div>
          
          <div className="relative">
            <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
            <Input
              placeholder="To location"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="pl-11"
            />
          </div>
        </div>

        {/* Calculate button */}
        <Button
          onClick={calculateDistance}
          disabled={!fromLocation || !toLocation}
          className="w-full mb-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calculate
        </Button>

        {/* Results */}
        {distance !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Distance
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {distance} km
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Duration
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {duration}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
