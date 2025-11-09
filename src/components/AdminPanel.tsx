import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  X, 
  Shield, 
  Plus, 
  MapPin, 
  AlertTriangle, 
  Car, 
  CloudRain,
  Navigation,
  Save,
  FileText,
  BarChart3,
  Calendar,
  Clock
} from "lucide-react";
import { getTranslation, type LanguageCode } from "../utils/translations";
import { useAuthProvider } from "../hooks/useAuth";

interface AdminPanelProps {
  currentLanguage: LanguageCode;
  onClose: () => void;
}

export function AdminPanel({ currentLanguage, onClose }: AdminPanelProps) {
  const { user } = useAuthProvider();
  const [activeTab, setActiveTab] = useState("road-update");
  
  // Road Update Form
  const [roadUpdate, setRoadUpdate] = useState({
    roadName: "",
    roadNameNe: "",
    status: "",
    description: "",
    descriptionNe: "",
    severity: "medium",
    location: "",
    expectedDuration: ""
  });
  
  // Weather Update Form
  const [weatherUpdate, setWeatherUpdate] = useState({
    location: "",
    locationNe: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
    condition: "",
    conditionNe: "",
    visibility: ""
  });
  
  // Incident Report Form
  const [incidentReport, setIncidentReport] = useState({
    type: "",
    location: "",
    locationNe: "",
    description: "",
    descriptionNe: "",
    severity: "medium",
    estimatedClearTime: ""
  });
  
  // Campaign Form
  const [campaign, setCampaign] = useState({
    title: "",
    titleNe: "",
    message: "",
    messageNe: "",
    type: "info",
    startDate: "",
    endDate: "",
    targetAudience: "all"
  });
  
  const [submittedReports] = useState([
    {
      id: 1,
      type: "Road Closure",
      location: "Prithvi Highway",
      status: "Active",
      submittedAt: "2024-12-08 10:30 AM",
      submittedBy: "Admin User"
    },
    {
      id: 2,
      type: "Weather Alert",
      location: "Kathmandu Valley",
      status: "Published",
      submittedAt: "2024-12-08 09:15 AM",
      submittedBy: "Admin User"
    },
    {
      id: 3,
      type: "Traffic Update",
      location: "Ring Road",
      status: "Resolved",
      submittedAt: "2024-12-08 08:45 AM",
      submittedBy: "Admin User"
    }
  ]);

  const handleRoadUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Road update submitted:", roadUpdate);
    // Reset form
    setRoadUpdate({
      roadName: "",
      roadNameNe: "",
      status: "",
      description: "",
      descriptionNe: "",
      severity: "medium",
      location: "",
      expectedDuration: ""
    });
  };

  const handleWeatherUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Weather update submitted:", weatherUpdate);
  };

  const handleIncidentReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Incident report submitted:", incidentReport);
  };

  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Campaign submitted:", campaign);
  };

  if (!user || !['admin', 'superadmin'].includes(user.role)) {
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  {getTranslation('admin', currentLanguage)} Panel
                  <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                    Data Management
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Add and manage road conditions, weather, and incident data
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="max-h-[calc(90vh-8rem)] overflow-y-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 m-4 mb-0">
                  <TabsTrigger value="road-update" className="flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    Roads
                  </TabsTrigger>
                  <TabsTrigger value="weather" className="flex items-center gap-2">
                    <CloudRain className="w-4 h-4" />
                    Weather
                  </TabsTrigger>
                  <TabsTrigger value="incidents" className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Incidents
                  </TabsTrigger>
                  <TabsTrigger value="campaigns" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Campaigns
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Reports
                  </TabsTrigger>
                </TabsList>

                <div className="p-4">
                  {/* Road Update Tab */}
                  <TabsContent value="road-update" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Add Road Status Update
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleRoadUpdateSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="road-name">Road Name (English)</Label>
                              <Input
                                id="road-name"
                                value={roadUpdate.roadName}
                                onChange={(e) => setRoadUpdate({...roadUpdate, roadName: e.target.value})}
                                placeholder="e.g., Prithvi Highway"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="road-name-ne">Road Name (Nepali)</Label>
                              <Input
                                id="road-name-ne"
                                value={roadUpdate.roadNameNe}
                                onChange={(e) => setRoadUpdate({...roadUpdate, roadNameNe: e.target.value})}
                                placeholder="e.g., पृथ्वी राजमार्ग"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="road-status">Status</Label>
                              <Select value={roadUpdate.status} onValueChange={(value) => setRoadUpdate({...roadUpdate, status: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="clear">Clear</SelectItem>
                                  <SelectItem value="one-lane">One Lane Open</SelectItem>
                                  <SelectItem value="blocked">Blocked</SelectItem>
                                  <SelectItem value="construction">Construction</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="severity">Severity</Label>
                              <Select value={roadUpdate.severity} onValueChange={(value) => setRoadUpdate({...roadUpdate, severity: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select severity" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="location">Specific Location</Label>
                            <Input
                              id="location"
                              value={roadUpdate.location}
                              onChange={(e) => setRoadUpdate({...roadUpdate, location: e.target.value})}
                              placeholder="e.g., Near Mugling, Km 78"
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="description">Description (English)</Label>
                              <Textarea
                                id="description"
                                value={roadUpdate.description}
                                onChange={(e) => setRoadUpdate({...roadUpdate, description: e.target.value})}
                                placeholder="Describe the road condition..."
                                rows={3}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="description-ne">Description (Nepali)</Label>
                              <Textarea
                                id="description-ne"
                                value={roadUpdate.descriptionNe}
                                onChange={(e) => setRoadUpdate({...roadUpdate, descriptionNe: e.target.value})}
                                placeholder="सडकको अवस्था वर्णन गर्नुहोस्..."
                                rows={3}
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="expected-duration">Expected Duration</Label>
                            <Input
                              id="expected-duration"
                              value={roadUpdate.expectedDuration}
                              onChange={(e) => setRoadUpdate({...roadUpdate, expectedDuration: e.target.value})}
                              placeholder="e.g., 2-3 hours, Until further notice"
                            />
                          </div>
                          
                          <Button type="submit" className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Submit Road Update
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Weather Tab */}
                  <TabsContent value="weather" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Add Weather Update
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleWeatherUpdateSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="weather-location">Location (English)</Label>
                              <Input
                                id="weather-location"
                                value={weatherUpdate.location}
                                onChange={(e) => setWeatherUpdate({...weatherUpdate, location: e.target.value})}
                                placeholder="e.g., Kathmandu"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="weather-location-ne">Location (Nepali)</Label>
                              <Input
                                id="weather-location-ne"
                                value={weatherUpdate.locationNe}
                                onChange={(e) => setWeatherUpdate({...weatherUpdate, locationNe: e.target.value})}
                                placeholder="e.g., काठमाडौं"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="temperature">Temperature (°C)</Label>
                              <Input
                                id="temperature"
                                type="number"
                                value={weatherUpdate.temperature}
                                onChange={(e) => setWeatherUpdate({...weatherUpdate, temperature: e.target.value})}
                                placeholder="18"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="humidity">Humidity (%)</Label>
                              <Input
                                id="humidity"
                                type="number"
                                value={weatherUpdate.humidity}
                                onChange={(e) => setWeatherUpdate({...weatherUpdate, humidity: e.target.value})}
                                placeholder="65"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="wind-speed">Wind Speed (km/h)</Label>
                              <Input
                                id="wind-speed"
                                type="number"
                                value={weatherUpdate.windSpeed}
                                onChange={(e) => setWeatherUpdate({...weatherUpdate, windSpeed: e.target.value})}
                                placeholder="8"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="weather-condition">Condition (English)</Label>
                              <Select value={weatherUpdate.condition} onValueChange={(value) => setWeatherUpdate({...weatherUpdate, condition: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Clear Sky">Clear Sky</SelectItem>
                                  <SelectItem value="Partly Cloudy">Partly Cloudy</SelectItem>
                                  <SelectItem value="Cloudy">Cloudy</SelectItem>
                                  <SelectItem value="Light Rain">Light Rain</SelectItem>
                                  <SelectItem value="Heavy Rain">Heavy Rain</SelectItem>
                                  <SelectItem value="Foggy">Foggy</SelectItem>
                                  <SelectItem value="Thunderstorm">Thunderstorm</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="weather-condition-ne">Condition (Nepali)</Label>
                              <Input
                                id="weather-condition-ne"
                                value={weatherUpdate.conditionNe}
                                onChange={(e) => setWeatherUpdate({...weatherUpdate, conditionNe: e.target.value})}
                                placeholder="e.g., आंशिक बादल"
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="visibility">Visibility (km)</Label>
                            <Input
                              id="visibility"
                              type="number"
                              value={weatherUpdate.visibility}
                              onChange={(e) => setWeatherUpdate({...weatherUpdate, visibility: e.target.value})}
                              placeholder="10"
                              required
                            />
                          </div>
                          
                          <Button type="submit" className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Submit Weather Update
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Incidents Tab */}
                  <TabsContent value="incidents" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Report New Incident
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleIncidentReportSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="incident-type">Incident Type</Label>
                              <Select value={incidentReport.type} onValueChange={(value) => setIncidentReport({...incidentReport, type: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="accident">Accident</SelectItem>
                                  <SelectItem value="breakdown">Vehicle Breakdown</SelectItem>
                                  <SelectItem value="roadwork">Road Work</SelectItem>
                                  <SelectItem value="weather">Weather Related</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="incident-severity">Severity</Label>
                              <Select value={incidentReport.severity} onValueChange={(value) => setIncidentReport({...incidentReport, severity: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select severity" />
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
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="incident-location">Location (English)</Label>
                              <Input
                                id="incident-location"
                                value={incidentReport.location}
                                onChange={(e) => setIncidentReport({...incidentReport, location: e.target.value})}
                                placeholder="e.g., Ring Road, Baneshwor"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="incident-location-ne">Location (Nepali)</Label>
                              <Input
                                id="incident-location-ne"
                                value={incidentReport.locationNe}
                                onChange={(e) => setIncidentReport({...incidentReport, locationNe: e.target.value})}
                                placeholder="e.g., रिङ रोड, बनेश्वर"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="incident-description">Description (English)</Label>
                              <Textarea
                                id="incident-description"
                                value={incidentReport.description}
                                onChange={(e) => setIncidentReport({...incidentReport, description: e.target.value})}
                                placeholder="Describe the incident..."
                                rows={3}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="incident-description-ne">Description (Nepali)</Label>
                              <Textarea
                                id="incident-description-ne"
                                value={incidentReport.descriptionNe}
                                onChange={(e) => setIncidentReport({...incidentReport, descriptionNe: e.target.value})}
                                placeholder="घटनाको वर्णन गर्नुहोस्..."
                                rows={3}
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="clear-time">Estimated Clear Time</Label>
                            <Input
                              id="clear-time"
                              value={incidentReport.estimatedClearTime}
                              onChange={(e) => setIncidentReport({...incidentReport, estimatedClearTime: e.target.value})}
                              placeholder="e.g., 30 minutes, 2 hours"
                            />
                          </div>
                          
                          <Button type="submit" className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Submit Incident Report
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Campaigns Tab */}
                  <TabsContent value="campaigns" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Create New Campaign
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleCampaignSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="campaign-title">Title (English)</Label>
                              <Input
                                id="campaign-title"
                                value={campaign.title}
                                onChange={(e) => setCampaign({...campaign, title: e.target.value})}
                                placeholder="e.g., Winter Driving Safety"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="campaign-title-ne">Title (Nepali)</Label>
                              <Input
                                id="campaign-title-ne"
                                value={campaign.titleNe}
                                onChange={(e) => setCampaign({...campaign, titleNe: e.target.value})}
                                placeholder="e.g., हिउँदे ड्राइभिङ सुरक्षा"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="campaign-type">Campaign Type</Label>
                              <Select value={campaign.type} onValueChange={(value) => setCampaign({...campaign, type: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="info">Information</SelectItem>
                                  <SelectItem value="warning">Warning</SelectItem>
                                  <SelectItem value="emergency">Emergency</SelectItem>
                                  <SelectItem value="promotion">Promotion</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="target-audience">Target Audience</Label>
                              <Select value={campaign.targetAudience} onValueChange={(value) => setCampaign({...campaign, targetAudience: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select audience" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Users</SelectItem>
                                  <SelectItem value="drivers">Drivers</SelectItem>
                                  <SelectItem value="passengers">Passengers</SelectItem>
                                  <SelectItem value="tourists">Tourists</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="start-date">Start Date</Label>
                              <Input
                                id="start-date"
                                type="datetime-local"
                                value={campaign.startDate}
                                onChange={(e) => setCampaign({...campaign, startDate: e.target.value})}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="end-date">End Date</Label>
                              <Input
                                id="end-date"
                                type="datetime-local"
                                value={campaign.endDate}
                                onChange={(e) => setCampaign({...campaign, endDate: e.target.value})}
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="campaign-message">Message (English)</Label>
                              <Textarea
                                id="campaign-message"
                                value={campaign.message}
                                onChange={(e) => setCampaign({...campaign, message: e.target.value})}
                                placeholder="Campaign message..."
                                rows={4}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="campaign-message-ne">Message (Nepali)</Label>
                              <Textarea
                                id="campaign-message-ne"
                                value={campaign.messageNe}
                                onChange={(e) => setCampaign({...campaign, messageNe: e.target.value})}
                                placeholder="अभियानको सन्देश..."
                                rows={4}
                                required
                              />
                            </div>
                          </div>
                          
                          <Button type="submit" className="w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Create Campaign
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Reports Tab */}
                  <TabsContent value="reports" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Recent Submissions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {submittedReports.map((report) => (
                            <div key={report.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                  <FileText className="w-4 h-4 text-blue-600" />
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
                              <div className="flex items-center gap-2">
                                <Badge variant={
                                  report.status === 'Active' ? 'default' :
                                  report.status === 'Published' ? 'default' : 
                                  'secondary'
                                }>
                                  {report.status}
                                </Badge>
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
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