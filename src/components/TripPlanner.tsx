import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  X,
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Car,
  Navigation,
  Save,
  Play,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Download,
  Bell,
  MessageSquare,
  Heart,
  MapPinned
} from "lucide-react";
import { format } from "date-fns";
import type { LanguageCode } from "../utils/translations";
import { 
  getTravelModeInfo, 
  getDefaultChecklists,
  getInterestBasedInfo,
  type Trip,
  type TravelMode,
  type TravelerInfo,
  type VehicleInfo 
} from "../utils/tripPlanning";

interface TripPlannerProps {
  currentLanguage: LanguageCode;
  onClose: () => void;
  onSave: (trip: Trip) => void;
  onStartNavigation: (trip: Trip) => void;
  initialData?: Partial<Trip>;
}

export function TripPlanner({
  currentLanguage,
  onClose,
  onSave,
  onStartNavigation,
  initialData
}: TripPlannerProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [tripName, setTripName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [travelMode, setTravelMode] = useState<TravelMode>(initialData?.travelMode || 'drive');
  const [startDate, setStartDate] = useState<Date | undefined>(initialData?.startDate);
  const [isGroup, setIsGroup] = useState(initialData?.isGroup || false);
  const [interestType, setInterestType] = useState(initialData?.interestType || 'sightseeing');
  const [travelers, setTravelers] = useState<TravelerInfo[]>(initialData?.travelers || []);
  const [vehicle, setVehicle] = useState<VehicleInfo | undefined>(initialData?.vehicle);
  const [checklists, setChecklists] = useState(
    initialData?.checklists || getDefaultChecklists(travelMode, isGroup)
  );
  const [shareLocation, setShareLocation] = useState(initialData?.shareLocation ?? true);
  const [enableGroupChat, setEnableGroupChat] = useState(initialData?.enableGroupChat ?? true);

  const modeInfo = getTravelModeInfo(travelMode);
  const interestInfo = getInterestBasedInfo(interestType, travelMode);

  const handleTravelModeChange = (mode: TravelMode) => {
    setTravelMode(mode);
    setChecklists(getDefaultChecklists(mode, isGroup));
  };

  const handleGroupToggle = (checked: boolean) => {
    setIsGroup(checked);
    setChecklists(getDefaultChecklists(travelMode, checked));
  };

  const toggleChecklistItem = (categoryIndex: number, itemId: string) => {
    const newChecklists = [...checklists];
    const item = newChecklists[categoryIndex].items.find(i => i.id === itemId);
    if (item) {
      item.checked = !item.checked;
      setChecklists(newChecklists);
    }
  };

  const addTraveler = () => {
    const newTraveler: TravelerInfo = {
      id: `traveler-${Date.now()}`,
      name: '',
      phone: '',
      role: 'member'
    };
    setTravelers([...travelers, newTraveler]);
  };

  const removeTraveler = (id: string) => {
    setTravelers(travelers.filter(t => t.id !== id));
  };

  const handleSave = () => {
    const trip: Trip = {
      id: initialData?.id || `trip-${Date.now()}`,
      name: tripName,
      description,
      createdBy: 'current-user',
      createdAt: new Date(),
      status: 'draft',
      startDate,
      origin: initialData?.origin || { 
        id: 'origin', 
        name: 'Current Location', 
        lat: 27.7172, 
        lng: 85.324, 
        address: 'Kathmandu', 
        type: 'waypoint' 
      },
      destination: initialData?.destination || { 
        id: 'dest', 
        name: 'Destination', 
        lat: 27.7172, 
        lng: 85.324, 
        address: 'To be set', 
        type: 'destination' 
      },
      waypoints: initialData?.waypoints || [],
      travelMode,
      vehicle,
      travelers,
      isGroup,
      checklists,
      offlineMapDownloaded: false,
      offlineDataDownloaded: false,
      reminders: [],
      shareLocation,
      enableGroupChat,
      interestType
    };

    onSave(trip);
  };

  const handleStartNow = () => {
    const trip: Trip = {
      id: initialData?.id || `trip-${Date.now()}`,
      name: tripName || 'Quick Trip',
      createdBy: 'current-user',
      createdAt: new Date(),
      status: 'ongoing',
      startDate: new Date(),
      origin: initialData?.origin || { 
        id: 'origin', 
        name: 'Current Location', 
        lat: 27.7172, 
        lng: 85.324, 
        address: 'Kathmandu', 
        type: 'waypoint' 
      },
      destination: initialData?.destination || { 
        id: 'dest', 
        name: 'Destination', 
        lat: 27.7172, 
        lng: 85.324, 
        address: 'To be set', 
        type: 'destination' 
      },
      waypoints: [],
      travelMode,
      vehicle,
      travelers,
      isGroup,
      checklists,
      offlineMapDownloaded: false,
      offlineDataDownloaded: false,
      reminders: [],
      shareLocation,
      enableGroupChat,
      interestType
    };

    onStartNavigation(trip);
  };

  const completedItems = checklists.reduce((sum, cat) => 
    sum + cat.items.filter(i => i.checked).length, 0
  );
  const totalItems = checklists.reduce((sum, cat) => 
    sum + cat.items.length, 0
  );
  const mandatoryComplete = checklists.every(cat => 
    cat.items.filter(i => i.mandatory).every(i => i.checked)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl max-h-[90vh] flex flex-col"
      >
        <Card className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-700/50 shadow-2xl flex flex-col h-full">
          {/* Header */}
          <CardHeader className="border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                  <MapPinned className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Plan Your Trip</CardTitle>
                  <CardDescription>
                    Create detailed trip plan or start navigation now
                  </CardDescription>
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
          </CardHeader>

          {/* Content */}
          <ScrollArea className="flex-1 overflow-auto">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="mode">Travel</TabsTrigger>
                  <TabsTrigger value="group">Group</TabsTrigger>
                  <TabsTrigger value="checklist">
                    Checklist
                    {completedItems > 0 && (
                      <Badge variant="outline" className="ml-2">
                        {completedItems}/{totalItems}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Basic Info Tab */}
                <TabsContent value="basic" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="trip-name">Trip Name</Label>
                      <Input
                        id="trip-name"
                        placeholder="e.g., Weekend at Pokhara"
                        value={tripName}
                        onChange={(e) => setTripName(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Add notes about your trip..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Trip Type</Label>
                      <Select value={interestType} onValueChange={setInterestType}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sightseeing">🏛️ Sightseeing</SelectItem>
                          <SelectItem value="trekking">🥾 Trekking</SelectItem>
                          <SelectItem value="business">💼 Business</SelectItem>
                          <SelectItem value="family">👨‍👩‍👧‍👦 Family</SelectItem>
                          <SelectItem value="pilgrimage">🕉️ Pilgrimage</SelectItem>
                          <SelectItem value="shopping">🛍️ Shopping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>When?</Label>
                      <div className="flex gap-2 mt-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex-1 justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <Button
                          variant="outline"
                          onClick={() => setStartDate(new Date())}
                        >
                          Today
                        </Button>
                      </div>
                    </div>

                    {/* Interest-based tips */}
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-3">
                        <Heart className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                            {interestInfo.title} Tips
                          </div>
                          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                            {interestInfo.tips.map((tip: string, i: number) => (
                              <li key={i}>• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Travel Mode Tab */}
                <TabsContent value="mode" className="space-y-4">
                  <div>
                    <Label>How will you travel?</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {(['drive', 'walk', 'trek', 'bike', 'bus'] as TravelMode[]).map((mode) => {
                        const info = getTravelModeInfo(mode);
                        return (
                          <motion.button
                            key={mode}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleTravelModeChange(mode)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              travelMode === mode
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <div className="text-3xl mb-2">{info.icon}</div>
                            <div className="font-medium">{info.name}</div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mode-specific info */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                    <div className="font-medium mb-2">For {modeInfo.name}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <div>📝 {modeInfo.preparation}</div>
                      <div>💡 {modeInfo.tips}</div>
                    </div>
                  </div>

                  {/* Vehicle info for drive mode */}
                  {travelMode === 'drive' && (
                    <div className="space-y-3">
                      <Label>Vehicle Information (Optional)</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="Vehicle Model" />
                        <Input placeholder="Plate Number" />
                      </div>
                      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                        <div className="text-sm font-medium mb-2 text-amber-900 dark:text-amber-100">
                          Pre-drive Checks
                        </div>
                        <div className="space-y-1">
                          {['Tires', 'Brakes', 'Lights', 'Oil', 'Documents'].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                              <Checkbox id={item} />
                              <label htmlFor={item} className="text-sm text-amber-700 dark:text-amber-300">
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Group Tab */}
                <TabsContent value="group" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Group Travel</Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Traveling with others?
                      </p>
                    </div>
                    <Checkbox
                      checked={isGroup}
                      onCheckedChange={handleGroupToggle}
                    />
                  </div>

                  {isGroup && (
                    <>
                      <Separator />
                      
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Label>Travelers</Label>
                          <Button
                            size="sm"
                            onClick={addTraveler}
                            className="gap-2"
                          >
                            <Plus className="h-4 w-4" />
                            Add Member
                          </Button>
                        </div>

                        {travelers.length === 0 ? (
                          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>No travelers added yet</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {travelers.map((traveler, index) => (
                              <div
                                key={traveler.id}
                                className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-700"
                              >
                                <div className="flex-1 grid grid-cols-2 gap-2">
                                  <Input
                                    placeholder="Name"
                                    value={traveler.name}
                                    onChange={(e) => {
                                      const newTravelers = [...travelers];
                                      newTravelers[index].name = e.target.value;
                                      setTravelers(newTravelers);
                                    }}
                                  />
                                  <Input
                                    placeholder="Phone"
                                    value={traveler.phone}
                                    onChange={(e) => {
                                      const newTravelers = [...travelers];
                                      newTravelers[index].phone = e.target.value;
                                      setTravelers(newTravelers);
                                    }}
                                  />
                                </div>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => removeTraveler(traveler.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                        <div className="font-medium text-purple-900 dark:text-purple-100">
                          Group Features
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-purple-600" />
                            <span className="text-sm text-purple-700 dark:text-purple-300">
                              Share Live Location
                            </span>
                          </div>
                          <Checkbox
                            checked={shareLocation}
                            onCheckedChange={setShareLocation}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-purple-600" />
                            <span className="text-sm text-purple-700 dark:text-purple-300">
                              Enable Group Chat
                            </span>
                          </div>
                          <Checkbox
                            checked={enableGroupChat}
                            onCheckedChange={setEnableGroupChat}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </TabsContent>

                {/* Checklist Tab */}
                <TabsContent value="checklist" className="space-y-4">
                  {checklists.map((category, catIndex) => (
                    <div key={category.category}>
                      <div className="font-medium mb-3 flex items-center gap-2">
                        <span>{category.category}</span>
                        <Badge variant="outline">
                          {category.items.filter(i => i.checked).length}/{category.items.length}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {category.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          >
                            <Checkbox
                              id={item.id}
                              checked={item.checked}
                              onCheckedChange={() => toggleChecklistItem(catIndex, item.id)}
                            />
                            <label
                              htmlFor={item.id}
                              className={`flex-1 text-sm cursor-pointer ${
                                item.checked ? 'line-through text-slate-500' : ''
                              }`}
                            >
                              {item.name}
                              {item.mandatory && (
                                <Badge variant="destructive" className="ml-2 text-xs">
                                  Required
                                </Badge>
                              )}
                            </label>
                            {item.checked && (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          <span className="font-medium">Offline Access</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                        Download maps and data for offline use
                      </p>
                      <Button variant="outline" className="w-full gap-2">
                        <Download className="h-4 w-4" />
                        Download Offline Maps
                      </Button>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <span className="font-medium">AI Reminders</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Get smart reminders before your trip
                      </p>
                      <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                        <div>• 1 day before departure</div>
                        <div>• 3 hours before departure</div>
                        <div>• 30 minutes before departure</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {!mandatoryComplete && (
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>Complete mandatory items</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  <Save className="h-4 w-4" />
                  Save for Later
                </Button>
                <Button
                  onClick={handleStartNow}
                  className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500"
                >
                  <Play className="h-4 w-4" />
                  Start Now
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
