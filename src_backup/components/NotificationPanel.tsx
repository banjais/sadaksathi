// src/components/NotificationPanel.tsx
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { X, Bell, AlertTriangle, Info, CheckCircle2, Users, Clock, Trash2 } from "lucide-react";
import type { LanguageCode } from "../utils/translations";

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "alert";
  title: string;
  message: string;
  timestamp: Date;
  icon?: any;
  read: boolean;
}

interface NotificationsPanelProps {
  currentLanguage: LanguageCode;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  { id: "1", type: "warning", title: "Traffic Alert", message: "Heavy traffic detected on Prithvi Highway near Mugling.", timestamp: new Date(Date.now() - 5 * 60 * 1000), icon: AlertTriangle, read: false },
  { id: "2", type: "info", title: "Weather Update", message: "Light rain expected in Kathmandu Valley this evening.", timestamp: new Date(Date.now() - 15 * 60 * 1000), icon: Info, read: false },
  { id: "3", type: "success", title: "Trip Saved", message: 'Your trip "Weekend at Pokhara" has been saved successfully.', timestamp: new Date(Date.now() - 30 * 60 * 1000), icon: CheckCircle2, read: true },
  { id: "4", type: "info", title: "Group Update", message: "Ramesh has joined your group trip to Chitwan National Park.", timestamp: new Date(Date.now() - 60 * 60 * 1000), icon: Users, read: true },
  { id: "5", type: "alert", title: "Road Closure", message: "Arniko Highway closed due to landslide.", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), icon: AlertTriangle, read: true },
];

export function NotificationsPanel({ currentLanguage, onClose }: NotificationsPanelProps) {
  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "info": return "from-blue-500 to-cyan-500";
      case "warning": return "from-amber-500 to-orange-500";
      case "success": return "from-green-500 to-emerald-500";
      case "alert": return "from-red-500 to-pink-500";
      default: return "from-slate-500 to-slate-600";
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const diff = Date.now() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg"
      >
        <Card className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          {/* Header */}
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Notifications
                    {unreadCount > 0 && (
                      <Badge variant="default" className="bg-gradient-to-r from-red-500 to-pink-500">
                        {unreadCount} new
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Stay updated with latest alerts
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          {/* Content */}
          <ScrollArea className="max-h-[70vh]">
            <CardContent className="p-0">
              {mockNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-16 w-16 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                  <p className="text-slate-500 dark:text-slate-400">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {mockNotifications.map((notification, index) => {
                    const Icon = notification.icon || Bell;
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                          !notification.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-br ${getNotificationColor(notification.type)}`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-semibold text-slate-900 dark:text-slate-100">{notification.title}</h4>
                              {!notification.read && <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-1.5" />}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{notification.message}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="h-3 w-3 text-slate-400" />
                              <span className="text-xs text-slate-500 dark:text-slate-400">{getTimeAgo(notification.timestamp)}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="flex-shrink-0 h-8 w-8 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                            <Trash2 className="h-4 w-4 text-slate-400" />
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </ScrollArea>

          {/* Footer */}
          {mockNotifications.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
              <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                Mark all as read
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">
                Clear all
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
}
