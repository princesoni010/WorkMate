import React, { createContext, useState, useEffect } from 'react';
import i18n from 'i18next';

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  const isHindi = language === 'hi';

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isHindi }}>
      {children}
    </LanguageContext.Provider>
  );
};
