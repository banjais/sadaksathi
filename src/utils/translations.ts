/**
 * translations.ts
 * Loads compiled translation JSON and provides a `t(key, lang)` helper
 */

import translations from "@/data/translations.json";

export type LanguageCode =
  | "ne" | "mai" | "bho" | "newa" | "thr" | "tmg"
  | "dtl" | "spr" | "en" | "hi" | "ja" | "fr"
  | "jr" | "it" | "kr" | "ch";

export const languages: Record<LanguageCode, string> = {
  ne: "Nepali",
  mai: "Maithili",
  bho: "Bhojpuri",
  newa: "Newar",
  thr: "Tharu",
  tmg: "Tamang",
  dtl: "Doteli",
  spr: "Sanskrit",
  en: "English",
  hi: "Hindi",
  ja: "Japanese",
  fr: "French",
  jr: "Jirel",
  it: "Italian",
  kr: "Korean",
  ch: "Chinese",
};

export type TranslationData = Record<string, Record<LanguageCode, string>>;

/**
 * Translate key to given language; fallback chain:
 * lang → en → key
 */
export function t(key: string, lang: LanguageCode = "en"): string {
  const entry = (translations as any)[key];
  if (!entry) return key; // missing key
  return entry[lang] || entry.en || key;
}

/**
 * Get full translation object
 */
export function getTranslations(): TranslationData {
  return translations as TranslationData;
}
