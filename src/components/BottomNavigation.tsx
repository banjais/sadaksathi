import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Navigation,
  Car,
  MapPin,
  Zap,
  Route,
  AlertTriangle,
  Gauge,
  Eye,
  Shield
} from "lucide-react";
import type { NavigationMode } from "../App";
import { getTranslation, type LanguageCode } from "../utils/translations";

interface BottomNavigationProps {
  activeMode: NavigationMode;
  currentLanguage: LanguageCode;
  onModeChange: (mode: NavigationMode) => void;
  onAIAssistantToggle: () => void;
  onEmergencyToggle: () => void;
}

const getNavigationItems = (currentLanguage: LanguageCode) => [
  {
    id: "navigation" as NavigationMode,
    icon: Navigation,
    label: getTranslation("navigation", currentLanguage),
    color: "from-blue-500 to-blue-600",
    activeColor: "from-blue-600 to-blue-700",
    description: getTranslation("turnByTurnDirections", currentLanguage)
  },
  {
    id: "traffic" as NavigationMode,
    icon: Car,
    label: getTranslation("traffic", currentLanguage),
    color: "from-amber-500 to-amber-600",
    activeColor: "from-amber-600 to-amber-700",
    description: getTranslation("liveTrafficUpdates", currentLanguage),
    badge: "3"
  },
  {
    id: "nearby" as NavigationMode,
    icon: MapPin,
    label: getTranslation("nearby", currentLanguage),
    color: "from-green-500 to-green-600",
    activeColor: "from-green-600 to-green-700",
    description: getTranslation("pointsOfInterest", currentLanguage)
  },
  {
    id: "drive" as NavigationMode,
    icon: Gauge,
    label: getTranslation("driveMode", currentLanguage),
    color: "from-slate-500 to-slate-600",
    activeColor: "from-slate-600 to-slate-700",
    description: getTranslation("focusedDriving", currentLanguage),
    isSpecial: true
  }
];

export function BottomNavigation({ activeMode, currentLanguage, onModeChange, onAIAssistantToggle, onEmergencyToggle }: BottomNavigationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveringNavigation, setIsHoveringNavigation] = useState(false);
  const [hasInitialDelay, setHasInitialDelay] = useState(true);
  const navigationItems = getNavigationItems(currentLanguage);

  // Auto-hide functionality
  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    let initialTimer: NodeJS.Timeout;

    const handleUserActivity = () => {
      setIsVisible(true);
      clearTimeout(hideTimer);
      clearTimeout(initialTimer);
      
      // Hide after 6 seconds of inactivity (unless drive mode or hovering)
      if (activeMode !== 'drive' && !isHoveringNavigation && !hasInitialDelay) {
        hideTimer = setTimeout(() => {
          setIsVisible(false);
        }, 6000);
      }
    };

    const handleMouseMove = () => handleUserActivity();
    const handleTouchMove = () => handleUserActivity();
    const handleClick = () => handleUserActivity();
    const handleKeyPress = () => handleUserActivity();

    // Show navigation when mouse moves to bottom of screen
    const handleMousePosition = (e: MouseEvent) => {
      const windowHeight = window.innerHeight;
      const mouseY = e.clientY;
      
      if (mouseY > windowHeight - 120) { // Within 120px of bottom
        setIsVisible(true);
        clearTimeout(hideTimer);
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleMousePosition);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('click', handleClick);
    document.addEventListener('keypress', handleKeyPress);

    // Initial delay - show navigation for 10 seconds on first load
    if (hasInitialDelay) {
      initialTimer = setTimeout(() => {
        setHasInitialDelay(false);
        if (activeMode !== 'drive' && !isHoveringNavigation) {
          hideTimer = setTimeout(() => {
            setIsVisible(false);
          }, 6000);
        }
      }, 10000);
    } else if (activeMode !== 'drive' && !isHoveringNavigation) {
      // Regular hide timer for subsequent interactions
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    }

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(initialTimer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleMousePosition);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [activeMode, isHoveringNavigation, hasInitialDelay]);

  // Always show in drive mode for safety
  useEffect(() => {
    if (activeMode === 'drive') {
      setIsVisible(true);
    }
  }, [activeMode]);

  return (
    <motion.div
      className="absolute bottom-4 left-4 right-4 z-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ 
        opacity: isVisible ? 1 : 0.6, 
        y: isVisible ? 0 : 10,
        scale: isVisible ? 1 : 0.95
      }}
      transition={{ 
        type: "spring", 
        damping: 20, 
        stiffness: 200, 
        delay: isVisible ? 0 : 0.2 
      }}
      onMouseEnter={() => {
        setIsHoveringNavigation(true);
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsHoveringNavigation(false);
      }}
    >
      <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl p-2">
        <div className="flex justify-between items-center gap-2">
          {navigationItems.map((item) => {
            const isActive = activeMode === item.id;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                className="relative flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => onModeChange(item.id)}
                  variant="ghost"
                  className={`
                    relative w-full h-16 p-0 overflow-hidden transition-all duration-500 group
                    ${isActive
                      ? 'bg-gradient-to-br ' + item.activeColor + ' text-white shadow-lg border border-white/20'
                      : item.isSpecial
                        ? 'hover:bg-gradient-to-br hover:from-slate-700 hover:to-slate-800 hover:text-white hover:shadow-lg border border-slate-300 dark:border-slate-600'
                        : 'hover:bg-gradient-to-br hover:' + item.color + ' hover:text-white hover:shadow-md'
                    }
                  `}
                >
                  {/* Active Background Animation */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{ borderRadius: "inherit" }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                    <div className="relative">
                      <motion.div
                        animate={isActive ? { 
                          rotateY: 360,
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{ 
                          duration: isActive ? 0.6 : 0,
                          ease: "easeInOut"
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      
                      {/* Badge for Traffic mode */}
                      {item.badge && (
                        <motion.div
                          className="absolute -top-2 -right-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.2, type: "spring" }}
                        >
                          <Badge 
                            variant="destructive" 
                            className="h-4 min-w-4 p-0 flex items-center justify-center text-xs font-bold"
                          >
                            {item.badge}
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                    
                    <motion.span
                      className="text-xs font-medium"
                      animate={isActive ? {
                        opacity: [0.7, 1, 0.7]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {item.label}
                    </motion.span>
                  </div>

                  {/* Ripple Effect on Tap */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    initial={{ scale: 0, opacity: 0.5 }}
                    whileTap={{
                      scale: 1,
                      opacity: 0,
                      transition: { duration: 0.4 }
                    }}
                    style={{
                      background: `radial-gradient(circle, ${isActive ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'} 0%, transparent 70%)`
                    }}
                  />
                </Button>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full shadow-sm"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mode Description */}
        <motion.div
          className="mt-3 px-2 pb-1"
          key={activeMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs text-center text-slate-500 dark:text-slate-400 flex-1">
              {navigationItems.find(item => item.id === activeMode)?.description}
            </p>
            
            {/* Quick Access Buttons */}
            <div className="flex items-center gap-1">
              {/* Emergency Button */}
              <motion.button
                onClick={onEmergencyToggle}
                className="p-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/40 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={getTranslation('emergency', currentLanguage)}
              >
                <Shield className="h-3 w-3" />
              </motion.button>
              
              {/* AI Assistant Quick Access */}
              <motion.button
                onClick={onAIAssistantToggle}
                className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={getTranslation('aiAssistant', currentLanguage)}
              >
                <Zap className="h-3 w-3" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Auto-hide indicator */}
      {!isVisible && activeMode !== 'drive' && (
        <motion.div
          className="mt-2 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="w-12 h-1 bg-white/50 dark:bg-slate-400/70 rounded-full"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}

      {/* Contextual Quick Actions */}
      {activeMode === "traffic" && isVisible && (
        <motion.div
          className="mt-3 flex gap-2 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            size="sm"
            variant="outline"
            className="backdrop-blur-md bg-white/80 dark:bg-slate-800/80 border-amber-200/50 dark:border-amber-800/50 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"
          >
            <Route className="h-3 w-3 mr-1" />
            Find Route
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="backdrop-blur-md bg-white/80 dark:bg-slate-800/80 border-red-200/50 dark:border-red-800/50 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <AlertTriangle className="h-3 w-3 mr-1" />
            View Alerts
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
