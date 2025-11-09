import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import {
  Navigation,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  ArrowUpLeft,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface NavigationStep {
  instruction: string;
  distance: string;
  distanceMeters: number;
  type: 'straight' | 'left' | 'right' | 'slight-left' | 'slight-right' | 'destination';
}

interface TurnByTurnNavProps {
  isActive: boolean;
  destination?: string;
  eta?: string;
  distanceRemaining?: string;
}

// Mock navigation steps - in real app this would come from route data
const mockSteps: NavigationStep[] = [
  { instruction: "Turn right on Main Street", distance: "0.5 mi", distanceMeters: 800, type: 'right' },
  { instruction: "Continue straight for 2.3 miles", distance: "2.3 mi", distanceMeters: 3700, type: 'straight' },
  { instruction: "Turn left on Park Avenue", distance: "3.1 mi", distanceMeters: 5000, type: 'left' },
  { instruction: "Slight right onto Highway 1", distance: "5.8 mi", distanceMeters: 9300, type: 'slight-right' },
  { instruction: "You will arrive at your destination", distance: "12 mi", distanceMeters: 19300, type: 'destination' }
];

export function TurnByTurnNav({ 
  isActive, 
  destination = "Destination",
  eta = "2:45 PM",
  distanceRemaining = "12 miles"
}: TurnByTurnNavProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);

  // Simulate step progression
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < mockSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 10000); // Change step every 10 seconds for demo

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  const currentInstruction = mockSteps[currentStep];
  const nextInstruction = currentStep < mockSteps.length - 1 ? mockSteps[currentStep + 1] : null;

  const getInstructionIcon = (type: NavigationStep['type']) => {
    switch (type) {
      case 'right':
        return ArrowRight;
      case 'left':
        return ArrowLeft;
      case 'slight-right':
        return ArrowUpRight;
      case 'slight-left':
        return ArrowUpLeft;
      case 'destination':
        return MapPin;
      default:
        return ArrowUp;
    }
  };

  const InstructionIcon = getInstructionIcon(currentInstruction.type);

  if (isMinimized) {
    return (
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-[90px] left-4 right-4 z-[110] pointer-events-none"
      >
        <div className="max-w-md mx-auto pointer-events-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="backdrop-blur-xl bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-2xl border border-blue-500/30 px-4 py-3 cursor-pointer"
            onClick={() => setIsMinimized(false)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <InstructionIcon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">
                    {currentInstruction.instruction}
                  </p>
                  <p className="text-xs text-blue-100">
                    In {currentInstruction.distance}
                  </p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-white/80" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-[90px] left-4 right-4 z-[110] pointer-events-none"
    >
      <div className="max-w-md mx-auto pointer-events-auto">
        <motion.div
          layout
          className="backdrop-blur-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl shadow-2xl border border-blue-500/30 overflow-hidden"
        >
          {/* Main Navigation Instruction */}
          <div className="p-5">
            <div className="flex items-start gap-4 mb-4">
              {/* Large Direction Icon */}
              <motion.div
                key={currentStep}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0"
              >
                <InstructionIcon className="w-9 h-9 text-white" strokeWidth={2.5} />
              </motion.div>

              <div className="flex-1 min-w-0">
                {/* Distance */}
                <motion.div
                  key={`distance-${currentStep}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-2"
                >
                  In {currentInstruction.distance} ({currentInstruction.distanceMeters}m)
                </motion.div>

                {/* Instruction */}
                <motion.h3
                  key={`instruction-${currentStep}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl font-bold text-white leading-tight mb-2"
                >
                  {currentInstruction.instruction}
                </motion.h3>

                {/* Trip Info */}
                <div className="flex items-center gap-4 text-sm text-blue-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>ETA {eta}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{distanceRemaining}</span>
                  </div>
                </div>
              </div>

              {/* Minimize Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(true)}
                className="text-white hover:bg-white/20 rounded-lg flex-shrink-0"
              >
                <ChevronUp className="w-5 h-5" />
              </Button>
            </div>

            {/* Next Turn Preview */}
            {nextInstruction && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pt-3 border-t border-white/20"
              >
                <button
                  onClick={() => setShowUpcoming(!showUpcoming)}
                  className="w-full flex items-center justify-between text-left text-blue-100 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Then: {nextInstruction.instruction}</span>
                  </div>
                  <span className="text-xs">{nextInstruction.distance}</span>
                </button>
              </motion.div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / mockSteps.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-green-400 to-emerald-400"
            />
          </div>

          {/* Upcoming Steps (Expandable) */}
          <AnimatePresence>
            {showUpcoming && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-white/10 backdrop-blur-sm"
              >
                <div className="p-4 space-y-2">
                  <p className="text-xs font-semibold text-blue-200 uppercase tracking-wide mb-2">
                    Upcoming Turns
                  </p>
                  {mockSteps.slice(currentStep + 1, currentStep + 4).map((step, index) => {
                    const StepIcon = getInstructionIcon(step.type);
                    return (
                      <div key={index} className="flex items-center gap-3 text-white/80">
                        <StepIcon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm flex-1">{step.instruction}</span>
                        <span className="text-xs text-blue-200">{step.distance}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
