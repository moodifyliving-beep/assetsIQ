"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";

export type Locale = "en" | "es" | "fr" | "de" | "zh" | "ja" | "ar" | "pt" | "hi" | "ru";

export const locales: Locale[] = ["en", "es", "fr", "de", "zh", "ja", "ar", "pt", "hi", "ru"];

const defaultLocale: Locale = "en";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Record<string, any>>({});
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load English messages immediately on mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const mod = await import("../../messages/en.json");
        const loadedMessages = mod.default || mod;
        if (loadedMessages && typeof loadedMessages === "object") {
          setMessages(loadedMessages);
          setIsLoading(false);
        } else {
          console.error("Invalid messages format:", loadedMessages);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to load English messages:", error);
        setIsLoading(false);
      }
    };
    loadMessages();
  }, []);

  // Handle client-side mounting and locale detection
  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== "undefined") {
      // Load locale from cookie or browser language
      const savedLocale = Cookies.get("locale") as Locale;
      if (savedLocale && locales.includes(savedLocale)) {
        setLocaleState(savedLocale);
      } else {
        // Detect browser language
        const browserLang = navigator.language.split("-")[0] as Locale;
        if (locales.includes(browserLang)) {
          setLocaleState(browserLang);
        }
      }
    }
  }, []);

  // Load locale-specific messages when locale changes (after mount)
  useEffect(() => {
    if (!mounted || isLoading) return;
    
    // If English, messages already loaded
    if (locale === "en") {
      return;
    }
    
    // Load locale-specific messages
    setIsLoading(true);
    import(`../../messages/${locale}.json`)
      .then((mod) => {
        const loadedMessages = mod.default || mod;
        if (loadedMessages && typeof loadedMessages === "object") {
          setMessages(loadedMessages);
        }
        setIsLoading(false);
      })
      .catch(() => {
        // Fallback to English if locale file doesn't exist
        import("../../messages/en.json")
          .then((mod) => {
            const loadedMessages = mod.default || mod;
            if (loadedMessages && typeof loadedMessages === "object") {
              setMessages(loadedMessages);
            }
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      });
  }, [locale, mounted, isLoading]);

  const setLocale = (newLocale: Locale) => {
    if (typeof window === "undefined") return;
    setLocaleState(newLocale);
    Cookies.set("locale", newLocale, { expires: 365 });
    // Update HTML lang attribute
    document.documentElement.setAttribute("lang", newLocale);
    document.documentElement.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr");
  };

  const t = (key: string): string => {
    // If messages not loaded yet, return key (will be replaced when messages load)
    if (!messages || Object.keys(messages).length === 0) {
      return key;
    }
    
    // Navigate through nested object structure
    const keys = key.split(".");
    let value: any = messages;
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Key not found, return the key itself (don't log in production to avoid spam)
        return key;
      }
    }
    
    // Return the value if it's a string, otherwise return the key
    return typeof value === "string" ? value : key;
  };

  // Set initial HTML attributes
  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
  }, [locale, mounted]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return a safe fallback instead of throwing
    return {
      locale: "en" as Locale,
      setLocale: () => {},
      t: (key: string) => key,
    };
  }
  return context;
}
