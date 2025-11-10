import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mountain, 
  Car, 
  CloudRain, 
  Navigation, 
  MapPin,
  Compass,
  Route
} from "lucide-react";

interface SplashScreenProps {
  onLoadingComplete: () => void;
}

export function SplashScreen({ onLoadingComplete }: SplashScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [puzzlePieces, setPuzzlePieces] = useState([
    { id: 1, icon: Mountain, color: "from-blue-500 to-blue-600", loaded: false },
    { id: 2, icon: Car, color: "from-emerald-500 to-emerald-600", loaded: false },
    { id: 3, icon: CloudRain, color: "from-cyan-500 to-cyan-600", loaded: false },
    { id: 4, icon: Navigation, color: "from-purple-500 to-purple-600", loaded: false },
    { id: 5, icon: MapPin, color: "from-amber-500 to-amber-600", loaded: false },
    { id: 6, icon: Compass, color: "from-rose-500 to-rose-600", loaded: false },
    { id: 7, icon: Route, color: "from-teal-500 to-teal-600", loaded: false }
  ]);

  useEffect(() => {
    const loadingSteps = [
      { progress: 15, text: "Loading Nepal road network...", piece: 0 },
      { progress: 30, text: "Connecting to traffic systems...", piece: 1 },
      { progress: 45, text: "Fetching weather data...", piece: 2 },
      { progress: 60, text: "Initializing navigation...", piece: 3 },
      { progress: 75, text: "Loading points of interest...", piece: 4 },
      { progress: 90, text: "Preparing your journey...", piece: 5 },
      { progress: 100, text: "Ready to explore!", piece: 6 }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingProgress(step.progress);
        setLoadingText(step.text);
        
        // Animate puzzle piece
        setPuzzlePieces(prev => 
          prev.map((piece, idx) => 
            idx === step.piece ? { ...piece, loaded: true } : piece
          )
        );
        
        currentStep++;
      } else {
        clearInterval(interval);
        // Small delay before transitioning
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[1000] bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full opacity-10"
              style={{
                background: `radial-gradient(circle, ${
                  i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#06b6d4' : '#3b82f6'
                }, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-between py-12 px-6">
          {/* Top Section - Logo and Name */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center mt-12"
          >
            {/* Logo/Icon */}
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl blur-2xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-3xl shadow-2xl">
                <Compass className="w-16 h-16 text-white" strokeWidth={2.5} />
              </div>
            </motion.div>

            {/* App Name */}
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2"
            >
              सडक साथी
            </motion.h1>
            
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-2xl font-semibold text-slate-700 dark:text-slate-300"
            >
              Sadak-Sathi
            </motion.h2>
          </motion.div>

          {/* Center Section - Puzzle Loading Animation */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              {/* Puzzle Grid */}
              <div className="grid grid-cols-3 gap-4">
                {puzzlePieces.slice(0, 6).map((piece, index) => (
                  <motion.div
                    key={piece.id}
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={
                      piece.loaded
                        ? { scale: 1, rotate: 0, opacity: 1 }
                        : { scale: 0, rotate: -180, opacity: 0 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.1,
                    }}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${piece.color} shadow-xl flex items-center justify-center`}
                  >
                    <piece.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2} />
                  </motion.div>
                ))}
                
                {/* Center piece */}
                <motion.div
                  initial={{ scale: 0, rotate: 180, opacity: 0 }}
                  animate={
                    puzzlePieces[6].loaded
                      ? { scale: 1, rotate: 0, opacity: 1 }
                      : { scale: 0, rotate: 180, opacity: 0 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.6,
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-2xl flex items-center justify-center"
                >
                  <Route className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2} />
                </motion.div>
              </div>

              {/* Connecting Lines Animation */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="120"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3, rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Bottom Section - Progress and Text */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full max-w-md space-y-4"
          >
            {/* Loading Text */}
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-slate-700 dark:text-slate-300 font-medium"
            >
              {loadingText}
            </motion.p>

            {/* Progress Bar */}
            <div className="relative">
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              
              {/* Progress Percentage */}
              <motion.span
                className="absolute -top-6 right-0 text-sm font-semibold text-emerald-600 dark:text-emerald-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {loadingProgress}%
              </motion.span>
            </div>

            {/* Tagline */}
            <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
              Your Smart Road Companion for Nepal
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
