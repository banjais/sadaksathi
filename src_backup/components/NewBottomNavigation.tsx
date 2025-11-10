import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Share2, 
  Route, 
  Calculator, 
  Navigation2, 
  Menu,
  Car
} from "lucide-react";
import type { LanguageCode } from "../utils/translations";

// Simple local translations
const t = (key: string, lang: LanguageCode): string => {
  const translations: Record<string, Record<LanguageCode, string>> = {
    'POIs': { ne: 'स्थान', en: 'POIs', new: 'स्थान', ta: 'स्थान', bho: 'स्थान', mai: 'स्थान', gur: 'स्थान', magar: 'स्थान', rai: 'स्थान', limbu: 'स्थान', sher: 'स्थान', hi: 'स्थान', zh: '地点', ja: '場所', ko: '장소', fr: 'PDI', es: 'PDI', de: 'POI', ar: 'نقاط', th: 'จุด' },
    'Share': { ne: 'साझा', en: 'Share', new: 'साझा', ta: 'साझा', bho: 'साझा', mai: 'साझा', gur: 'साझा', magar: 'साझा', rai: 'साझा', limbu: 'साझा', sher: 'साझा', hi: 'शेयर', zh: '分享', ja: '共有', ko: '공유', fr: 'Partager', es: 'Compartir', de: 'Teilen', ar: 'مشاركة', th: 'แชร์' },
    'Trip': { ne: 'यात्रा', en: 'Trip', new: 'यात्रा', ta: 'यात्रा', bho: 'यात्रा', mai: 'यात्रा', gur: 'यात्रा', magar: 'यात्रा', rai: 'यात्रा', limbu: 'यात्रा', sher: 'यात्रा', hi: 'यात्रा', zh: '旅行', ja: '旅行', ko: '여행', fr: 'Voyage', es: 'Viaje', de: 'Reise', ar: 'رحلة', th: 'ทริป' },
    'Plan': { ne: 'योजना', en: 'Plan', new: 'योजना', ta: 'योजना', bho: 'योजना', mai: 'योजना', gur: 'योजना', magar: 'योजना', rai: 'योजना', limbu: 'योजना', sher: 'योजना', hi: 'प्लान', zh: '计划', ja: '計画', ko: '계획', fr: 'Planifier', es: 'Planificar', de: 'Planen', ar: 'خطة', th: 'วางแผน' },
    'Distance': { ne: 'दूरी', en: 'Distance', new: 'दूरी', ta: 'दूरी', bho: 'दूरी', mai: 'दूरी', gur: 'दूरी', magar: 'दूरी', rai: 'दूरी', limbu: 'दूरी', sher: 'दूरी', hi: 'दूरी', zh: '距离', ja: '距離', ko: '거리', fr: 'Distance', es: 'Distancia', de: 'Entfernung', ar: 'مسافة', th: 'ระยะทาง' },
    'Go': { ne: 'जाउ', en: 'Go', new: 'जाउ', ta: 'जाउ', bho: 'जा', mai: 'जा', gur: 'जाउ', magar: 'जाउ', rai: 'जाउ', limbu: 'जाउ', sher: 'जाउ', hi: 'जाएं', zh: '去', ja: '行く', ko: '가기', fr: 'Aller', es: 'Ir', de: 'Los', ar: 'اذهب', th: 'ไป' },
    'Mode': { ne: 'मोड', en: 'Mode', new: 'मोड', ta: 'मोड', bho: 'मोड', mai: 'मोड', gur: 'मोड', magar: 'मोड', rai: 'मोड', limbu: 'मोड', sher: 'मोड', hi: 'मोड', zh: '模式', ja: 'モード', ko: '모드', fr: 'Mode', es: 'Modo', de: 'Modus', ar: 'وضع', th: 'โหมด' },
    'More': { ne: 'थप', en: 'More', new: 'थप', ta: 'थप', bho: 'अधिक', mai: 'अधिक', gur: 'थप', magar: 'थप', rai: 'थप', limbu: 'थप', sher: 'थप', hi: 'अधिक', zh: '更多', ja: 'その他', ko: '더보기', fr: 'Plus', es: 'Más', de: 'Mehr', ar: 'المزيد', th: 'เพิ่มเติม' }
  };
  return translations[key]?.[lang] || key;
};

interface NewBottomNavigationProps {
  currentLanguage: LanguageCode;
  hasActiveTrip: boolean;
  hasSavedTrips: boolean;
  isExpanded: boolean;
  onPOIs: () => void;
  onShareLocation: () => void;
  onMyTrip: () => void;
  onDistanceCalculator: () => void;
  onNavigate: () => void;
  onTravelMode: () => void;
  onServices: () => void;
}

export function NewBottomNavigation({
  currentLanguage,
  hasActiveTrip,
  hasSavedTrips,
  isExpanded,
  onPOIs,
  onShareLocation,
  onMyTrip,
  onDistanceCalculator,
  onNavigate,
  onTravelMode,
  onServices
}: NewBottomNavigationProps) {
  const buttons = [
    {
      id: 'pois',
      icon: MapPin,
      label: t('POIs', currentLanguage),
      onClick: onPOIs,
      show: true
    },
    {
      id: 'share',
      icon: Share2,
      label: t('Share', currentLanguage),
      onClick: onShareLocation,
      show: true
    },
    {
      id: 'mytrip',
      icon: Route,
      label: hasSavedTrips ? t('Trip', currentLanguage) : t('Plan', currentLanguage),
      onClick: onMyTrip,
      show: true,
      badge: hasActiveTrip
    },
    {
      id: 'calculator',
      icon: Calculator,
      label: t('Distance', currentLanguage),
      onClick: onDistanceCalculator,
      show: true
    },
    {
      id: 'navigate',
      icon: Navigation2,
      label: t('Go', currentLanguage),
      onClick: onNavigate,
      show: true
    },
    {
      id: 'travelmode',
      icon: Car,
      label: t('Mode', currentLanguage),
      onClick: onTravelMode,
      show: true
    },
    {
      id: 'services',
      icon: Menu,
      label: t('More', currentLanguage),
      onClick: onServices,
      show: true
    }
  ];

  return (
    <AnimatePresence mode="wait">
      {isExpanded ? (
        <motion.div
          key="expanded"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full bg-gradient-to-t from-white/95 via-white/90 to-transparent dark:from-slate-900/95 dark:via-slate-900/90 backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-around gap-2">
              {buttons.filter(b => b.show).map((button) => (
            <motion.button
              key={button.id}
              onClick={button.onClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10 transition-all min-w-[62px] touch-manipulation"
            >
              <div className="relative">
                <button.icon className="w-6 h-6 text-slate-700 dark:text-slate-300" strokeWidth={2} />
                {button.badge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg" />
                )}
              </div>
              <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 leading-tight">
                {button.label}
              </span>
            </motion.button>
          ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
