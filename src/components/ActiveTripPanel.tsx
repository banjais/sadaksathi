import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  X,
  Navigation,
  MapPin,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Edit,
  XCircle,
  ArrowLeftRight,
  AlertTriangle,
  TrendingUp,
  Users,
  Fuel,
  Route as RouteIcon,
  Settings
} from "lucide-react";
import type { Trip } from "../utils/tripPlanning";
import type { RouteAlternative, RouteIssue } from "../utils/routeAlternatives";
import type { LanguageCode } from "../utils/translations";

interface ActiveTripPanelProps {
  currentLanguage: LanguageCode;
  trip: Trip;
  currentRoute?: RouteAlternative;
  issues: RouteIssue[];
  progress: number; // 0-100
  onClose: () => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onViewAlternatives: () => void;
  onPlanReturn: (sameRoute: boolean) => void;
  onViewGroupPanel?: () => void;
}

export function ActiveTripPanel({
  currentLanguage,
  trip,
  currentRoute,
  issues,
  progress,
  onClose,
  onPause,
  onResume,
  onRestart,
  onEdit,
  onCancel,
  onViewAlternatives,
  onPlanReturn,
  onViewGroupPanel
}: ActiveTripPanelProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRestartDialog, setShowRestartDialog] = useState(false);
  const [showReturnDialog, setShowReturnDialog] = useState(false);

  const handlePauseToggle = () => {
    if (isPaused) {
      onResume();
    } else {
      onPause();
    }
    setIsPaused(!isPaused);
  };

  const handleRestart = () => {
    setShowRestartDialog(false);
    onRestart();
  };

  const handleCancel = () => {
    setShowCancelDialog(false);
    onCancel();
  };

  const handleReturn = (sameRoute: boolean) => {
    setShowReturnDialog(false);
    onPlanReturn(sameRoute);
  };

  const criticalIssues = issues.filter(i => i.severity === 'critical' || i.severity === 'high');
  const estimatedTimeRemaining = currentRoute 
    ? Math.round((currentRoute.durationWithTraffic * (100 - progress)) / 100)
    : 0;

  return (
    <>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed right-0 top-0 bottom-0 w-full md:w-96 z-[90] pointer-events-none"
      >
        <div className="h-full p-4 flex flex-col pointer-events-auto">
          <Card className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-700/50 shadow-2xl h-full flex flex-col">
            {/* Header */}
            <CardHeader className="border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isPaused 
                      ? 'bg-gradient-to-br from-amber-500 to-orange-500' 
                      : 'bg-gradient-to-br from-green-500 to-emerald-500'
                  }`}>
                    <Navigation className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Active Trip</CardTitle>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {isPaused ? 'Paused' : 'In Progress'}
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
            </CardHeader>

            {/* Content */}
            <ScrollArea className="flex-1">
              <CardContent className="p-4 space-y-4">
                {/* Trip Info */}
                <div>
                  <h3 className="font-semibold mb-2">{trip.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>{trip.origin.name}</span>
                    </div>
                    <span>→</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span>{trip.destination.name}</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Trip Progress</span>
                    <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                    <span>Started</span>
                    <span>{estimatedTimeRemaining} min remaining</span>
                  </div>
                </div>

                <Separator />

                {/* Current Route Info */}
                {currentRoute && (
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <RouteIcon className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-blue-900 dark:text-blue-100">
                        {currentRoute.name}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">Distance</div>
                        <div className="font-semibold text-blue-900 dark:text-blue-100">
                          {currentRoute.distance.toFixed(1)} km
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">Duration</div>
                        <div className="font-semibold text-blue-900 dark:text-blue-100">
                          {currentRoute.durationWithTraffic} min
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Critical Issues Alert */}
                {criticalIssues.length > 0 && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-red-900 dark:text-red-100 mb-1">
                          {criticalIssues.length} Critical Issue{criticalIssues.length > 1 ? 's' : ''} Ahead
                        </div>
                        <div className="text-sm text-red-700 dark:text-red-300 space-y-1">
                          {criticalIssues.slice(0, 2).map((issue) => (
                            <div key={issue.id}>• {issue.description}</div>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={onViewAlternatives}
                          className="mt-2 w-full gap-2 border-red-300 dark:border-red-700"
                        >
                          <TrendingUp className="h-4 w-4" />
                          View Alternative Routes
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Group Info */}
                {trip.isGroup && (
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <span className="font-medium text-purple-900 dark:text-purple-100">
                          {trip.travelers.length} Members
                        </span>
                      </div>
                      {onViewGroupPanel && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={onViewGroupPanel}
                          className="border-purple-300 dark:border-purple-700"
                        >
                          View Group
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                <Separator />

                {/* Trip Controls */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm mb-3">Trip Controls</h4>

                  {/* Pause/Resume */}
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handlePauseToggle}
                  >
                    {isPaused ? (
                      <>
                        <Play className="h-4 w-4" />
                        Resume Trip
                      </>
                    ) : (
                      <>
                        <Pause className="h-4 w-4" />
                        Pause Trip
                      </>
                    )}
                  </Button>

                  {/* View Alternatives */}
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={onViewAlternatives}
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                    Alternative Routes
                  </Button>

                  {/* Edit Trip */}
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={onEdit}
                  >
                    <Edit className="h-4 w-4" />
                    Edit Trip Details
                  </Button>

                  {/* Restart */}
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setShowRestartDialog(true)}
                  >
                    <RotateCcw className="h-4 w-4" />
                    Restart Trip
                  </Button>
                </div>

                <Separator />

                {/* Return Trip */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm mb-3">Plan Return</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    Plan your return journey when you're ready
                  </p>

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setShowReturnDialog(true)}
                  >
                    <RouteIcon className="h-4 w-4" />
                    Plan Return Trip
                  </Button>
                </div>

                <Separator />

                {/* Danger Zone */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm mb-3 text-red-600 dark:text-red-400">
                    Danger Zone
                  </h4>

                  <Button
                    variant="destructive"
                    className="w-full gap-2"
                    onClick={() => setShowCancelDialog(true)}
                  >
                    <XCircle className="h-4 w-4" />
                    Cancel Trip
                  </Button>
                </div>

                {/* Trip Stats */}
                {trip.vehicle && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Fuel className="h-4 w-4 text-slate-500" />
                      <span className="font-medium text-sm">Vehicle Info</span>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      {trip.vehicle.model && <div>Model: {trip.vehicle.model}</div>}
                      {trip.vehicle.plateNumber && <div>Plate: {trip.vehicle.plateNumber}</div>}
                      {trip.vehicle.fuelLevel && (
                        <div className="flex items-center gap-2">
                          <span>Fuel:</span>
                          <Progress value={trip.vehicle.fuelLevel} className="h-1 flex-1" />
                          <span>{trip.vehicle.fuelLevel}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      </motion.div>

      {/* Cancel Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Trip?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this trip? This action cannot be undone.
              Your trip progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep Going</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600"
            >
              Yes, Cancel Trip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Restart Dialog */}
      <AlertDialog open={showRestartDialog} onOpenChange={setShowRestartDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restart Trip?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset your trip progress and start navigation from the beginning.
              Your current position will be used as the new starting point.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRestart}>
              Restart Trip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Return Trip Dialog */}
      <AlertDialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Plan Return Trip</AlertDialogTitle>
            <AlertDialogDescription>
              How would you like to return?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 py-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-4"
              onClick={() => handleReturn(true)}
            >
              <div className="flex-1 text-left">
                <div className="font-medium">Same Route</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Return using the same path you came
                </div>
              </div>
              <ArrowLeftRight className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-auto p-4"
              onClick={() => handleReturn(false)}
            >
              <div className="flex-1 text-left">
                <div className="font-medium">Different Route</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Choose a different path for return journey
                </div>
              </div>
              <RouteIcon className="h-5 w-5" />
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
