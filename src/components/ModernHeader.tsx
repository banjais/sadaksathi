import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Moon, Sun, Globe, Bell, User, Menu, Navigation } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import type { LanguageCode } from "../utils/translations";

interface Language {
  code: LanguageCode;
  nativeName: string;
  flag: string;
}

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
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    // Load languages dynamically from script-properties.json
    fetch("/src/scripts/script-properties.json")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.languages)) {
          setLanguages(data.languages);
        } else {
          setLanguages([{ code: "en", nativeName: "English", flag: "🇺🇸" }]);
        }
      })
      .catch(() => {
        setLanguages([{ code: "en", nativeName: "English", flag: "🇺🇸" }]);
      });
  }, []);

  const currentLang = languages.find(l => l.code === currentLanguage) || languages[0] || { code: "en", nativeName: "English", flag: "🇺🇸" };

  return (
    <>
      {/* Desktop & Mobile Header */}
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/95 dark:bg-slate-950/95 border-b border-slate-200/60 dark:border-slate-700/60 shadow-xl">
        <div className="max-w-[2000px] mx-auto flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
          {/* Left Logo */}
          <div className="flex items-center gap-3 cursor-pointer flex-shrink-0">
            <div className="relative p-2.5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl">
              <span className="text-2xl">🛣️</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Sadak-Sathi
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Road Companion</p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="rounded-xl" onClick={onNotificationClick}>
              <Bell className="h-5 w-5" />
              {notifications > 0 && <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full">{notifications > 9 ? "9+" : notifications}</Badge>}
            </Button>

            {/* Dark Mode */}
            <Button variant="ghost" size="icon" onClick={onToggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex gap-2 rounded-xl">
                  <Globe className="h-4 w-4" />
                  <span className="text-2xl">{currentLang.flag}</span>
                  <span className="text-sm font-medium">{currentLang.nativeName}</span>
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
              <Button variant="outline" size="sm" onClick={onShowUserPanel} className="hidden sm:flex gap-2">
                <User className="h-4 w-4" /> Profile
              </Button>
            ) : (
              <Button size="sm" onClick={onShowLogin} className="hidden sm:flex gap-2 bg-gradient-to-r from-blue-500 to-purple-500">
                <User className="h-4 w-4" /> Login
              </Button>
            )}

            {/* Mobile Hamburger */}
            <Button variant="ghost" size="icon" className="sm:hidden rounded-xl" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
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
              {isDarkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5" />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
