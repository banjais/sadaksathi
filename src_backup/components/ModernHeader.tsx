// src/components/ModernHeader.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Moon, Sun, Globe, Bell, User, Menu, X, Navigation 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import type { LanguageCode } from "../utils/translations";
import { languages } from "../utils/translations";

interface ModernHeaderProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  currentLanguage?: LanguageCode;
  onLanguageChange?: (language: LanguageCode) => void;
  isLoggedIn?: boolean;
  onShowLogin?: () => void;
  onShowUserPanel?: () => void;
  hasActiveTrip?: boolean;
  onShowActiveTrip?: () => void;
  notifications?: number;
  onNotificationClick?: () => void;
}

export function ModernHeader({
  isDarkMode = false,
  onToggleDarkMode,
  currentLanguage = "en",
  onLanguageChange,
  isLoggedIn = false,
  onShowLogin,
  onShowUserPanel,
  hasActiveTrip = false,
  onShowActiveTrip,
  notifications = 0,
  onNotificationClick
}: ModernHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentLang = languages.find(l => l.code === currentLanguage);

  return (
    <>
      {/* Desktop & Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/95 dark:bg-slate-950/95 border-b border-slate-200/60 dark:border-slate-700/60 shadow-xl"
      >
        {/* Mobile Notch */}
        <div className="relative h-7 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/95" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative z-10 h-6 w-40 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-600 dark:via-teal-600 dark:to-cyan-600 rounded-b-3xl shadow-lg"
          >
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-800/30 dark:bg-white/20 rounded-full" />
            <div className="absolute top-1 right-3 w-1.5 h-1.5 bg-slate-800/40 dark:bg-white/30 rounded-full" />
          </motion.div>
        </div>

        <div className="max-w-[2000px] mx-auto">
          <div className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
            
            {/* Left: Logo */}
            <motion.div className="flex items-center gap-3 cursor-pointer flex-shrink-0">
              <div className="relative p-2.5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl">
                <span className="text-2xl">🛣️</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Sadak-Sathi
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Road Companion</p>
              </div>
            </motion.div>

            {/* Center: Active Trip (Desktop) */}
            {hasActiveTrip && (
              <motion.div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 cursor-pointer hover:shadow-lg transition-all"
                onClick={onShowActiveTrip}
              >
                <Navigation className="h-4 w-4 text-green-600 dark:text-green-400 animate-pulse" />
                <span className="font-semibold text-green-700 dark:text-green-300 text-sm">
                  Trip in Progress
                </span>
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>
              </motion.div>
            )}

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={onNotificationClick}
              >
                <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                    {notifications > 9 ? "9+" : notifications}
                  </Badge>
                )}
              </Button>

              {/* Dark Mode */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleDarkMode}
                className="rounded-xl hidden sm:flex hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isDarkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-600" />}
              </Button>

              {/* Language */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex gap-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Globe className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-2xl">{currentLang?.flag}</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {currentLang?.nativeName}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {languages.map(lang => (
                    <DropdownMenuItem key={lang.code} onClick={() => onLanguageChange?.(lang.code)}>
                      {lang.flag} {lang.nativeName}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile / Login */}
              {isLoggedIn ? (
                <Button variant="outline" size="sm" onClick={onShowUserPanel} className="hidden sm:flex gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600">
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">Profile</span>
                </Button>
              ) : (
                <Button size="sm" onClick={onShowLogin} className="hidden sm:flex gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              )}

              {/* Hamburger Mobile Menu */}
              <Button variant="ghost" size="icon" className="sm:hidden rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Quick access to all features</SheetDescription>
          </SheetHeader>
          <div className="space-y-2 mt-6">
            {isLoggedIn ? (
              <Button onClick={onShowUserPanel} className="w-full justify-start gap-3">
                <User className="h-5 w-5" /> My Profile
              </Button>
            ) : (
              <Button onClick={onShowLogin} className="w-full justify-start gap-3 bg-gradient-to-r from-blue-500 to-purple-500">
                <User className="h-5 w-5" /> Login / Sign Up
              </Button>
            )}
            <Button onClick={onToggleDarkMode} className="w-full justify-start gap-3">
              {isDarkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-slate-600" />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
