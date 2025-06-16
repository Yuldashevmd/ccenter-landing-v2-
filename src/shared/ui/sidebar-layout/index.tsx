'use client';

import { useLng, useSideNavObserver } from 'shared/lib';

export function SideNav() {
  const { t } = useLng();
  const sections = [
    { id: 'about-us', label: t('about us') },
    { id: 'services', label: t('services') },
    { id: 'additionals', label: t('additionals') },
    { id: 'features', label: t('features') },
    { id: 'reviews', label: t('reviews') },
    { id: 'news', label: t('news') },
  ];
  useSideNavObserver();

  return (
    <aside className="fixed top-[30%]  z-50 hidden lg:flex">
      <nav>
        <ul className="h-[24rem] w-px border border-dashed border-white/30 flex flex-col justify-between items-center">
          {sections.map(({ id, label }) => (
            <li
              key={id}
              data-section={id}
              className="nav-dot w-[0.32rem] h-[0.32rem] rounded-full bg-white/60 cursor-pointer relative transition-all duration-300"
            >
              <a href={`#${id}`} className="relative block">
                <span className="tooltip opacity-0 invisible transition-opacity duration-200 bg-white/10 text-white text-sm px-4 py-2 rounded-xl absolute left-4 -top-3 shadow backdrop-blur-md whitespace-nowrap">
                  {label}
                </span>
                <span className="absolute w-[50px] h-[10px] top-1 left-1/2 -translate-x-1/2 -translate-y-[80%]" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
