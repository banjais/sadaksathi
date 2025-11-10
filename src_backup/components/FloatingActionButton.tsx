import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Search, 
  Navigation, 
  MapPin, 
  Shield,
  X
} from "lucide-react";
import type { LanguageCode } from "../utils/translations";

interface FloatingActionButtonProps {
  currentLanguage: LanguageCode;
  onSearch: () => void;
  onNavigate: () => void;
  onMyTrips: () => void;
  onEmergency: () => void;
}

const actionButtons = [
  {
    id: 'search',
    icon: Search,
    label: { en: 'Search', ne: 'खोज्नुहोस्' },
    shortName: { en: 'Search', ne: 'खोज' },
    gradient: 'from-blue-500 to-blue-600',
    action: 'search' as const
  },
  {
    id: 'navigate',
    icon: Navigation,
    label: { en: 'Navigate', ne: 'नेभिगेट' },
    shortName: { en: 'Go', ne: 'जाउ' },
    gradient: 'from-purple-500 to-purple-600',
    action: 'navigate' as const
  },
  {
    id: 'trips',
    icon: MapPin,
    label: { en: 'My Trips', ne: 'मेरो यात्रा' },
    shortName: { en: 'Trips', ne: 'यात्रा' },
    gradient: 'from-emerald-500 to-emerald-600',
    action: 'trips' as const
  },
  {
    id: 'emergency',
    icon: Shield,
    label: { en: 'Emergency', ne: 'आपतकालीन' },
    shortName: { en: 'SOS', ne: 'SOS' },
    gradient: 'from-red-500 to-red-600',
    action: 'emergency' as const
  }
];

export function FloatingActionButton({
  currentLanguage,
  onSearch,
  onNavigate,
  onMyTrips,
  onEmergency
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const lang = currentLanguage === 'ne' ? 'ne' : 'en';

  const handleAction = (action: 'search' | 'navigate' | 'trips' | 'emergency') => {
    setIsExpanded(false);
    
    switch (action) {
      case 'search':
        onSearch();
        break;
      case 'navigate':
        onNavigate();
        break;
      case 'trips':
        onMyTrips();
        break;
      case 'emergency':
        onEmergency();
        break;
    }
  };

  return (
    <div className="relative">
      {/* Action Buttons - Appear Above Main Button */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col-reverse gap-3 items-center"
          >
            {actionButtons.map((button, index) => (
              <motion.button
                key={button.id}
                initial={{ scale: 0, y: 20, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  y: 0, 
                  opacity: 1,
                  transition: { delay: index * 0.05 }
                }}
                exit={{ 
                  scale: 0, 
                  y: 20, 
                  opacity: 0,
                  transition: { delay: (actionButtons.length - index) * 0.03 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAction(button.action)}
                className={`relative group flex flex-col items-center gap-1.5`}
              >
                {/* Button */}
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${button.gradient} shadow-xl flex items-center justify-center`}>
                  <button.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                
                {/* Short Name Below Button */}
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-slate-800/90 px-2 py-0.5 rounded-full shadow-md backdrop-blur-sm">
                  {button.shortName[lang]}
                </span>
                
                {/* Label Tooltip - On Hover */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute right-[72px] top-1/2 -translate-y-1/2 bg-slate-900 dark:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-all"
                >
                  {button.label[lang]}
                  <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45" />
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
          />
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-2xl flex items-center justify-center"
      >
        {/* Pulsing Ring */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400"
        />

        {/* Icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative z-10"
        >
          {isExpanded ? (
            <X className="w-7 h-7 text-white" strokeWidth={3} />
          ) : (
            <Plus className="w-7 h-7 text-white" strokeWidth={3} />
          )}
        </motion.div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 blur-xl opacity-50" />
      </motion.button>
    </div>
  );
}
