'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLng } from 'shared/lib';

export function ChangeLng() {
  const { locale } = useLng();
  const [language, setLanguage] = useState(locale);
  const router = useRouter();

  const lngs = [
    { value: 'en', label: 'En' },
    { value: 'ru', label: 'Ру' },
    { value: 'uz', label: 'Uz' },
  ];

  const handleChangeLng = (lng: string) => {
    const currentUrl = window.location.pathname;
    let newUrl = currentUrl;
    if (currentUrl.startsWith(`/${locale}/`)) {
      newUrl = currentUrl.replace(`/${locale}/`, `/${lng}/`);
    } else if (currentUrl === `/${locale}`) {
      newUrl = `/${lng}`;
    } else {
      newUrl = `/${lng}${currentUrl}`;
    }
    router.push(newUrl);
    setLanguage(lng);
  };

  return (
    <div className="cursor-pointer min-h-[3rem] min-w-[3rem] rounded-full border border-[#3664DA] flex items-center justify-center transition-all duration-300 hover:backdrop-blur-[66px] hover:shadow-[1px_20px_46px_0px_rgba(42,75,160,0.63)] hover:border-[#5A88FF]">
      <select
        className="min-h-[3rem] bg-transparent text-white outline-none border-none cursor-pointer text-[0.87rem]"
        value={language}
        onChange={(e) => handleChangeLng(e.target.value)}
      >
        {lngs.map((lng) => (
          <option
            key={lng.value}
            className="bg-[#1a1a1a] text-white cursor-pointer"
            value={lng.value}
          >
            {lng.label}
          </option>
        ))}
      </select>
    </div>
  );
}
