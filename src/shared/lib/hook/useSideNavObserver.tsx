'use client';
import { useEffect } from 'react';

export function useSideNavObserver() {
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
