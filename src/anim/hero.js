import { gsap } from 'gsap';
import { splitChars } from './utils.js';

let chars = [];

/** Prepare the hero before the preloader lifts (split title, set start states). */
export function prepareHero() {
  const lines = document.querySelectorAll('[data-hero-title] .line-inner');
  chars = [...lines].flatMap((l) => splitChars(l));
  gsap.set(lines, { y: 0, yPercent: 0 });
  gsap.set(chars, { yPercent: 115, rotate: 6, transformOrigin: '0% 100%' });
  gsap.set('.hero__media img', { scale: 1.35, filter: 'blur(10px) brightness(0.6)' });
  gsap.set('.nav', { opacity: 0, y: -30 });
}

/** The entrance — plays as the preloader curtain lifts. */
export function playHero() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.to('.hero__media img', { scale: 1, filter: 'blur(0px) brightness(1)', duration: 2.8, ease: 'expo.out', clearProps: 'filter' }, 0)
    .to(chars, { yPercent: 0, rotate: 0, duration: 1.6, stagger: 0.035 }, 0.25)
    .fromTo('.hero__eyebrow', { opacity: 0, y: 20, letterSpacing: '0.5em' }, { opacity: 1, y: 0, letterSpacing: '0.18em', duration: 1.8 }, 0.5)
    .fromTo('.hero__rule', { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'expo.inOut' }, 0.9)
    .fromTo('.hero__lead', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4 }, 1.05)
    .fromTo('.hero__cta', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4 }, 1.2)
    .to('.nav', { opacity: 1, y: 0, duration: 1.4 }, 1.0)
    .fromTo('.hero__stats', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.6 }, 1.3)
    .fromTo('.hero__stats .stat', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 }, 1.45)
    .fromTo('.hero__scroll', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 1.8);

  return tl;
}

/** Scroll-linked depth: image drifts slower than the page, copy lifts and fades. */
export function heroScroll() {
  const st = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('.hero__media', { yPercent: 22, ease: 'none', scrollTrigger: st });
  gsap.to('.hero__content', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '75% top' } });
  gsap.to('.hero__stats-wrap', { yPercent: 30, opacity: 0, ease: 'none', scrollTrigger: { ...st, start: '20% top', end: '70% top' } });
  gsap.to('.hero__media img', { opacity: 0.35, ease: 'none', scrollTrigger: st });
}
