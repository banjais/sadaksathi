import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  X,
  MapPin,
  Calendar,
  Users,
  Navigation,
  Trash2,
  Edit,
  Clock,
  Download,
  Play,
  Car,
  AlertCircle,
  Plus
} from "lucide-react";
import { format } from "date-fns";
import type { Trip, TravelMode } from "../utils/tripPlanning";
import { getTravelModeInfo } from "../utils/tripPlanning";
import type { LanguageCode } from "../utils/translations";

interface SavedTripsProps {
  currentLanguage: LanguageCode;
  trips: Trip[];
  onClose: () => void;
  onStartTrip: (trip: Trip) => void;
  onEditTrip: (trip: Trip) => void;
  onDeleteTrip: (tripId: string) => void;
  onPlanNewTrip?: () => void;
}

export function SavedTrips({
  currentLanguage,
  trips,
  onClose,
  onStartTrip,
  onEditTrip,
  onDeleteTrip,
  onPlanNewTrip
}: SavedTripsProps) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'draft'>('all');

  const filteredTrips = trips.filter(trip => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') {
      return trip.startDate && trip.startDate > new Date() && trip.status !== 'completed';
    }
    if (filter === 'draft') return trip.status === 'draft';
    return true;
  });

  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
      case 'planned': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'ongoing': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'completed': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300';
      case 'cancelled': return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
    }
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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh]"
      >
        <Card className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-700/50 shadow-2xl h-full flex flex-col">
          {/* Header */}
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Saved Trips</CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {trips.length} trip{trips.length !== 1 ? 's' : ''} saved
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {onPlanNewTrip && (
                  <Button
                    size="sm"
                    onClick={() => {
                      onClose();
                      onPlanNewTrip();
                    }}
                    className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">New Trip</span>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mt-4">
              {[
                { id: 'all', label: 'All', count: trips.length },
                { id: 'upcoming', label: 'Upcoming', count: trips.filter(t => t.startDate && t.startDate > new Date()).length },
                { id: 'draft', label: 'Drafts', count: trips.filter(t => t.status === 'draft').length }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={filter === tab.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(tab.id as any)}
                  className="gap-2"
                >
                  {tab.label}
                  <Badge variant={filter === tab.id ? 'secondary' : 'outline'}>
                    {tab.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardHeader>

          {/* Content */}
          <ScrollArea className="flex-1">
            <CardContent className="p-6">
              {filteredTrips.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                  <p className="text-slate-500 dark:text-slate-400">
                    {filter === 'all' ? 'No saved trips yet' : `No ${filter} trips`}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTrips.map((trip) => {
                    const modeInfo = getTravelModeInfo(trip.travelMode);
                    const completedChecks = trip.checklists.reduce(
                      (sum, cat) => sum + cat.items.filter(i => i.checked).length,
                      0
                    );
                    const totalChecks = trip.checklists.reduce(
                      (sum, cat) => sum + cat.items.length,
                      0
                    );
                    const isReady = completedChecks === totalChecks;

                    return (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{trip.name}</h3>
                              <Badge className={getStatusColor(trip.status)}>
                                {trip.status}
                              </Badge>
                              {!isReady && trip.status !== 'completed' && (
                                <Badge variant="outline" className="gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  Incomplete
                                </Badge>
                              )}
                            </div>
                            {trip.description && (
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                {trip.description}
                              </p>
                            )}
                          </div>
                          <span className="text-2xl">{modeInfo.icon}</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          {trip.startDate && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-600 dark:text-slate-400">
                                {format(trip.startDate, 'MMM dd, yyyy')}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-sm">
                            <Car className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-400">
                              {modeInfo.name}
                            </span>
                          </div>

                          {trip.isGroup && (
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-600 dark:text-slate-400">
                                {trip.travelers.length} travelers
                              </span>
                            </div>
                          )}

                          {trip.distance && (
                            <div className="flex items-center gap-2 text-sm">
                              <Navigation className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-600 dark:text-slate-400">
                                {trip.distance} km
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Route */}
                        <div className="flex items-center gap-2 mb-3 text-sm">
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-slate-600 dark:text-slate-400">
                              {trip.origin.name}
                            </span>
                          </div>
                          <div className="flex-shrink-0 text-slate-400">→</div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-slate-600 dark:text-slate-400">
                              {trip.destination.name}
                            </span>
                          </div>
                        </div>

                        {/* Progress */}
                        {trip.status !== 'completed' && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-slate-500 dark:text-slate-400">
                                Preparation
                              </span>
                              <span className="text-slate-500 dark:text-slate-400">
                                {completedChecks}/{totalChecks}
                              </span>
                            </div>
                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full ${
                                  isReady ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${(completedChecks / totalChecks) * 100}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {trip.offlineMapDownloaded && (
                            <Badge variant="outline" className="gap-1">
                              <Download className="h-3 w-3" />
                              Offline Ready
                            </Badge>
                          )}
                          {trip.isGroup && trip.enableGroupChat && (
                            <Badge variant="outline">Group Chat</Badge>
                          )}
                          {trip.shareLocation && (
                            <Badge variant="outline">Location Sharing</Badge>
                          )}
                          {trip.interestType && (
                            <Badge variant="outline" className="capitalize">
                              {trip.interestType}
                            </Badge>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => onStartTrip(trip)}
                            className="flex-1 gap-2 bg-gradient-to-r from-green-500 to-emerald-500"
                            disabled={!isReady && trip.status !== 'draft'}
                          >
                            <Play className="h-4 w-4" />
                            Start Trip
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEditTrip(trip)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onDeleteTrip(trip.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </ScrollArea>
        </Card>
      </motion.div>
    </motion.div>
  );
}
