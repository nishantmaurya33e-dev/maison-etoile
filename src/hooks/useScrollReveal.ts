import { useEffect } from 'react';

/**
 * Custom hook to trigger Rise and Reveal cinematic animations as elements enter the viewport.
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
          threshold: 0.05,
          rootMargin: '0px 0px -15px 0px'
        }
      );
      observer = io;

      revealElements.forEach((el) => {
        // Only observe elements that haven't been revealed yet
        if (!el.classList.contains('is-revealed')) {
          io.observe(el);
        }
      });
    }, 60);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [dependency]);
}
