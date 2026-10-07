import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from './utils.js';

/** Attribute-driven reveals shared by every section. */
export function initReveals() {
  // Fade-up: batched so siblings entering together cascade
  ScrollTrigger.batch('[data-reveal="up"]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) =>
      gsap.fromTo(els, { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out', stagger: 0.12, overwrite: true }),
  });

  // Headings: each line rises from behind its mask
  gsap.utils.toArray('[data-split]').forEach((heading) => {
    const lines = heading.querySelectorAll('.line-inner');
    gsap.fromTo(lines,
      { y: 0, yPercent: 110, rotate: 3 },
      {
        yPercent: 0, rotate: 0, duration: 1.7, ease: 'expo.out', stagger: 0.14,
        scrollTrigger: { trigger: heading, start: 'top 85%', once: true },
      });
  });

  // Hairline rules draw left → right
  ScrollTrigger.batch('[data-reveal="rule"]', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.fromTo(els, { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: 'expo.inOut', stagger: 0.1 }),
  });

  // Images: curtain wipe up while the photo settles from a zoom
  gsap.utils.toArray('[data-reveal="image"]').forEach((frame) => {
    const img = frame.querySelector('[data-inner]');
    const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 85%', once: true } });
    tl.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' });
    if (img) tl.fromTo(img, { scale: 1.4 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, 0.1);
  });

  // Statement copy lights up word by word as you scroll through it
  gsap.utils.toArray('[data-words]').forEach((el) => {
    const words = splitWords(el);
    gsap.fromTo(words,
      { opacity: 0.12 },
      {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: 0.6 },
      });
  });

  // Parallax drift
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.1;
    gsap.fromTo(el,
      { y: () => -speed * window.innerHeight },
      {
        y: () => speed * window.innerHeight, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      });
  });
}
