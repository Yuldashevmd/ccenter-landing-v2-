import { useLocale, useTranslations } from 'next-intl';

export const useLng = () => {
  const locale = useLocale();
  const t = useTranslations();

  return { locale, t };
};
