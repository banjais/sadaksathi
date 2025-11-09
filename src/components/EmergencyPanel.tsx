import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  X,
  Phone,
  MapPin,
  AlertTriangle,
  Users,
  Shield,
  Clock,
  Send,
  Plus,
  Minus,
  Navigation,
  Heart,
  Car,
  Hospital,
  Zap,
  Share,
  Volume2
} from "lucide-react";
import { getTranslation, type LanguageCode } from "../utils/translations";

interface EmergencyPanelProps {
  onClose: () => void;
  currentLanguage: LanguageCode;
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  avatar?: string;
  isNotified: boolean;
}

interface FamilyMember {
  id: string;
  name: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    lastUpdated: string;
  };
  status: 'safe' | 'emergency' | 'unknown';
  avatar?: string;
}

export function EmergencyPanel({ onClose, currentLanguage }: EmergencyPanelProps) {
  const [activeTab, setActiveTab] = useState<'emergency' | 'family' | 'report'>('emergency');
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [reportMessage, setReportMessage] = useState('');
  const [reportType, setReportType] = useState<'accident' | 'breakdown' | 'weather' | 'other'>('accident');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'आमा (Mom)',
      phone: '9841111111',
      location: {
        lat: 27.7172,
        lng: 85.3240,
        address: 'Kathmandu, Thamel',
        lastUpdated: '2 min ago'
      },
      status: 'safe',
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    {
      id: '2',
      name: 'बुबा (Dad)',
      phone: '9841111112',
      location: {
        lat: 27.7000,
        lng: 85.3000,
        address: 'Kathmandu, Durbar Marg',
        lastUpdated: '5 min ago'
      },
      status: 'safe',
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    }
  ]);

  const [emergencyContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Emergency Services',
      phone: '100',
      relation: 'Emergency',
      isNotified: false
    },
    {
      id: '2',
      name: 'Traffic Police',
      phone: '103',
      relation: 'Traffic',
      isNotified: false
    },
    {
      id: '3',
      name: 'Fire Department',
      phone: '101',
      relation: 'Fire',
      isNotified: false
    },
    {
      id: '4',
      name: 'Tourist Police',
      phone: '1144',
      relation: 'Tourist Help',
      isNotified: false
    }
  ]);

  const t = (key: string) => getTranslation(currentLanguage, key);

  const handleEmergencyActivate = () => {
    setEmergencyActive(true);
    // In a real app, this would:
    // 1. Share location with emergency contacts
    // 2. Send SMS to family members
    // 3. Contact emergency services
    // 4. Start recording GPS trail
    console.log("Emergency activated - location shared, contacts notified");
  };

  const handleEmergencyDeactivate = () => {
    setEmergencyActive(false);
    console.log("Emergency deactivated");
  };

  const handleSendReport = () => {
    if (reportMessage.trim()) {
      console.log("Incident report sent:", {
        type: reportType,
        message: reportMessage,
        location: "Current GPS location",
        timestamp: new Date().toISOString()
      });
      setReportMessage('');
      // Show success message
    }
  };

  const getStatusColor = (status: FamilyMember['status']) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'emergency': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'unknown': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Emergency Panel */}
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <Card className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border-0">
          {/* Header */}
          <div className={`relative p-6 text-white ${
            emergencyActive 
              ? 'bg-gradient-to-br from-red-600 to-red-800' 
              : 'bg-gradient-to-br from-orange-500 to-red-600'
          }`}>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>

            {emergencyActive && (
              <motion.div
                className="absolute top-4 left-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Badge variant="destructive" className="bg-red-700 text-white">
                  {t('emergency').toUpperCase()} {t('active')}
                </Badge>
              </motion.div>
            )}

            <div className="flex items-center gap-4">
              <motion.div
                className="p-3 bg-white/20 rounded-full"
                animate={emergencyActive ? {
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{
                  duration: 0.5,
                  repeat: emergencyActive ? Infinity : 0
                }}
              >
                <Shield className="h-8 w-8" />
              </motion.div>
              <div>
                <h2 className="text-xl font-medium">{t('emergency')} & Family</h2>
                <p className="text-white/80 text-sm">
                  {emergencyActive ? "Emergency mode active - help is on the way" : "Safety and family tracking"}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            {[
              { id: 'emergency', label: t('emergency'), icon: <AlertTriangle className="h-4 w-4" /> },
              { id: 'family', label: 'Family Tracking', icon: <Users className="h-4 w-4" /> },
              { id: 'report', label: 'Report Incident', icon: <Send className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'emergency' && (
                <motion.div
                  key="emergency"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Emergency Button */}
                  <div className="text-center">
                    {!emergencyActive ? (
                      <Button
                        onClick={handleEmergencyActivate}
                        className="w-48 h-48 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-2xl text-lg font-bold"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <AlertTriangle className="h-12 w-12" />
                          <span>SOS</span>
                          <span className="text-sm">Tap for Emergency</span>
                        </div>
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white shadow-2xl flex flex-col items-center justify-center text-lg font-bold"
                        >
                          <AlertTriangle className="h-12 w-12 mb-2" />
                          <span>EMERGENCY</span>
                          <span className="text-sm">ACTIVE</span>
                        </motion.div>
                        <Button
                          onClick={handleEmergencyDeactivate}
                          variant="outline"
                          className="border-red-300 text-red-700 hover:bg-red-50"
                        >
                          Cancel Emergency
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Emergency Contacts */}
                  <div className="space-y-3">
                    <h3 className="font-medium">Emergency Contacts</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {emergencyContacts.map((contact) => (
                        <Card key={contact.id} className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-blue-500" />
                              <div>
                                <div className="text-sm font-medium">{contact.name}</div>
                                <div className="text-xs text-slate-500">{contact.phone}</div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`tel:${contact.phone}`)}
                            >
                              Call
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Location Sharing */}
                  {emergencyActive && (
                    <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-blue-800 dark:text-blue-300">
                            Location Shared
                          </div>
                          <div className="text-sm text-blue-600 dark:text-blue-400">
                            Your location is being shared with emergency contacts and authorities
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </motion.div>
              )}

              {activeTab === 'family' && (
                <motion.div
                  key="family"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Family Members</h3>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Member
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {familyMembers.map((member) => (
                      <Card key={member.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>
                                {member.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-slate-500">
                                {member.location.address}
                              </div>
                              <div className="text-xs text-slate-400">
                                <Clock className="h-3 w-3 inline mr-1" />
                                {member.location.lastUpdated}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(member.status)}>
                              {member.status === 'safe' ? (
                                <><Heart className="h-3 w-3 mr-1" />Safe</>
                              ) : member.status === 'emergency' ? (
                                <><AlertTriangle className="h-3 w-3 mr-1" />Emergency</>
                              ) : (
                                <>Unknown</>
                              )}
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Navigation className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Family Safety Features */}
                  <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                    <h4 className="font-medium mb-2 text-green-800 dark:text-green-300">
                      Family Safety Features
                    </h4>
                    <div className="space-y-2 text-sm text-green-700 dark:text-green-400">
                      <div className="flex items-center gap-2">
                        <Share className="h-4 w-4" />
                        <span>Real-time location sharing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Safe arrival notifications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Emergency alerts to all family</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'report' && (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-medium mb-3">Report Road Incident</h3>
                    
                    {/* Incident Type */}
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-2 block">Incident Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'accident', label: 'Accident', icon: <Car className="h-4 w-4" /> },
                          { id: 'breakdown', label: 'Breakdown', icon: <Zap className="h-4 w-4" /> },
                          { id: 'weather', label: 'Weather', icon: <AlertTriangle className="h-4 w-4" /> },
                          { id: 'other', label: 'Other', icon: <Plus className="h-4 w-4" /> }
                        ].map((type) => (
                          <Button
                            key={type.id}
                            variant={reportType === type.id ? "default" : "outline"}
                            onClick={() => setReportType(type.id as any)}
                            className="justify-start"
                          >
                            {type.icon}
                            <span className="ml-2">{type.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-2 block">Description</label>
                      <Textarea
                        value={reportMessage}
                        onChange={(e) => setReportMessage(e.target.value)}
                        placeholder="Describe the incident, location, and any immediate dangers..."
                        className="min-h-20"
                      />
                    </div>

                    {/* Location Info */}
                    <Card className="p-3 bg-slate-50 dark:bg-slate-800">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>Location will be automatically included</span>
                      </div>
                    </Card>

                    {/* Send Button */}
                    <Button
                      onClick={handleSendReport}
                      disabled={!reportMessage.trim()}
                      className="w-full"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Report to Authorities
                    </Button>
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