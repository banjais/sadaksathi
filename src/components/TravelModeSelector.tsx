import { motion, AnimatePresence } from "motion/react";
import { 
  Footprints, 
  Bike, 
  Mountain, 
  Car,
  Bus,
  Plane,
  Ship,
  X
} from "lucide-react";
import type { LanguageCode } from "../utils/translations";

export type TravelMode = "walk" | "cycle" | "trek" | "drive" | "bus" | "flight" | "boat";

interface TravelModeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  selectedMode: TravelMode;
  onSelectMode: (mode: TravelMode) => void;
}

const travelModes = [
  {
    id: "walk" as TravelMode,
    icon: Footprints,
    label: { en: "Walk", ne: "पैदल" },
    gradient: "from-blue-500 to-blue-600",
    description: { en: "Walking routes", ne: "हिड्ने बाटो" }
  },
  {
    id: "cycle" as TravelMode,
    icon: Bike,
    label: { en: "Cycle", ne: "साइकल" },
    gradient: "from-green-500 to-green-600",
    description: { en: "Bicycle paths", ne: "साइकल मार्ग" }
  },
  {
    id: "trek" as TravelMode,
    icon: Mountain,
    label: { en: "Trek", ne: "ट्रेक" },
    gradient: "from-amber-500 to-amber-600",
    description: { en: "Hiking trails", ne: "पदयात्रा मार्ग" }
  },
  {
    id: "drive" as TravelMode,
    icon: Car,
    label: { en: "Drive", ne: "गाडी" },
    gradient: "from-purple-500 to-purple-600",
    description: { en: "Driving routes", ne: "गाडी चलाउने" }
  },
  {
    id: "bus" as TravelMode,
    icon: Bus,
    label: { en: "Bus", ne: "बस" },
    gradient: "from-red-500 to-red-600",
    description: { en: "Public transport", ne: "सार्वजनिक यातायात" }
  },
  {
    id: "flight" as TravelMode,
    icon: Plane,
    label: { en: "Flight", ne: "उडान" },
    gradient: "from-cyan-500 to-cyan-600",
    description: { en: "Air travel", ne: "हवाई यात्रा" }
  },
  {
    id: "boat" as TravelMode,
    icon: Ship,
    label: { en: "Boat", ne: "डुङ्गा" },
    gradient: "from-teal-500 to-teal-600",
    description: { en: "Water routes", ne: "पानी मार्ग" }
  }
];

export function TravelModeSelector({
  isOpen,
  onClose,
  currentLanguage,
  selectedMode,
  onSelectMode
}: TravelModeSelectorProps) {
  const lang = currentLanguage === 'ne' ? 'ne' : 'en';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[140]"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[150] bg-white dark:bg-slate-900 rounded-t-[2rem] shadow-2xl max-h-[70vh] overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-b from-white dark:from-slate-900 to-transparent pb-4 pt-6 px-6 z-10">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {lang === 'ne' ? 'यात्रा मोड' : 'Travel Mode'}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {lang === 'ne' ? 'आफ्नो यात्रा विधि छान्नुहोस्' : 'Choose your travel method'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              {/* Drag Handle */}
              <div className="flex justify-center -mt-4">
                <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
              </div>
            </div>

            {/* Travel Modes Grid */}
            <div className="px-6 pb-8 overflow-y-auto max-h-[calc(70vh-120px)]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {travelModes.map((mode, index) => (
                  <motion.button
                    key={mode.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      onSelectMode(mode.id);
                      onClose();
                    }}
                    className={`relative p-6 rounded-2xl transition-all ${
                      selectedMode === mode.id
                        ? 'ring-2 ring-offset-2 ring-emerald-500 dark:ring-offset-slate-900'
                        : 'hover:scale-105'
                    }`}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-10 rounded-2xl`} />
                    
                    {/* Selected Indicator */}
                    {selectedMode === mode.id && (
                      <motion.div
                        layoutId="selected-mode"
                        className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl"
                      />
                    )}

                    {/* Content */}
                    <div className="relative flex flex-col items-center gap-3">
                      {/* Icon */}
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${mode.gradient} shadow-lg`}>
                        <mode.icon className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                      
                      {/* Label */}
                      <div className="text-center">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {mode.label[lang]}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {mode.description[lang]}
                        </p>
                      </div>

                      {/* Check Mark */}
                      {selectedMode === mode.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
