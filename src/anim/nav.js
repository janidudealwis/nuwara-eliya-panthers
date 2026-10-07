import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isFinePointer } from './utils.js';

export function initNav() {
  const wrap = document.querySelector('.nav-wrap');
  const nav = document.querySelector('.nav');

  // Hide while scrolling down, return on the way up
  const hide = gsap.to(wrap, { yPercent: -160, duration: 0.9, ease: 'expo.out', paused: true });
  ScrollTrigger.create({
    start: 'top+=200 top',
    end: 'max',
    onUpdate: (self) => (self.direction === 1 ? hide.play() : hide.reverse()),
    onLeaveBack: () => hide.reverse(),
  });

  // Deepen the glass once we're past the hero
  ScrollTrigger.create({
    trigger: '#club',
    start: 'top 90px',
    end: 'max',
    toggleClass: { targets: nav, className: 'is-solid' },
  });

  // Gold reading-progress hairline
  gsap.to('.progress span', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });
}

/** Buttons lean toward the pointer and spring back on leave. */
export function initMagnetic() {
  if (!isFinePointer()) return;
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = el.classList.contains('event__btn') ? 0.45 : 0.3;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'expo.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'expo.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.35)', overwrite: true });
    });
  });
}
