'use client';

import React, { createContext, useContext, useState } from 'react';
import { Language, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const t = (key: string): any => {
    const keys = key.split('.');
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        value = (value as Record<string, any>)[k];
      } else {
        return key;
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'am' ? 'font-amharic' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
