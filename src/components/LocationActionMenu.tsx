import { motion } from "motion/react";
import { Button } from "./ui/button";
import { 
  Navigation, 
  MapPin, 
  Compass,
  PlusCircle,
  Heart,
  Share2,
  Info,
  X,
  Route,
  Eye,
  Calendar,
  Star,
  Bookmark
} from "lucide-react";
import type { LanguageCode } from "../utils/translations";

interface LocationActionMenuProps {
  locationName: string;
  coordinates?: { lat: number; lng: number };
  distance?: string;
  onNavigate: () => void;
  onPlanTrip: () => void;
  onExplore: () => void;
  onAddToTrip?: () => void;
  onSave: () => void;
  onShare: () => void;
  onViewDetails: () => void;
  onClose: () => void;
  currentLanguage: LanguageCode;
  hasActiveTrip?: boolean;
}

export function LocationActionMenu({
  locationName,
  coordinates,
  distance,
  onNavigate,
  onPlanTrip,
  onExplore,
  onAddToTrip,
  onSave,
  onShare,
  onViewDetails,
  onClose,
  currentLanguage,
  hasActiveTrip
}: LocationActionMenuProps) {
  
  const actions = [
    {
      icon: Navigation,
      label: currentLanguage === 'ne' ? 'नेभिगेट गर्नुहोस्' : 'Navigate',
      description: currentLanguage === 'ne' ? 'टर्न-बाइ-टर्न दिशानिर्देश' : 'Turn-by-turn directions',
      onClick: onNavigate,
      gradient: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-500',
      primary: true
    },
    {
      icon: Route,
      label: currentLanguage === 'ne' ? 'यात्रा योजना' : 'Plan Trip',
      description: currentLanguage === 'ne' ? 'यस स्थानमा यात्रा बनाउनुहोस्' : 'Create trip to this location',
      onClick: onPlanTrip,
      gradient: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-500',
      primary: true
    },
    {
      icon: Eye,
      label: currentLanguage === 'ne' ? 'अन्वेषण गर्नुहोस्' : 'Explore',
      description: currentLanguage === 'ne' ? 'वरपरका स्थानहरू' : 'Discover nearby places',
      onClick: onExplore,
      gradient: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-500',
      primary: true
    }
  ];

  const secondaryActions = [
    ...(hasActiveTrip ? [{
      icon: PlusCircle,
      label: currentLanguage === 'ne' ? 'यात्रामा थप्नुहोस्' : 'Add to Trip',
      onClick: onAddToTrip!,
      iconColor: 'text-orange-500'
    }] : []),
    {
      icon: Bookmark,
      label: currentLanguage === 'ne' ? 'सुरक्षित गर्नुहोस्' : 'Save',
      onClick: onSave,
      iconColor: 'text-pink-500'
    },
    {
      icon: Share2,
      label: currentLanguage === 'ne' ? 'साझेदारी गर्नुहोस्' : 'Share',
      onClick: onShare,
      iconColor: 'text-blue-500'
    },
    {
      icon: Info,
      label: currentLanguage === 'ne' ? 'विवरण' : 'Details',
      onClick: onViewDetails,
      iconColor: 'text-slate-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] w-[90vw] max-w-md"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden backdrop-blur-xl">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 p-4 border-b border-slate-200/50 dark:border-slate-700/50">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-2 h-8 w-8 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="pr-10">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-5 w-5 text-red-500" />
              <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                {locationName}
              </h3>
            </div>
            
            {distance && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {distance}
              </p>
            )}
            
            {coordinates && (
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
              </p>
            )}
          </div>
        </div>

        {/* Primary Actions - Large Buttons */}
        <div className="p-4 space-y-3">
          <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {currentLanguage === 'ne' ? 'मुख्य कार्यहरू' : 'Quick Actions'}
          </p>
          
          {actions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                onClick={action.onClick}
                className={`w-full h-auto py-4 px-4 rounded-2xl bg-gradient-to-r ${action.gradient} hover:shadow-lg text-white group transition-all`}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{action.label}</div>
                    <div className="text-xs text-white/80 mt-0.5">
                      {action.description}
                    </div>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Secondary Actions - Compact Grid */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {secondaryActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.03 }}
              >
                <Button
                  variant="outline"
                  onClick={action.onClick}
                  className="w-full flex-col h-auto py-3 gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
                >
                  <action.icon className={`h-5 w-5 ${action.iconColor}`} />
                  <span className="text-xs">{action.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
