import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  Shield, 
  Bot, 
  Settings, 
  User, 
  LogIn,
  Bell,
  Eye,
  EyeOff
} from "lucide-react";
import { getTranslation, type LanguageCode } from "../utils/translations";

export interface PanelItem {
  id: string;
  type: 'emergency' | 'auth' | 'admin' | 'user' | 'assistant' | 'info';
  title: string;
  priority: number; // Higher number = higher priority
  icon: any;
  component: React.ReactNode;
  badge?: string | number;
  timestamp: Date;
}

interface PanelManagerProps {
  panels: PanelItem[];
  currentLanguage: LanguageCode;
  onClosePanel: (panelId: string) => void;
  onClearAll: () => void;
}

export function PanelManager({ panels, currentLanguage, onClosePanel, onClearAll }: PanelManagerProps) {
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  // Sort panels by priority and timestamp
  const sortedPanels = [...panels].sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority; // Higher priority first
    }
    return b.timestamp.getTime() - a.timestamp.getTime(); // Newer first
  });

  const currentPanel = sortedPanels[currentPanelIndex];

  // Auto-select highest priority panel when panels change
  useEffect(() => {
    if (sortedPanels.length > 0) {
      const highestPriorityIndex = 0; // Already sorted by priority
      setCurrentPanelIndex(highestPriorityIndex);
    }
  }, [panels.length]);

  // Navigate between panels
  const navigatePanel = (direction: 'prev' | 'next') => {
    const maxIndex = sortedPanels.length - 1;
    if (direction === 'prev') {
      setCurrentPanelIndex(currentPanelIndex > 0 ? currentPanelIndex - 1 : maxIndex);
    } else {
      setCurrentPanelIndex(currentPanelIndex < maxIndex ? currentPanelIndex + 1 : 0);
    }
  };

  // Get priority color
  const getPriorityColor = (type: PanelItem['type']) => {
    switch (type) {
      case 'emergency': return 'border-red-500/50 bg-red-500/10';
      case 'auth': return 'border-blue-500/50 bg-blue-500/10';
      case 'admin': return 'border-purple-500/50 bg-purple-500/10';
      case 'assistant': return 'border-green-500/50 bg-green-500/10';
      case 'user': return 'border-amber-500/50 bg-amber-500/10';
      default: return 'border-slate-500/50 bg-slate-500/10';
    }
  };

  // Get priority badge color
  const getPriorityBadgeColor = (type: PanelItem['type']) => {
    switch (type) {
      case 'emergency': return 'bg-red-500';
      case 'auth': return 'bg-blue-500';
      case 'admin': return 'bg-purple-500';
      case 'assistant': return 'bg-green-500';
      case 'user': return 'bg-amber-500';
      default: return 'bg-slate-500';
    }
  };

  if (sortedPanels.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Panel Queue Indicator */}
      {sortedPanels.length > 1 && (
        <motion.div
          className="absolute top-20 right-4 pointer-events-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className={`p-2 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border ${getPriorityColor(currentPanel?.type)}`}>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowQueue(!showQueue)}
                className="h-6 w-6 p-0"
              >
                <Bell className="h-3 w-3" />
              </Button>
              <Badge variant="secondary" className="text-xs">
                {currentPanelIndex + 1} / {sortedPanels.length}
              </Badge>
              {sortedPanels.length > 1 && (
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigatePanel('prev')}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigatePanel('next')}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Panel Queue List */}
      <AnimatePresence>
        {showQueue && sortedPanels.length > 1 && (
          <motion.div
            className="absolute top-32 right-4 pointer-events-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-3 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-700/50 max-w-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm">
                  {getTranslation('notifications', currentLanguage)}
                </h3>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={onClearAll}
                    className="h-6 text-xs px-2"
                  >
                    {getTranslation('clearAll', currentLanguage)}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowQueue(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {sortedPanels.map((panel, index) => {
                  const Icon = panel.icon;
                  const isActive = index === currentPanelIndex;
                  
                  return (
                    <motion.div
                      key={panel.id}
                      className={`p-2 rounded-lg border cursor-pointer transition-all ${
                        isActive 
                          ? getPriorityColor(panel.type) + ' border-opacity-100' 
                          : 'border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                      onClick={() => {
                        setCurrentPanelIndex(index);
                        setShowQueue(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityBadgeColor(panel.type)}`} />
                        <Icon className="h-4 w-4" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{panel.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {panel.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {panel.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {panel.badge}
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onClosePanel(panel.id);
                          }}
                          className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Panel */}
      <AnimatePresence mode="wait">
        {currentPanel && !isMinimized && (
          <motion.div
            key={currentPanel.id}
            className="absolute inset-0 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Panel Controls */}
            <motion.div
              className="absolute top-4 right-4 z-10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-2 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-2">
                  {/* Panel Info */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityBadgeColor(currentPanel.type)}`} />
                    <span className="text-xs font-medium">{currentPanel.title}</span>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsMinimized(true)}
                      className="h-6 w-6 p-0"
                    >
                      <EyeOff className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onClosePanel(currentPanel.id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Panel Content */}
            {currentPanel.component}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Panel Indicator */}
      <AnimatePresence>
        {isMinimized && currentPanel && (
          <motion.div
            className="absolute bottom-20 right-4 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Card className={`p-3 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border ${getPriorityColor(currentPanel.type)} cursor-pointer`}>
              <motion.div
                className="flex items-center gap-2"
                onClick={() => setIsMinimized(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <currentPanel.icon className="h-4 w-4" />
                <span className="text-xs font-medium">{currentPanel.title}</span>
                {currentPanel.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {currentPanel.badge}
                  </Badge>
                )}
                <Eye className="h-3 w-3 opacity-60" />
              </motion.div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
