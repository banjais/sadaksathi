import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { 
  AlertTriangle, 
  MapPin, 
  Navigation, 
  X,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import type { RoadIncident } from '../types';
import { translateObject } from '../i18n/translator';

interface ReportPanelProps {
  incidents: RoadIncident[];
  language: string;
  onSelect: (incident: RoadIncident) => void;
}

export default function ReportPanel({ incidents, language, onSelect }: ReportPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const statusColors = {
    'Blocked': 'bg-red-500 text-white',
    'One-Lane': 'bg-orange-500 text-white',
    'Resumed': 'bg-green-500 text-white',
    'Normal': 'bg-blue-500 text-white'
  };

  const filteredIncidents = filter === 'all' 
    ? incidents 
    : incidents.filter(inc => inc.status === filter);

  const counts = {
    all: incidents.length,
    Blocked: incidents.filter(i => i.status === 'Blocked').length,
    'One-Lane': incidents.filter(i => i.status === 'One-Lane').length,
    Resumed: incidents.filter(i => i.status === 'Resumed').length
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="fixed left-4 top-24 z-[60]"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xl hover:shadow-2xl"
        >
          <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
          Road Reports ({incidents.length})
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -400, opacity: 0 }}
        className="fixed left-4 top-24 bottom-24 z-[60] w-80 max-w-[90vw]"
      >
        <Card className="h-full flex flex-col backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 shadow-2xl border-2">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <h3 className="font-semibold">Road Incidents</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8"
              >
                {isMinimized ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Filters */}
              <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                    className="text-xs"
                  >
                    All ({counts.all})
                  </Button>
                  <Button
                    variant={filter === 'Blocked' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('Blocked')}
                    className="text-xs"
                  >
                    Blocked ({counts.Blocked})
                  </Button>
                  <Button
                    variant={filter === 'One-Lane' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('One-Lane')}
                    className="text-xs"
                  >
                    One-Lane ({counts['One-Lane']})
                  </Button>
                  <Button
                    variant={filter === 'Resumed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('Resumed')}
                    className="text-xs"
                  >
                    Resumed ({counts.Resumed})
                  </Button>
                </div>
              </div>

              {/* Incidents List */}
              <ScrollArea className="flex-1">
                <div className="p-3 space-y-2">
                  {filteredIncidents.length === 0 ? (
                    <div className="text-center text-slate-500 py-8">
                      <AlertTriangle className="h-12 w-12 mx-auto mb-2 opacity-20" />
                      <p>No incidents reported</p>
                    </div>
                  ) : (
                    filteredIncidents.map((incident, index) => {
                      const highwayName = translateObject(incident.highwayName, language);
                      const placeName = translateObject(incident.place, language);
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card
                            className="p-3 hover:shadow-md transition-shadow cursor-pointer border-l-4"
                            style={{
                              borderLeftColor: 
                                incident.status === 'Blocked' ? '#ff0000' :
                                incident.status === 'One-Lane' ? '#ff9900' :
                                incident.status === 'Resumed' ? '#28a745' : '#007bff'
                            }}
                            onClick={() => onSelect(incident)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm line-clamp-1">
                                  {highwayName}
                                </h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                                  {placeName}
                                </p>
                              </div>
                              <Badge 
                                className={`ml-2 text-xs ${statusColors[incident.status as keyof typeof statusColors] || 'bg-slate-500 text-white'}`}
                              >
                                {incident.status}
                              </Badge>
                            </div>

                            {incident.chainage && (
                              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-2">
                                <MapPin className="h-3 w-3" />
                                Chainage: {incident.chainage} m
                              </div>
                            )}

                            {incident.description && (
                              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                                {incident.description}
                              </p>
                            )}

                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelect(incident);
                              }}
                            >
                              <Navigation className="h-3 w-3 mr-1" />
                              View on Map
                            </Button>
                          </Card>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
