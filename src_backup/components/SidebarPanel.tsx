import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  Navigation,
  Car,
  MapPin,
  Clock,
  Fuel,
  Coffee,
  Utensils,
  ShoppingBag,
  X,
  Route,
  AlertTriangle,
  Zap
} from "lucide-react";
import type { NavigationMode } from "../App";

interface SidebarPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeMode: NavigationMode;
}

const sidebarContent = {
  navigation: {
    title: "Navigation",
    icon: <Navigation className="h-5 w-5" />,
    items: [
      { icon: <Route className="h-4 w-4" />, label: "Route Options", action: "Show alternate routes" },
      { icon: <MapPin className="h-4 w-4" />, label: "Add Stop", action: "Add waypoint" },
      { icon: <Clock className="h-4 w-4" />, label: "Departure Time", action: "Schedule departure" },
    ]
  },
  traffic: {
    title: "Traffic",
    icon: <Car className="h-5 w-5" />,
    items: [
      { icon: <AlertTriangle className="h-4 w-4" />, label: "Active Incidents", action: "View traffic alerts", badge: "3" },
      { icon: <Route className="h-4 w-4" />, label: "Alternative Routes", action: "Find detours" },
      { icon: <Zap className="h-4 w-4" />, label: "Real-time Updates", action: "Toggle notifications" },
    ]
  },
  nearby: {
    title: "Nearby Services",
    icon: <MapPin className="h-5 w-5" />,
    items: [
      { icon: <Fuel className="h-4 w-4" />, label: "Gas Stations", action: "Find fuel stops", badge: "12" },
      { icon: <Coffee className="h-4 w-4" />, label: "Rest Areas", action: "Find rest stops", badge: "5" },
      { icon: <Utensils className="h-4 w-4" />, label: "Restaurants", action: "Find dining", badge: "8" },
      { icon: <ShoppingBag className="h-4 w-4" />, label: "Shopping", action: "Find stores", badge: "15" },
    ]
  },
  assistant: {
    title: "AI Assistant",
    icon: <Zap className="h-5 w-5" />,
    items: [
      { icon: <Navigation className="h-4 w-4" />, label: "Voice Commands", action: "Enable voice control" },
      { icon: <MapPin className="h-4 w-4" />, label: "Smart Suggestions", action: "Get recommendations" },
      { icon: <Clock className="h-4 w-4" />, label: "Trip Planning", action: "Plan your journey" },
    ]
  }
};

export function SidebarPanel({ isOpen, onClose, activeMode }: SidebarPanelProps) {
  const content = sidebarContent[activeMode];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/20 dark:bg-black/40 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="absolute left-0 top-0 h-full w-80 z-50"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.6
            }}
          >
            <Card className="h-full rounded-none rounded-r-2xl shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md overflow-hidden">
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <motion.div
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {content.icon}
                    </motion.div>
                    <h2 className="text-xl font-medium text-slate-900 dark:text-slate-100">
                      {content.title}
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>

                <Separator className="mb-6" />

                {/* Content Items */}
                <div className="space-y-3 flex-1">
                  {content.items.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-slate-800 dark:hover:to-slate-700 transition-all duration-300 hover:shadow-md group"
                        onClick={() => console.log(item.action)}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <motion.div
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                            whileHover={{ scale: 1.1 }}
                          >
                            {item.icon}
                          </motion.div>
                          <div className="flex-1 text-left">
                            <div className="text-slate-900 dark:text-slate-100 font-medium">
                              {item.label}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {item.action}
                            </div>
                          </div>
                          {item.badge && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <motion.div
                  className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    Tap anywhere outside to close
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}