import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { expo } from './utils.js';

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll() {
  const lenis = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4,
    autoRaf: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor links glide instead of jumping
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    const target = id === '#top' || id === '#' ? 0 : document.querySelector(id);
    if (target === null) return;
    e.preventDefault();
    lenis.scrollTo(target, { duration: 1.8, easing: expo });
  });

  return lenis;
}
