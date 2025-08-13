import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { geminiService } from '@/services/geminiService';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  availableLanguages: Language[];
  changeLanguage: (language: Language) => void;
  translateText: (text: string) => Promise<string>;
  isTranslating: boolean;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [isTranslating, setIsTranslating] = useState(false);

  const changeLanguage = useCallback((language: Language) => {
    setCurrentLanguage(language);
  }, []);

  const translateText = useCallback(async (text: string): Promise<string> => {
    if (currentLanguage.code === 'en') return text;
    
    setIsTranslating(true);
    try {
      const translatedText = await geminiService.translateText(text, currentLanguage.name);
      return translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // Return original text if translation fails
    } finally {
      setIsTranslating(false);
    }
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        availableLanguages: languages,
        changeLanguage,
        translateText,
        isTranslating,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};