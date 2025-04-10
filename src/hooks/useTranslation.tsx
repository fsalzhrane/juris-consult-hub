
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/translations';

type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends object
    ? `${K}.${NestedKeyOf<T[K]>}`
    : K;
}[keyof T & string];

export const useTranslation = () => {
  const { language } = useLanguage();
  const currentTranslations = translations[language];

  const t = (key: string): string => {
    // Split key by dots to access nested translations
    const keys = key.split('.');
    let result = { ...currentTranslations };

    for (const k of keys) {
      if (result[k] === undefined) {
        console.warn(`Translation key "${key}" not found`);
        return key;
      }
      result = result[k];
    }

    return result;
  };

  return { t };
};
