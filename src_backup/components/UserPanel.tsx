import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { 
  X, 
  User, 
  Settings, 
  FileText, 
  AlertTriangle,
  Phone,
  Plus,
  Trash2,
  Save,
  Camera,
  Bell,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Globe,
  Heart,
  Car,
  MapPin,
  Clock
} from "lucide-react";
import { getTranslation, type LanguageCode } from "../utils/translations";
import { useAuthProvider } from "../hooks/useAuth";

interface UserPanelProps {
  currentLanguage: LanguageCode;
  onClose: () => void;
}

export function UserPanel({ currentLanguage, onClose }: UserPanelProps) {
  const { user, updateProfile } = useAuthProvider();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Report Form
  const [reportForm, setReportForm] = useState({
    type: "",
    location: "",
    description: "",
    severity: "medium",
    images: [] as File[]
  });
  
  // Emergency Contacts
  const [emergencyContacts, setEmergencyContacts] = useState(
    user?.emergencyContacts || []
  );
  
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relation: ""
  });
  
  // Settings
  const [settings, setSettings] = useState({
    notifications: user?.preferences.notifications || true,
    voiceEnabled: user?.preferences.voiceEnabled || true,
    darkMode: user?.preferences.darkMode || false,
    language: user?.preferences.language || currentLanguage,
    aiAssistantRole: user?.preferences.aiAssistantRole || 'friend',
    aiAssistantGender: user?.preferences.aiAssistantGender || 'female'
  });
  
  const [userReports] = useState([
    {
      id: 1,
      type: "Road Damage",
      location: "Ring Road, Baneshwor",
      status: "Under Review",
      submittedAt: "2024-12-07 2:30 PM",
      description: "Large pothole causing traffic issues"
    },
    {
      id: 2,
      type: "Traffic Signal",
      location: "Maitighar Mandala",
      status: "Resolved",
      submittedAt: "2024-12-06 10:15 AM",
      description: "Traffic light not working properly"
    }
  ]);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Report submitted:", reportForm);
    // Reset form
    setReportForm({
      type: "",
      location: "",
      description: "",
      severity: "medium",
      images: []
    });
  };

  const handleAddEmergencyContact = () => {
    if (newContact.name && newContact.phone) {
      const updatedContacts = [...emergencyContacts, newContact];
      setEmergencyContacts(updatedContacts);
      if (user) {
        updateProfile({ emergencyContacts: updatedContacts });
      }
      setNewContact({ name: "", phone: "", relation: "" });
    }
  };

  const handleRemoveEmergencyContact = (index: number) => {
    const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
    setEmergencyContacts(updatedContacts);
    if (user) {
      updateProfile({ emergencyContacts: updatedContacts });
    }
  };

  const handleSettingsChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    if (user) {
      updateProfile({
        preferences: {
          ...user.preferences,
          [key]: value
        }
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReportForm(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  if (!user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <Card className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          <CardHeader className="relative border-b border-slate-200/50 dark:border-slate-700/50">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 w-8 h-8 p-0"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user.preferences.aiAssistantAvatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  {user.name}
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-600">
                    {user.role}
                  </Badge>
                </CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="max-h-[calc(90vh-8rem)] overflow-y-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 m-4 mb-0">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Reports
                  </TabsTrigger>
                  <TabsTrigger value="emergency" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Emergency
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>

                <div className="p-4">
                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={user.preferences.aiAssistantAvatar} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Button variant="outline" size="sm">
                              <Camera className="w-4 h-4 mr-2" />
                              Change Photo
                            </Button>
                            <p className="text-xs text-slate-500 mt-1">
                              JPG, PNG or SVG. Max size 2MB.
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="user-name">Name</Label>
                            <Input
                              id="user-name"
                              value={user.name}
                              onChange={(e) => updateProfile({ name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="user-email">Email</Label>
                            <Input
                              id="user-email"
                              value={user.email}
                              disabled
                              className="bg-slate-100 dark:bg-slate-800"
                            />
                          </div>
                        </div>
                        
                        {user.location && (
                          <div>
                            <Label>Current Location</Label>
                            <div className="flex items-center gap-2 mt-1 p-2 bg-slate-50 dark:bg-slate-800 rounded">
                              <MapPin className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">{user.location.address}</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">AI Assistant Preferences</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Assistant Role</Label>
                            <Select 
                              value={settings.aiAssistantRole} 
                              onValueChange={(value) => handleSettingsChange('aiAssistantRole', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="friend">Friend</SelectItem>
                                <SelectItem value="boss">Boss</SelectItem>
                                <SelectItem value="family">Family Member</SelectItem>
                                <SelectItem value="guide">Guide</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Assistant Gender</Label>
                            <Select 
                              value={settings.aiAssistantGender} 
                              onValueChange={(value) => handleSettingsChange('aiAssistantGender', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Reports Tab */}
                  <TabsContent value="reports" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Submit New Report</CardTitle>
                        <CardDescription>
                          Report road issues, accidents, or other problems to help improve road safety
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleReportSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="report-type">Report Type</Label>
                              <Select value={reportForm.type} onValueChange={(value) => setReportForm({...reportForm, type: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="road-damage">Road Damage</SelectItem>
                                  <SelectItem value="accident">Accident</SelectItem>
                                  <SelectItem value="traffic-signal">Traffic Signal Issue</SelectItem>
                                  <SelectItem value="pothole">Pothole</SelectItem>
                                  <SelectItem value="landslide">Landslide</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="report-severity">Severity</Label>
                              <Select value={reportForm.severity} onValueChange={(value) => setReportForm({...reportForm, severity: value})}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="report-location">Location</Label>
                            <Input
                              id="report-location"
                              value={reportForm.location}
                              onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
                              placeholder="e.g., Ring Road near Baneshwor"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="report-description">Description</Label>
                            <Textarea
                              id="report-description"
                              value={reportForm.description}
                              onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                              placeholder="Describe the issue in detail..."
                              rows={3}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="report-images">Add Photos (Optional)</Label>
                            <Input
                              id="report-images"
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="mt-1"
                            />
                            {reportForm.images.length > 0 && (
                              <div className="text-sm text-slate-500 mt-1">
                                {reportForm.images.length} image(s) selected
                              </div>
                            )}
                          </div>
                          
                          <Button type="submit" className="w-full">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Submit Report
                          </Button>
                        </form>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">My Reports</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {userReports.map((report) => (
                            <div key={report.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                  <AlertTriangle className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium">{report.type}</div>
                                  <div className="text-sm text-slate-500">{report.location}</div>
                                  <div className="text-xs text-slate-400 flex items-center gap-2">
                                    <Clock className="w-3 h-3" />
                                    {report.submittedAt}
                                  </div>
                                </div>
                              </div>
                              <Badge variant={report.status === 'Resolved' ? 'default' : 'secondary'}>
                                {report.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Emergency Tab */}
                  <TabsContent value="emergency" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Emergency Contacts</CardTitle>
                        <CardDescription>
                          Add trusted contacts for emergency situations
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {emergencyContacts.map((contact, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <Heart className="w-5 h-5 text-red-600" />
                              </div>
                              <div>
                                <div className="font-medium">{contact.name}</div>
                                <div className="text-sm text-slate-500">{contact.phone}</div>
                                <div className="text-xs text-slate-400">{contact.relation}</div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveEmergencyContact(index)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                        
                        <Separator />
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Add New Contact</h4>
                          <div className="grid grid-cols-3 gap-3">
                            <Input
                              placeholder="Name"
                              value={newContact.name}
                              onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                            />
                            <Input
                              placeholder="Phone"
                              value={newContact.phone}
                              onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                            />
                            <Input
                              placeholder="Relation"
                              value={newContact.relation}
                              onChange={(e) => setNewContact({...newContact, relation: e.target.value})}
                            />
                          </div>
                          <Button onClick={handleAddEmergencyContact} className="w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Contact
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Quick Emergency Numbers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline" className="justify-start">
                            <Phone className="w-4 h-4 mr-2" />
                            Police: 100
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <Phone className="w-4 h-4 mr-2" />
                            Fire: 101
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <Phone className="w-4 h-4 mr-2" />
                            Ambulance: 102
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <Phone className="w-4 h-4 mr-2" />
                            Traffic Police: 103
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Settings Tab */}
                  <TabsContent value="settings" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">App Preferences</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            <Label>Notifications</Label>
                          </div>
                          <Switch 
                            checked={settings.notifications}
                            onCheckedChange={(value) => handleSettingsChange('notifications', value)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {settings.voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                            <Label>Voice Search</Label>
                          </div>
                          <Switch 
                            checked={settings.voiceEnabled}
                            onCheckedChange={(value) => handleSettingsChange('voiceEnabled', value)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {settings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                            <Label>Dark Mode</Label>
                          </div>
                          <Switch 
                            checked={settings.darkMode}
                            onCheckedChange={(value) => handleSettingsChange('darkMode', value)}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Language & Region</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>App Language</Label>
                          <Select 
                            value={settings.language} 
                            onValueChange={(value) => handleSettingsChange('language', value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ne">नेपाली (Nepali)</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-end">
                      <Button onClick={() => console.log('Settings saved')}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Settings
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}