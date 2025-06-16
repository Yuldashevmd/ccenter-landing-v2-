'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLng } from 'shared/lib';
import { ChangeLng } from 'features/change-lng';
import { useRef } from 'react';

export function Header() {
  const router = useRouter();
  const { t, locale } = useLng();
  const bgEffect = useRef<HTMLDivElement>(null);

  const openVirtualNumberLink = () => {
    const links: Record<string, string> = {
      uz: 'https://uztelecom.uz/uz/biznesga/ofis-uchun-telefon/band-qilish',
      en: 'https://uztelecom.uz/en/for-business/phone-to-the-office/booking',
      ru: 'https://uztelecom.uz/ru/biznesu/telefon-v-ofis/bronirovanie',
    };
    router.push(links[locale as string]);
  };

  const handleMouseEnter = (width: string) => {
    if (bgEffect.current) {
      bgEffect.current.style.transform = width ? `translateX(${width})` : '';
    }
  };

  return (
    <header className="w-full flex justify-between items-center relative top-15 z-[99] px-6">
      <Image
        src="/dark/logo.svg"
        className="w-[11rem] h-auto md:w-[17rem] cursor-pointer"
        width={287}
        height={43}
        alt="logo"
        id="logo"
      />

      <div className="flex items-center gap-4">
        <div className="relative flex items-center border border-[#3664DA] rounded-full overflow-hidden min-w-[21.2rem] min-h-[3rem] cursor-pointer">
          <div
            ref={bgEffect}
            className="absolute h-[80%] bg-[#4169e1] rounded-full inset-[5px] transition-transform duration-400 ease-in-out"
            id="bg-effect"
            style={{ width: '48.5%' }}
          ></div>

          <div
            className="text-white w-[48.5%] h-full text-center z-10 cursor-pointer"
            onMouseEnter={() => handleMouseEnter('0%')}
            onClick={openVirtualNumberLink}
          >
            <button className="w-full h-full bg-transparent text-sm md:text-md">
              {t('virtual_number')}
            </button>
          </div>

          <Link
            href="/contact"
            className="text-white w-[48.5%] h-full text-center z-10 cursor-pointer"
            onMouseEnter={() => handleMouseEnter('100%')}
          >
            <button className="w-full h-full bg-transparent text-sm md:text-md">
              {t('contact_us')}
            </button>
          </Link>
        </div>
        <ChangeLng />
      </div>
    </header>
  );
}
