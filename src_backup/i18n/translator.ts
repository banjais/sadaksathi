// Translation system for Sadak-Sathi
import { getTranslation } from '../utils/translations';
import type { LanguageCode } from '../utils/translations';

let currentLanguage: LanguageCode = 'en';

export function changeLanguage(lang: string) {
  currentLanguage = lang as LanguageCode;
}

export function getCurrentLanguage(): LanguageCode {
  return currentLanguage;
}

// Dynamic translation function
export function tDynamic(key: string, lang?: string): string {
  const targetLang = (lang || currentLanguage) as LanguageCode;
  return getTranslation(key, targetLang);
}

// Auto-detect and translate key
export async function autoDetectAndTranslateKey(
  text: string, 
  targetLang: string
): Promise<string> {
  // If already in target language or no translation needed, return as-is
  if (!text || text === '-') return text;
  
  // For now, return the text as-is
  // In production, this would use a translation API
  return text;
}

// Translate object with language variants
export function translateObject(
  obj: { [key: string]: string | undefined } | undefined,
  lang: string
): string {
  if (!obj) return '-';
  return obj[lang] || obj['en'] || Object.values(obj).find(v => v) || '-';
}
