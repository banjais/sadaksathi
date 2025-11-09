import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Users,
  Bell,
  Settings,
  Shield,
  MessageCircle,
  Sliders,
  MapPinned,
  LogOut,
  Crown,
  X
} from "lucide-react";
import type { LanguageCode } from "../utils/translations";

// Simple local translations  
const t = (key: string, lang: LanguageCode): string => {
  const trans: Record<string, Record<string, string>> = {
    'User Mode': { ne: 'प्रयोगकर्ता मोड', en: 'User Mode', hi: 'यूजर मोड' },
    'My Preference': { ne: 'मेरो प्राथमिकता', en: 'My Preference', hi: 'मेरी पसंद' },
    'Notifications': { ne: 'सूचनाहरू', en: 'Notifications', hi: 'नोटिफिकेशन' },
    'AI Assistant': { ne: 'एआई सहायक', en: 'AI Assistant', hi: 'एआई असिस्टेंट' },
    'Emergency': { ne: 'आपतकालीन', en: 'Emergency', hi: 'आपातकाल' },
    'Logout': { ne: 'लगआउट', en: 'Logout', hi: 'लॉगआउट' }
  };
  return trans[key]?.[lang] || trans[key]?.['en'] || key;
};

interface ServicesMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  isLoggedIn: boolean;
  userRole: 'user' | 'admin' | 'superadmin';
  onUserMode: () => void;
  onPreferences: () => void;
  onEmergency: () => void;
  onNotifications: () => void;
  onAIAssistant: () => void;
  onLogout?: () => void;
}

export function ServicesMenu({
  isOpen,
  onClose,
  currentLanguage,
  isLoggedIn,
  userRole,
  onUserMode,
  onPreferences,
  onEmergency,
  onNotifications,
  onAIAssistant,
  onLogout
}: ServicesMenuProps) {
  const menuItems = [
    {
      id: 'user-mode',
      icon: userRole === 'superadmin' ? Crown : userRole === 'admin' ? Settings : User,
      label: t('User Mode', currentLanguage),
      onClick: onUserMode,
      show: isLoggedIn,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'preferences',
      icon: Sliders,
      label: t('My Preference', currentLanguage),
      onClick: onPreferences,
      show: true,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'notifications',
      icon: Bell,
      label: t('Notifications', currentLanguage),
      onClick: onNotifications,
      show: isLoggedIn,
      gradient: 'from-amber-500 to-amber-600'
    },
    {
      id: 'ai-assistant',
      icon: MessageCircle,
      label: t('AI Assistant', currentLanguage),
      onClick: onAIAssistant,
      show: true,
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'emergency',
      icon: Shield,
      label: t('Emergency', currentLanguage),
      onClick: onEmergency,
      show: true,
      gradient: 'from-red-500 to-red-600'
    },
    {
      id: 'logout',
      icon: LogOut,
      label: t('Logout', currentLanguage),
      onClick: onLogout || (() => {}),
      show: isLoggedIn,
      gradient: 'from-slate-500 to-slate-600'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[120]"
          />

          {/* Services Menu */}
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 z-[130] w-20 sm:w-24 flex items-center"
          >
            <div className="relative h-[80%] w-full ml-4">
              {/* Curved background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/90 dark:from-slate-800/95 dark:to-slate-900/90 backdrop-blur-xl rounded-r-[2rem] shadow-2xl" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute -right-3 top-4 z-10 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <X className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>

              {/* Menu items */}
              <div className="relative h-full flex flex-col items-center justify-center gap-4 py-8 px-2">
                {menuItems.filter(item => item.show).map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      item.onClick();
                      onClose();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex flex-col items-center gap-1"
                  >
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:shadow-xl transition-all`}>
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-slate-600 dark:text-slate-400 text-center max-w-[60px] leading-tight">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
