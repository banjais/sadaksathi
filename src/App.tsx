import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapView } from "./components/MapView";
import { ModernHeader } from "./components/ModernHeader";
import { NotificationsPanel } from "./components/NotificationPanel";
import { SunIcon, MoonIcon, BotIcon, BellIcon } from "./components/ui/Icons";
import { toast, Toaster } from "sonner";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleToast = () => toast.success("Welcome to Sadak Sathi!");

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <ModernHeader
          isDarkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onNotificationClick={() => setNotificationsOpen(true)}
        />

        <div className="mt-4 h-[calc(100vh-100px)]">
          <MapView />
        </div>

        {/* Floating Controls */}
        <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg"
            title="Toggle Dark Mode"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={handleToast}
            className="p-3 bg-secondary text-secondary-foreground rounded-full shadow-lg"
            title="Show Toast"
          >
            <BotIcon />
          </button>
          <button
            onClick={() => setNotificationsOpen(true)}
            className="p-3 bg-accent text-accent-foreground rounded-full shadow-lg"
            title="Notifications"
          >
            <BellIcon />
          </button>
        </div>

        <AnimatePresence>
          {notificationsOpen && (
            <NotificationsPanel
              currentLanguage="en"
              onClose={() => setNotificationsOpen(false)}
            />
          )}
        </AnimatePresence>

        <Toaster position="top-right" />
      </div>
    </div>
  );
}
