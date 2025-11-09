import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Settings,
  Moon,
  Sun,
  Globe,
  Palette,
  Check,
  User,
  LogIn,
  MapPinned,
  Navigation
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { LanguageCode } from "../utils/translations";
import { languages } from "../utils/translations";
import { colorThemes, getThemeById } from "../utils/colorThemes";

interface SimplifiedHeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentLanguage: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
  onShowPreferences?: () => void;
  onShowTripPlanner?: () => void;
  onShowSavedTrips?: () => void;
  isLoggedIn?: boolean;
  onShowLogin?: () => void;
  onShowUserPanel?: () => void;
  hasActiveTrip?: boolean;
  onShowActiveTrip?: () => void;
}

export function SimplifiedHeader({
  isDarkMode,
  onToggleDarkMode,
  currentLanguage,
  onLanguageChange,
  currentTheme,
  onThemeChange,
  onShowPreferences,
  onShowTripPlanner,
  onShowSavedTrips,
  isLoggedIn,
  onShowLogin,
  onShowUserPanel,
  hasActiveTrip,
  onShowActiveTrip
}: SimplifiedHeaderProps) {
  const selectedTheme = getThemeById(currentTheme);
  const currentLang = languages.find(l => l.code === currentLanguage);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50" />
              <div className="relative p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <span className="text-2xl">🛣️</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Sadak-Sathi
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Your Road Companion</p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Trip Manager - Merged Plan Trip & My Trip */}
            {(onShowTripPlanner || onShowSavedTrips || onShowActiveTrip) && (
              <Button
                variant="outline"
                size="sm"
                onClick={hasActiveTrip ? onShowActiveTrip : (onShowSavedTrips || onShowTripPlanner)}
                className={`gap-2 hidden sm:flex ${
                  hasActiveTrip 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30' 
                    : ''
                }`}
              >
                {hasActiveTrip ? (
                  <>
                    <Navigation className="h-4 w-4 animate-pulse" />
                    <span>My Trip</span>
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600 ml-1">
                      Active
                    </Badge>
                  </>
                ) : (
                  <>
                    <MapPinned className="h-4 w-4" />
                    <span>Plan Trip</span>
                  </>
                )}
              </Button>
            )}

            {/* User/Login */}
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={onShowUserPanel}
                className="gap-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onShowLogin}
                className="gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}

            {/* Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 relative"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>App Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Dark Mode */}
                <DropdownMenuItem onClick={onToggleDarkMode}>
                  {isDarkMode ? (
                    <Sun className="h-4 w-4 mr-2" />
                  ) : (
                    <Moon className="h-4 w-4 mr-2" />
                  )}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Language
                </DropdownMenuLabel>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    {currentLanguage === lang.code && (
                      <Check className="h-4 w-4 text-blue-500" />
                    )}
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Color Theme
                </DropdownMenuLabel>
                {colorThemes.map((theme) => (
                  <DropdownMenuItem
                    key={theme.id}
                    onClick={() => onThemeChange(theme.id)}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <span>{theme.name}</span>
                    </span>
                    {currentTheme === theme.id && (
                      <Check className="h-4 w-4 text-blue-500" />
                    )}
                  </DropdownMenuItem>
                ))}

                {onShowPreferences && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onShowPreferences}>
                      <Settings className="h-4 w-4 mr-2" />
                      All Preferences
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
