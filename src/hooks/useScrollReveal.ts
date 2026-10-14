import { useEffect } from 'react';

/**
 * Custom hook to trigger Rise and Reveal animations as elements enter the viewport.
 * Uses IntersectionObserver with automatic cleanup and fallback for reduced-motion/older browsers.
 */
export function useScrollReveal(dependency?: any) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let observer: IntersectionObserver | null = null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Small delay to allow React DOM commits and layout to settle
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal-on-scroll');

      if (!('IntersectionObserver' in window) || prefersReducedMotion) {
        // Fallback: instantly reveal all elements
        revealElements.forEach((el) => {
          el.classList.add('is-revealed');
        });
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              io.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -30px 0px'
        }
      );
      observer = io;

      revealElements.forEach((el) => {
        // If element is already in viewport on load, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          io.observe(el);
        }
      });
    }, 40);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [dependency]);
}
