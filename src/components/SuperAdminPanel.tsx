import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { 
  X, 
  Crown, 
  Settings, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Palette, 
  Database,
  Shield,
  Bell,
  Globe,
  Save,
  RotateCcw,
  Eye,
  EyeOff
} from "lucide-react";
import { getTranslation, type LanguageCode } from "../utils/translations";
import { useAuthProvider } from "../hooks/useAuth";

interface SuperAdminPanelProps {
  currentLanguage: LanguageCode;
  onClose: () => void;
}

export function SuperAdminPanel({ currentLanguage, onClose }: SuperAdminPanelProps) {
  const { user } = useAuthProvider();
  const [activeTab, setActiveTab] = useState("ui-control");
  
  // UI Control Settings
  const [appTitle, setAppTitle] = useState("Sadak-Sathi");
  const [appSubtitle, setAppSubtitle] = useState("Smart Road Companion");
  const [searchPlaceholder, setSearchPlaceholder] = useState("Where do you want to go?");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [accentColor, setAccentColor] = useState("#10B981");
  
  // Feature Controls
  const [features, setFeatures] = useState({
    weatherDisplay: true,
    trafficUpdates: true,
    incidentReports: true,
    nearbyServices: true,
    aiAssistant: true,
    voiceSearch: true,
    darkMode: true,
    notifications: true,
    analytics: true,
    userReports: true,
    adminDataInput: true
  });
  
  // User Management
  const [userStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    admins: 5,
    superAdmins: 1,
    todaySignups: 23
  });
  
  // Analytics
  const [analytics] = useState({
    dailyActiveUsers: 856,
    searchQueries: 2341,
    reportSubmissions: 67,
    aiInteractions: 1423,
    averageSessionTime: "12m 34s"
  });

  const toggleFeature = (feature: string) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature as keyof typeof features]
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic
    console.log("Saving super admin settings...");
  };

  const handleResetSettings = () => {
    // Reset to defaults
    setAppTitle("Sadak-Sathi");
    setAppSubtitle("Smart Road Companion");
    setSearchPlaceholder("Where do you want to go?");
    setPrimaryColor("#3B82F6");
    setAccentColor("#10B981");
  };

  if (user?.role !== 'superadmin') {
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
        className="w-full max-w-6xl max-h-[90vh] overflow-hidden"
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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  {getTranslation('superAdmin', currentLanguage)} Panel
                  <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                    Master Control
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Complete system administration and customization
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="max-h-[calc(90vh-8rem)] overflow-y-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 m-4 mb-0">
                  <TabsTrigger value="ui-control" className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    UI Control
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="features" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="system" className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    System
                  </TabsTrigger>
                </TabsList>

                <div className="p-4">
                  {/* UI Control Tab */}
                  <TabsContent value="ui-control" className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">App Branding</h3>
                        
                        <div>
                          <Label htmlFor="app-title">App Title</Label>
                          <Input
                            id="app-title"
                            value={appTitle}
                            onChange={(e) => setAppTitle(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="app-subtitle">App Subtitle</Label>
                          <Input
                            id="app-subtitle"
                            value={appSubtitle}
                            onChange={(e) => setAppSubtitle(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="search-placeholder">Search Placeholder</Label>
                          <Input
                            id="search-placeholder"
                            value={searchPlaceholder}
                            onChange={(e) => setSearchPlaceholder(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Color Scheme</h3>
                        
                        <div>
                          <Label htmlFor="primary-color">Primary Color</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              id="primary-color"
                              type="color"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="w-16 h-10 p-1"
                            />
                            <Input
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="accent-color">Accent Color</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              id="accent-color"
                              type="color"
                              value={accentColor}
                              onChange={(e) => setAccentColor(e.target.value)}
                              className="w-16 h-10 p-1"
                            />
                            <Input
                              value={accentColor}
                              onChange={(e) => setAccentColor(e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <h4 className="font-medium mb-2">Preview</h4>
                          <div 
                            className="w-full h-20 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: primaryColor }}
                          >
                            <div 
                              className="px-4 py-2 rounded-lg"
                              style={{ backgroundColor: accentColor }}
                            >
                              {appTitle}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <Button onClick={handleResetSettings} variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset to Defaults
                      </Button>
                      <Button onClick={handleSaveSettings}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Users Tab */}
                  <TabsContent value="users" className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">{userStats.totalUsers}</div>
                          <div className="text-sm text-slate-600">Total Users</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">{userStats.activeUsers}</div>
                          <div className="text-sm text-slate-600">Active Users</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-purple-600">{userStats.admins}</div>
                          <div className="text-sm text-slate-600">Admins</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-orange-600">{userStats.superAdmins}</div>
                          <div className="text-sm text-slate-600">Super Admins</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-teal-600">{userStats.todaySignups}</div>
                          <div className="text-sm text-slate-600">Today's Signups</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">User Management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Button className="w-full justify-start">
                            <Users className="w-4 h-4 mr-2" />
                            Manage User Roles
                          </Button>
                          <Button className="w-full justify-start" variant="outline">
                            <Shield className="w-4 h-4 mr-2" />
                            Security Settings
                          </Button>
                          <Button className="w-full justify-start" variant="outline">
                            <Bell className="w-4 h-4 mr-2" />
                            Send Notifications
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Admin Controls</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label>Enable Admin Data Input</Label>
                            <Switch 
                              checked={features.adminDataInput}
                              onCheckedChange={() => toggleFeature('adminDataInput')}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Allow User Reports</Label>
                            <Switch 
                              checked={features.userReports}
                              onCheckedChange={() => toggleFeature('userReports')}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Show Analytics Data</Label>
                            <Switch 
                              checked={features.analytics}
                              onCheckedChange={() => toggleFeature('analytics')}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Analytics Tab */}
                  <TabsContent value="analytics" className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-blue-600">{analytics.dailyActiveUsers}</div>
                          <div className="text-sm text-slate-600">Daily Active Users</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">{analytics.searchQueries}</div>
                          <div className="text-sm text-slate-600">Search Queries</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-purple-600">{analytics.reportSubmissions}</div>
                          <div className="text-sm text-slate-600">Reports Submitted</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-orange-600">{analytics.aiInteractions}</div>
                          <div className="text-sm text-slate-600">AI Interactions</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-teal-600">{analytics.averageSessionTime}</div>
                          <div className="text-sm text-slate-600">Avg Session Time</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">System Logs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          <div className="text-sm p-2 bg-slate-50 dark:bg-slate-800 rounded">
                            <span className="text-green-600">[INFO]</span> User authentication successful - user@example.com
                          </div>
                          <div className="text-sm p-2 bg-slate-50 dark:bg-slate-800 rounded">
                            <span className="text-blue-600">[DEBUG]</span> Weather data updated for Kathmandu
                          </div>
                          <div className="text-sm p-2 bg-slate-50 dark:bg-slate-800 rounded">
                            <span className="text-yellow-600">[WARN]</span> High traffic detected on Ring Road
                          </div>
                          <div className="text-sm p-2 bg-slate-50 dark:bg-slate-800 rounded">
                            <span className="text-red-600">[ERROR]</span> Failed to update road status for Prithvi Highway
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Features Tab */}
                  <TabsContent value="features" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Core Features</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {Object.entries(features).slice(0, 6).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                              <Switch checked={value} onCheckedChange={() => toggleFeature(key)} />
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Advanced Features</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {Object.entries(features).slice(6).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                              <Switch checked={value} onCheckedChange={() => toggleFeature(key)} />
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* System Tab */}
                  <TabsContent value="system" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">System Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span>Server Status</span>
                            <Badge variant="default" className="bg-green-100 text-green-600">Online</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Database</span>
                            <Badge variant="default" className="bg-green-100 text-green-600">Connected</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>External APIs</span>
                            <Badge variant="default" className="bg-yellow-100 text-yellow-600">Partial</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Backup Status</span>
                            <Badge variant="default" className="bg-green-100 text-green-600">Updated</Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Maintenance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Button variant="outline" className="w-full justify-start">
                            <Database className="w-4 h-4 mr-2" />
                            Backup Database
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Clear Cache
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Globe className="w-4 h-4 mr-2" />
                            Update Translations
                          </Button>
                          <Button variant="destructive" className="w-full justify-start">
                            <Shield className="w-4 h-4 mr-2" />
                            Maintenance Mode
                          </Button>
                        </CardContent>
                      </Card>
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
