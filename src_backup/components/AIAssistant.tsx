import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageCircle,
  Zap,
  Navigation,
  MapPin,
  Clock,
  Sparkles,
  Heart,
  Shield,
  MapIcon,
  AlertTriangle,
  Phone,
  Users
} from "lucide-react";
import { getTranslation, type LanguageCode } from "../utils/translations";

interface AIAssistantProps {
  onClose: () => void;
  currentLanguage: LanguageCode;
  userRole: 'friend' | 'boss' | 'family' | 'guide';
  userGender: 'male' | 'female';
}

// Avatar configurations based on role and gender
const getAIAvatarConfig = (role: string, gender: string) => {
  const avatars = {
    friend: {
      male: {
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMG1hbiUyMGF2YXRhciUyMHNtaWxpbmd8ZW58MXx8fHwxNzU2OTc0OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        gradient: "from-blue-500 to-cyan-500",
        icon: <Heart className="h-8 w-8" />
      },
      female: {
        image: "https://images.unsplash.com/photo-1494790108755-2616b612c1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMHdvbWFuJTIwYXZhdGFyJTIwc21pbGluZ3xlbnwxfHx8fDE3NTY5NzQ5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        gradient: "from-pink-500 to-rose-500",
        icon: <Heart className="h-8 w-8" />
      }
    },
    boss: {
      male: {
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBhdmF0YXIlMjBzdWl0fGVufDF8fHx8MTc1Njk3NDk2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        gradient: "from-slate-600 to-slate-800",
        icon: <Shield className="h-8 w-8" />
      },
      female: {
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGF2YXRhciUyMHN1aXR8ZW58MXx8fHwxNzU2OTc0OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        gradient: "from-purple-600 to-indigo-600",
        icon: <Shield className="h-8 w-8" />
      }
    },
    family: {
      male: {
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBtYW4lMjBhdmF0YXIlMjBraW5kfGVufDF8fHx8MTc1Njk3NDk2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        gradient: "from-green-500 to-emerald-500",
        icon: <Users className="h-8 w-8" />
      },
      female: {
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB3b21hbiUyMGF2YXRhciUyMGtpbmR8ZW58MXx8fHwxNzU2OTc0OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        gradient: "from-orange-500 to-amber-500",
        icon: <Users className="h-8 w-8" />
      }
    },
    guide: {
      male: {
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWlkZSUyMG1hbiUyMGF2YXRhciUyMGhlbHBmdWx8ZW58MXx8fHwxNzU2OTc0OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        gradient: "from-teal-500 to-cyan-500",
        icon: <MapIcon className="h-8 w-8" />
      },
      female: {
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWlkZSUyMHdvbWFuJTIwYXZhdGFyJTIwaGVscGZ1bHxlbnwxfHx8fDE3NTY5NzQ5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        gradient: "from-violet-500 to-purple-500",
        icon: <MapIcon className="h-8 w-8" />
      }
    }
  };
  
  return avatars[role as keyof typeof avatars]?.[gender as keyof typeof avatars['friend']] || avatars.friend.female;
};

export function AIAssistant({ onClose, currentLanguage, userRole, userGender }: AIAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  
  const t = (key: string) => getTranslation(currentLanguage, key);
  const avatarConfig = getAIAvatarConfig(userRole, userGender);
  
  // Dynamic messages based on role and language
  const getAIMessages = () => {
    const roleMessages = {
      friend: [
        t('aiAssistant') + " - " + t('appSubtitle'),
        "मैले तपाईंको यात्रामा मद्दत गर्न सक्छु। के चाहिन्छ?",
        "I can help you navigate, find places, and keep you safe on the road."
      ],
      boss: [
        "Professional navigation assistant at your service.",
        "Efficient route planning and traffic management available.",
        "Let me optimize your travel time and routes."
      ],
      family: [
        "Your caring road companion is here to help!",
        "I'll keep you and your family safe on every journey.",
        "Need help finding family-friendly stops or routes?"
      ],
      guide: [
        "Welcome to Nepal! I'm your local road guide.",
        "Let me show you the best routes and hidden gems.",
        "I know all the roads, weather patterns, and safe stops."
      ]
    };
    
    return roleMessages[userRole] || roleMessages.friend;
  };
  
  const getAISuggestions = () => [
    { 
      icon: <Navigation className="h-4 w-4" />, 
      text: t('findRoute'), 
      action: "navigation",
      color: "blue"
    },
    { 
      icon: <MapPin className="h-4 w-4" />, 
      text: t('nearby') + " " + t('gas'), 
      action: "nearby",
      color: "green"
    },
    { 
      icon: <Clock className="h-4 w-4" />, 
      text: t('eta') + "?", 
      action: "eta",
      color: "purple"
    },
    { 
      icon: <AlertTriangle className="h-4 w-4" />, 
      text: t('viewAlerts'), 
      action: "traffic",
      color: "orange"
    },
    { 
      icon: <Phone className="h-4 w-4" />, 
      text: t('emergency'), 
      action: "emergency",
      color: "red"
    }
  ];
  
  const aiMessages = getAIMessages();
  const aiSuggestions = getAISuggestions();

  // Simulate AI thinking and responses
  useEffect(() => {
    if (isListening) {
      const timer = setTimeout(() => {
        setIsListening(false);
        setIsThinking(true);
        
        setTimeout(() => {
          setIsThinking(false);
          setIsSpeaking(true);
          setCurrentMessage((prev) => (prev + 1) % aiMessages.length);
          
          setTimeout(() => {
            setIsSpeaking(false);
          }, 3000);
        }, 1500);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isListening]);

  const handleVoiceToggle = () => {
    if (!isListening && !isThinking && !isSpeaking) {
      setIsListening(true);
    }
  };

  const handleSuggestionClick = (suggestion: typeof aiSuggestions[0]) => {
    if (suggestion.action === "emergency") {
      setEmergencyMode(true);
      // In a real app, this would trigger emergency protocols
      console.log("Emergency mode activated");
    }
    
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setIsSpeaking(true);
      setCurrentMessage((prev) => (prev + 1) % aiMessages.length);
      setTimeout(() => setIsSpeaking(false), 2000);
    }, 1000);
  };
  
  const getPersonalizedGreeting = () => {
    const greetings = {
      friend: t('aiAssistant') + "! कस्तो छ यात्रा?",
      boss: "Professional assistance ready.",
      family: "Safe travels to you and your family!",
      guide: "Namaste! Ready to explore Nepal?"
    };
    
    return greetings[userRole] || greetings.friend;
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* AI Assistant Card */}
      <motion.div
        className="relative w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <Card className="overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border-0">
          {/* Header */}
          <div className={`relative p-6 text-white ${
            emergencyMode 
              ? 'bg-gradient-to-br from-red-600 to-red-800' 
              : `bg-gradient-to-br ${avatarConfig.gradient}`
          }`}>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>

            {emergencyMode && (
              <motion.div
                className="absolute top-4 left-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Badge variant="destructive" className="bg-red-700 text-white">
                  {t('emergency').toUpperCase()}
                </Badge>
              </motion.div>
            )}

            <div className="flex items-center gap-4">
              {/* AI Avatar */}
              <motion.div
                className="relative"
                animate={isSpeaking ? {
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                } : isThinking ? {
                  rotate: [0, 360]
                } : emergencyMode ? {
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{
                  duration: isSpeaking ? 1 : isThinking ? 2 : emergencyMode ? 0.5 : 0,
                  repeat: (isSpeaking || isThinking || emergencyMode) ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                <Avatar className="w-16 h-16 border-2 border-white/30 shadow-lg">
                  <AvatarImage 
                    src={avatarConfig.image}
                    alt="AI Assistant" 
                  />
                  <AvatarFallback className={`bg-gradient-to-br ${avatarConfig.gradient} text-white`}>
                    {avatarConfig.icon}
                  </AvatarFallback>
                </Avatar>

                {/* Status Indicator */}
                <motion.div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${
                    emergencyMode ? 'bg-red-600' :
                    isListening ? 'bg-red-500' : 
                    isSpeaking ? 'bg-green-500' : 
                    isThinking ? 'bg-yellow-500' : 'bg-slate-400'
                  }`}
                  animate={isListening || isSpeaking || emergencyMode ? {
                    scale: [1, 1.2, 1]
                  } : {}}
                  transition={{
                    duration: 1,
                    repeat: (isListening || isSpeaking || emergencyMode) ? Infinity : 0
                  }}
                >
                  {isThinking && <Sparkles className="h-2 w-2 text-white" />}
                  {emergencyMode && <AlertTriangle className="h-2 w-2 text-white" />}
                </motion.div>
              </motion.div>

              <div>
                <h3 className="text-xl font-medium">{t('aiAssistant')}</h3>
                <p className="text-white/80 text-sm">
                  {emergencyMode ? t('emergency') + " " + t('active') :
                   isListening ? "सुन्दै..." : 
                   isThinking ? "सोच्दै..." :
                   isSpeaking ? "बोल्दै..." : getPersonalizedGreeting()}
                </p>
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className="p-6">
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card className="p-4 bg-slate-50 dark:bg-slate-800 border-0">
                <div className="flex items-start gap-3">
                  <motion.div
                    animate={isSpeaking ? {
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: isSpeaking ? Infinity : 0
                    }}
                  >
                    <MessageCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  </motion.div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {aiMessages[currentMessage]}
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Voice Controls */}
            <div className="flex gap-3 mb-6">
              <Button
                onClick={handleVoiceToggle}
                disabled={isThinking || isSpeaking}
                className={`flex-1 transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? "Stop Listening" : "Start Voice"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>

            {/* Quick Suggestions */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                {userRole === 'guide' ? "Nepal Navigation Help:" : "Quick suggestions:"}
              </p>
              {aiSuggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => handleSuggestionClick(suggestion)}
                    variant="ghost"
                    className={`w-full justify-start h-auto p-3 transition-all duration-300 hover:shadow-sm group ${
                      suggestion.action === "emergency" 
                        ? "hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/20 dark:hover:to-red-800/20"
                        : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-slate-800 dark:hover:to-slate-700"
                    }`}
                  >
                    <motion.div
                      className={`p-1.5 rounded-md text-slate-600 dark:text-slate-400 transition-colors mr-3 ${
                        suggestion.action === "emergency"
                          ? "bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/30 group-hover:text-red-700 dark:group-hover:text-red-400"
                          : "bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {suggestion.icon}
                    </motion.div>
                    <span className={`text-sm ${
                      suggestion.action === "emergency" 
                        ? "text-red-700 dark:text-red-300" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}>
                      {suggestion.text}
                    </span>
                    {suggestion.action === "emergency" && (
                      <Badge variant="destructive" className="ml-auto text-xs">
                        SOS
                      </Badge>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
            
            {/* Emergency Mode Panel */}
            <AnimatePresence>
              {emergencyMode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <h4 className="font-medium text-red-800 dark:text-red-300">
                      {t('emergency')} {t('active')}
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm text-red-700 dark:text-red-300">
                    <p>• Emergency contacts notified</p>
                    <p>• Location shared with authorities</p>
                    <p>• Emergency services: 100, 103</p>
                  </div>
                  <Button
                    onClick={() => setEmergencyMode(false)}
                    variant="outline"
                    size="sm"
                    className="mt-3 border-red-300 text-red-700 hover:bg-red-100"
                  >
                    Cancel Emergency
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}