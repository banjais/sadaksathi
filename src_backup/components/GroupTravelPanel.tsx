import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  X,
  Users,
  MapPin,
  Send,
  Phone,
  AlertCircle,
  Navigation,
  Clock,
  Battery,
  Signal,
  MessageCircle
} from "lucide-react";
import type { Trip, TravelerInfo } from "../utils/tripPlanning";
import type { LanguageCode } from "../utils/translations";

interface GroupTravelPanelProps {
  currentLanguage: LanguageCode;
  trip: Trip;
  currentUserId: string;
  onClose: () => void;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
}

export function GroupTravelPanel({
  currentLanguage,
  trip,
  currentUserId,
  onClose
}: GroupTravelPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'system',
      senderName: 'System',
      text: 'Group chat started. All members can see live locations.',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'members'>('members');

  // Mock live location updates
  const [memberLocations, setMemberLocations] = useState<Record<string, {
    lat: number;
    lng: number;
    battery: number;
    signal: number;
    lastUpdated: Date;
  }>>({});

  useEffect(() => {
    // Simulate location updates
    const interval = setInterval(() => {
      const updates: typeof memberLocations = {};
      trip.travelers.forEach(traveler => {
        updates[traveler.id] = {
          lat: 27.7172 + Math.random() * 0.01,
          lng: 85.324 + Math.random() * 0.01,
          battery: 50 + Math.random() * 50,
          signal: 3 + Math.floor(Math.random() * 2),
          lastUpdated: new Date()
        };
      });
      setMemberLocations(updates);
    }, 5000);

    return () => clearInterval(interval);
  }, [trip.travelers]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const currentTraveler = trip.travelers.find(t => t.id === currentUserId);
    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      senderName: currentTraveler?.name || 'You',
      text: newMessage,
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleEmergencyAlert = (travelerId: string) => {
    const traveler = trip.travelers.find(t => t.id === travelerId);
    const alertMessage: Message = {
      id: `alert-${Date.now()}`,
      senderId: 'system',
      senderName: 'System',
      text: `🚨 EMERGENCY: ${traveler?.name} needs help! Location shared.`,
      timestamp: new Date()
    };
    setMessages([...messages, alertMessage]);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getDistanceFromOrigin = () => {
    // Mock distance calculation
    return (Math.random() * 10).toFixed(1);
  };

  const getTimeSinceUpdate = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, x: 100 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        exit={{ scale: 0.9, opacity: 0, x: 100 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-[90vh] ml-auto"
      >
        <Card className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-700/50 shadow-2xl h-full flex flex-col">
          {/* Header */}
          <CardHeader className="border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{trip.name}</CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {trip.travelers.length} members traveling
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mt-4">
              <Button
                variant={activeTab === 'members' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('members')}
                className="flex-1 gap-2"
              >
                <Users className="h-4 w-4" />
                Members
              </Button>
              <Button
                variant={activeTab === 'chat' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('chat')}
                className="flex-1 gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Chat
                {messages.length > 1 && (
                  <Badge variant="secondary">{messages.length}</Badge>
                )}
              </Button>
            </div>
          </CardHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'members' ? (
                <motion.div
                  key="members"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full"
                >
                  <ScrollArea className="h-full">
                    <CardContent className="p-4 space-y-3">
                      {trip.travelers.map((traveler) => {
                        const location = memberLocations[traveler.id];
                        const isLeader = traveler.role === 'leader';

                        return (
                          <motion.div
                            key={traveler.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                          >
                            <div className="flex items-start gap-3 mb-3">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className={`${
                                  isLeader 
                                    ? 'bg-gradient-to-br from-amber-400 to-orange-500' 
                                    : 'bg-gradient-to-br from-blue-400 to-purple-500'
                                } text-white`}>
                                  {getInitials(traveler.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{traveler.name}</h4>
                                  {isLeader && (
                                    <Badge variant="outline" className="text-xs">
                                      Leader
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  {traveler.phone}
                                </p>
                              </div>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full"
                                onClick={() => window.open(`tel:${traveler.phone}`)}
                              >
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>

                            {location && (
                              <>
                                <Separator className="my-2" />
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-green-500" />
                                    <span className="text-slate-600 dark:text-slate-400">
                                      {getDistanceFromOrigin()} km from origin
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="flex items-center gap-1 text-xs">
                                      <Battery className={`h-3 w-3 ${
                                        location.battery > 20 ? 'text-green-500' : 'text-red-500'
                                      }`} />
                                      <span className="text-slate-600 dark:text-slate-400">
                                        {Math.floor(location.battery)}%
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-1 text-xs">
                                      <Signal className="h-3 w-3 text-blue-500" />
                                      <span className="text-slate-600 dark:text-slate-400">
                                        {location.signal}/5
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-1 text-xs">
                                      <Clock className="h-3 w-3 text-slate-400" />
                                      <span className="text-slate-600 dark:text-slate-400">
                                        {getTimeSinceUpdate(location.lastUpdated)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}

                            {traveler.healthInfo && (
                              <>
                                <Separator className="my-2" />
                                <div className="text-xs space-y-1">
                                  {traveler.healthInfo.bloodType && (
                                    <div className="text-slate-600 dark:text-slate-400">
                                      🩸 Blood Type: {traveler.healthInfo.bloodType}
                                    </div>
                                  )}
                                  {traveler.healthInfo.allergies && traveler.healthInfo.allergies.length > 0 && (
                                    <div className="text-amber-600 dark:text-amber-400">
                                      ⚠️ Allergies: {traveler.healthInfo.allergies.join(', ')}
                                    </div>
                                  )}
                                </div>
                              </>
                            )}

                            {traveler.id !== currentUserId && (
                              <Button
                                size="sm"
                                variant="destructive"
                                className="w-full mt-3 gap-2"
                                onClick={() => handleEmergencyAlert(traveler.id)}
                              >
                                <AlertCircle className="h-4 w-4" />
                                Emergency Alert
                              </Button>
                            )}
                          </motion.div>
                        );
                      })}
                    </CardContent>
                  </ScrollArea>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full flex flex-col"
                >
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-3">
                      {messages.map((message) => {
                        const isCurrentUser = message.senderId === currentUserId;
                        const isSystem = message.senderId === 'system';

                        return (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${
                              isSystem ? 'justify-center' : isCurrentUser ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            {isSystem ? (
                              <div className="text-xs text-center text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                {message.text}
                              </div>
                            ) : (
                              <div className={`max-w-[80%] ${
                                isCurrentUser ? 'text-right' : 'text-left'
                              }`}>
                                {!isCurrentUser && (
                                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 px-2">
                                    {message.senderName}
                                  </div>
                                )}
                                <div className={`inline-block px-4 py-2 rounded-2xl ${
                                  isCurrentUser
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                                }`}>
                                  <p className="text-sm">{message.text}</p>
                                </div>
                                <div className="text-xs text-slate-400 mt-1 px-2">
                                  {format(message.timestamp, 'HH:mm')}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="border-t border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="gap-2"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
