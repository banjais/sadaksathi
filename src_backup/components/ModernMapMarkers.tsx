import { motion } from "motion/react";
import { POI, POI_TYPE_INFO, POI_CATEGORIES } from "../utils/poiCategories";

interface ModernMarkerProps {
  poi: POI;
  onClick: () => void;
  isSelected?: boolean;
}

export function ModernMarker({ poi, onClick, isSelected }: ModernMarkerProps) {
  const typeInfo = POI_TYPE_INFO[poi.type];
  const categoryInfo = POI_CATEGORIES[poi.categories[0]];

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: isSelected ? 1.2 : 1 }}
      whileHover={{ scale: 1.15, y: -2 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="cursor-pointer relative"
      style={{ zIndex: isSelected ? 100 : 50 }}
    >
      {/* Pulsing ring for selected */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${categoryInfo.color}40, transparent)`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
      )}

      {/* Main marker */}
      <div
        className="relative w-12 h-12 rounded-full shadow-2xl backdrop-blur-sm flex items-center justify-center transform transition-all"
        style={{
          background: `linear-gradient(135deg, ${categoryInfo.color}, ${categoryInfo.color}dd)`,
          boxShadow: isSelected 
            ? `0 8px 24px ${categoryInfo.color}60, 0 0 0 4px white, 0 0 0 6px ${categoryInfo.color}`
            : `0 4px 12px ${categoryInfo.color}40`
        }}
      >
        {/* Icon */}
        <span className="text-2xl filter drop-shadow-lg">
          {typeInfo.icon}
        </span>

        {/* White ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white" />
      </div>

      {/* Pointer */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
        style={{
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: `12px solid ${categoryInfo.color}`,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
        }}
      />

      {/* Label */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-700 whitespace-nowrap"
        >
          <div className="font-semibold text-sm">{poi.name}</div>
          {poi.distance !== undefined && (
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {poi.distance.toFixed(1)} km away
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

interface ClusterMarkerProps {
  count: number;
  category: string;
  onClick: () => void;
}

export function ClusterMarker({ count, category, onClick }: ClusterMarkerProps) {
  const size = Math.min(60, 40 + Math.log(count) * 8);
  const categoryInfo = POI_CATEGORIES[category as keyof typeof POI_CATEGORIES] || POI_CATEGORIES.daily;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer relative"
      style={{ zIndex: 40 }}
    >
      {/* Pulsing background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ 
          background: `radial-gradient(circle, ${categoryInfo.color}30, transparent)`,
          width: size * 1.5,
          height: size * 1.5,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0, 0.4]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />

      {/* Main cluster circle */}
      <div
        className="relative rounded-full shadow-2xl backdrop-blur-sm flex flex-col items-center justify-center"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${categoryInfo.color}, ${categoryInfo.color}dd)`,
          boxShadow: `0 8px 24px ${categoryInfo.color}40, 0 0 0 3px white`
        }}
      >
        {/* Count */}
        <div className="text-white font-bold text-lg">{count}</div>
        {/* Icon */}
        <div className="text-white text-sm">{categoryInfo.icon}</div>

        {/* White ring */}
        <div className="absolute inset-0 rounded-full border-3 border-white" />
      </div>

      {/* Hover label */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-white dark:bg-slate-900 shadow-lg text-xs font-medium whitespace-nowrap pointer-events-none"
      >
        {count} {categoryInfo.name}
      </motion.div>
    </motion.div>
  );
}

interface UserLocationMarkerProps {
  accuracy?: number;
}

export function UserLocationMarker({ accuracy }: UserLocationMarkerProps) {
  return (
    <div className="relative">
      {/* Accuracy circle */}
      {accuracy && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: accuracy * 2,
            height: accuracy * 2,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
      )}

      {/* Pulsing outer ring */}
      <motion.div
        className="absolute w-16 h-16 rounded-full"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          border: '2px solid #3b82f6'
        }}
        animate={{
          scale: [1, 1.5],
          opacity: [0.6, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity
        }}
      />

      {/* Main dot */}
      <motion.div
        className="relative w-8 h-8 rounded-full shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          boxShadow: '0 0 0 4px white, 0 0 0 6px #3b82f6, 0 4px 12px rgba(59, 130, 246, 0.4)'
        }}
        animate={{
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 1,
          repeat: Infinity
        }}
      >
        {/* Inner white dot */}
        <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-white" />
      </motion.div>
    </div>
  );
}

interface RouteMarkerProps {
  type: 'start' | 'end' | 'waypoint';
  label?: string;
  number?: number;
}

export function RouteMarker({ type, label, number }: RouteMarkerProps) {
  const config = {
    start: {
      color: '#10b981',
      gradient: 'from-green-500 to-emerald-600',
      icon: '🚩',
      label: label || 'Start'
    },
    end: {
      color: '#ef4444',
      gradient: 'from-red-500 to-rose-600',
      icon: '🏁',
      label: label || 'End'
    },
    waypoint: {
      color: '#f59e0b',
      gradient: 'from-amber-500 to-orange-600',
      icon: number?.toString() || '📍',
      label: label || `Stop ${number || ''}`
    }
  }[type];

  return (
    <motion.div
      initial={{ scale: 0, y: -20 }}
      animate={{ scale: 1, y: 0 }}
      className="relative cursor-pointer"
      style={{ zIndex: 60 }}
    >
      {/* Pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ 
          background: `radial-gradient(circle, ${config.color}40, transparent)`,
          width: 80,
          height: 80,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />

      {/* Main marker */}
      <div
        className={`relative w-14 h-14 rounded-full shadow-2xl backdrop-blur-sm flex items-center justify-center bg-gradient-to-br ${config.gradient}`}
        style={{
          boxShadow: `0 8px 24px ${config.color}60, 0 0 0 4px white, 0 0 0 6px ${config.color}`
        }}
      >
        <span className="text-3xl">{config.icon}</span>
        <div className="absolute inset-0 rounded-full border-2 border-white" />
      </div>

      {/* Pointer */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
        style={{
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: `14px solid ${config.color}`,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
        }}
      />

      {/* Label */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-700 whitespace-nowrap font-semibold text-sm">
        {config.label}
      </div>
    </motion.div>
  );
}
