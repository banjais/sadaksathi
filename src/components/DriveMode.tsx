import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Gauge, 
  Heart, 
  Car, 
  Radio, 
  Bell,
  AlertTriangle,
  Navigation,
  Thermometer,
  Fuel,
  Settings,
  Phone,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { getTranslation, type LanguageCode } from "../utils/translations";

interface DriveModeProps {
  currentLanguage: LanguageCode;
  isDarkMode: boolean;
}

export function DriveMode({ currentLanguage, isDarkMode }: DriveModeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [heartRate, setHeartRate] = useState(72);
  const [fuelLevel, setFuelLevel] = useState(75);
  const [engineTemp, setEngineTemp] = useState(90);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStation, setCurrentStation] = useState("Radio Nepal FM");
  const [currentSong, setCurrentSong] = useState("Nepali Classical Music");

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeed(Math.floor(Math.random() * 20) + 40); // 40-60 km/h
      setHeartRate(Math.floor(Math.random() * 10) + 68); // 68-78 bpm
      setFuelLevel(prev => Math.max(20, prev - Math.random() * 0.1)); // Gradual fuel decrease
      setEngineTemp(85 + Math.random() * 10); // 85-95°C
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const healthStatus = heartRate < 70 ? 'excellent' : heartRate < 80 ? 'good' : 'elevated';
  const fuelStatus = fuelLevel > 50 ? 'good' : fuelLevel > 25 ? 'medium' : 'low';
  const tempStatus = engineTemp < 90 ? 'normal' : engineTemp < 100 ? 'warm' : 'hot';

  const radioStations = [
    "Radio Nepal FM",
    "Kantipur FM",
    "Image FM",
    "Hits FM",
    "City FM"
  ];

  const nextStation = () => {
    const currentIndex = radioStations.indexOf(currentStation);
    const nextIndex = (currentIndex + 1) % radioStations.length;
    setCurrentStation(radioStations[nextIndex]);
    setCurrentSong("Playing music...");
  };

  const prevStation = () => {
    const currentIndex = radioStations.indexOf(currentStation);
    const prevIndex = currentIndex === 0 ? radioStations.length - 1 : currentIndex - 1;
    setCurrentStation(radioStations[prevIndex]);
    setCurrentSong("Playing music...");
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed bottom-20 left-0 right-0 z-30"
    >
      <div className="mx-4">
        <Card className="backdrop-blur-xl bg-gradient-to-r from-slate-900/95 to-slate-800/95 border-slate-700/50 shadow-2xl">
          <CardContent className="p-0">
            {/* Main Drive Info Bar */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                {/* Speed */}
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Gauge className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{currentSpeed}</div>
                    <div className="text-xs text-slate-400">km/h</div>
                  </div>
                </div>

                {/* Health Monitor */}
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    healthStatus === 'excellent' ? 'bg-green-500' :
                    healthStatus === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}>
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{heartRate}</div>
                    <div className="text-xs text-slate-400">BPM</div>
                  </div>
                </div>

                {/* Navigation Status */}
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-sm font-medium text-white">
                      {getTranslation('destination', currentLanguage)}
                    </div>
                    <div className="text-xs text-slate-400">15 min • 8.5 km</div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-slate-700"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Expanded Controls */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-slate-700/50"
                >
                  <div className="p-4 space-y-4">
                    {/* Vehicle Status */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Fuel */}
                      <div className="flex items-center gap-2">
                        <Fuel className={`w-5 h-5 ${
                          fuelStatus === 'good' ? 'text-green-400' :
                          fuelStatus === 'medium' ? 'text-yellow-400' : 'text-red-400'
                        }`} />
                        <div>
                          <div className="text-sm text-white">{Math.round(fuelLevel)}%</div>
                          <div className="text-xs text-slate-400">
                            {getTranslation('fuel', currentLanguage) || 'Fuel'}
                          </div>
                        </div>
                      </div>

                      {/* Engine Temperature */}
                      <div className="flex items-center gap-2">
                        <Thermometer className={`w-5 h-5 ${
                          tempStatus === 'normal' ? 'text-green-400' :
                          tempStatus === 'warm' ? 'text-yellow-400' : 'text-red-400'
                        }`} />
                        <div>
                          <div className="text-sm text-white">{Math.round(engineTemp)}°C</div>
                          <div className="text-xs text-slate-400">Engine</div>
                        </div>
                      </div>

                      {/* Vehicle Status */}
                      <div className="flex items-center gap-2">
                        <Car className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-sm text-white">Normal</div>
                          <div className="text-xs text-slate-400">Status</div>
                        </div>
                      </div>
                    </div>

                    {/* Radio/Music Controls */}
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Radio className="w-5 h-5 text-green-400" />
                          <span className="text-sm font-medium text-white">{currentStation}</span>
                        </div>
                        <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                          LIVE
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-slate-400 mb-3">{currentSong}</div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 text-white hover:bg-slate-700"
                            onClick={prevStation}
                          >
                            <SkipBack className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 text-white hover:bg-slate-700"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 text-white hover:bg-slate-700"
                            onClick={nextStation}
                          >
                            <SkipForward className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 text-white hover:bg-slate-700"
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-slate-700"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Emergency
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-slate-700"
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Alerts
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-slate-700"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Safety Reminders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs">
            <AlertTriangle className="w-3 h-3" />
            {getTranslation('driveSafely', currentLanguage) || 'Drive safely and stay alert'}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
