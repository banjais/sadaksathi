import { useState, useEffect } from "react";

// Type for the translations JSON
interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

type Lang = "en" | "ne" | string; // Extendable

let translations: Translations = {};

// Load translations.json once
async function loadTranslations() {
  if (Object.keys(translations).length > 0) return translations;

  try {
    const res = await fetch("/src/data/translations.json");
    translations = await res.json();
    return translations;
  } catch (err) {
    console.error("❌ Failed to load translations.json:", err);
    translations = {};
    return translations;
  }
}

/**
 * Hook: useTranslation
 * @param defaultLang optional initial language (default: "en")
 */
export function useTranslation(defaultLang: Lang = "en") {
  const [lang, setLang] = useState<Lang>(defaultLang);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadTranslations().then(() => setLoaded(true));
  }, []);

  /**
   * t: Translate a key
   * @param key string key from translations.json
   * @param fallback optional fallback text
   */
  function t(key: string, fallback?: string) {
    if (!loaded) return fallback || key;

    const entry = translations[key];
    if (!entry) {
      console.warn(`⚠️ Missing key in translations.json: ${key}`);
      return fallback || key;
    }

    return entry[lang] || fallback || key;
  }

  return { t, lang, setLang, loaded };
}
