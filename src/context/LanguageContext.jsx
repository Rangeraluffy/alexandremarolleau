import { createContext, useContext, useEffect, useState } from 'react';
import en from '../locales/en.json';
import fr from '../locales/fr.json';

const LanguageContext = createContext();

const translations = {
  en,
  fr,
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Récupère la langue sauvegardée ou utilise la préférence du navigateur
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }

    // Détecte la langue du navigateur
    const browserLanguage = navigator.language.split('-')[0];
    return translations[browserLanguage] ? browserLanguage : 'en';
  });

  useEffect(() => {
    // Sauvegarde dans localStorage
    localStorage.setItem('language', language);

    // Met à jour l'attribut lang du document
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'fr' : 'en');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key "${key}" not found for language "${language}"`);
        return key;
      }
    }

    return value;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        t,
        isEnglish: language === 'en',
        isFrench: language === 'fr'
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
