'use client';

import { useEffect } from 'react';
import { useLng } from 'shared/lib';

function useSideNavObserver() {
  useEffect(() => {
    const sectionEls = document.querySelectorAll<HTMLElement>('.section');
    const dots = document.querySelectorAll<HTMLElement>('.nav-dot');

    let currentActiveId = '';
    let debounceTimer: NodeJS.Timeout;
    const debounceActivate = (id: string) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => activateDot(id), 50);
    };

    const activateDot = (id: string) => {
      if (currentActiveId === id) return;
      currentActiveId = id;

      const dot = document.querySelector(`.nav-dot[data-section="${id}"]`);
      const span = dot?.querySelector('.tooltip');

      dots.forEach((d) => {
        d.classList.remove('active');
        d.querySelector('.tooltip')?.classList.remove('opacity-100', 'visible', 'pop-anim');
        d.querySelector('.tooltip')?.classList.add('opacity-0', 'invisible');
      });

      if (dot && span) {
        dot.classList.add('active');
        span.classList.remove('opacity-0', 'invisible');
        span.classList.add('opacity-100', 'visible', 'pop-anim');
        history.replaceState(null, '', `#${id}`);
      }
    };

    const scrollToSection = (id: string, smooth = true, force = false) => {
      if (currentActiveId === id && !force) return;
      const el = document.getElementById(id);
      if (el) {
        const html = document.documentElement;
        const originalBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = smooth ? 'smooth' : 'auto';

        el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
        activateDot(id);

        setTimeout(() => {
          html.style.scrollBehavior = originalBehavior || 'smooth';
        }, 100);
      }
    };

    const handleDotClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      const id = target.getAttribute('data-section');
      if (!id) return;
      scrollToSection(id, true, true); // force scroll
    };

    dots.forEach((dot) => {
      dot.addEventListener('click', handleDotClick);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            debounceActivate(entry.target.id);
          }
        });
      },
      { threshold: 0.4 },
    );

    sectionEls.forEach((section) => observer.observe(section));

    const hash = window.location.hash.replace('#', '');
    scrollToSection(hash || 'about-us', false, true);

    const handleHashChange = () => {
      const newId = window.location.hash.replace('#', '');
      scrollToSection(newId, true, true);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      dots.forEach((dot) => dot.removeEventListener('click', handleDotClick));
    };
  }, []);
}

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
