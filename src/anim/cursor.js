import { gsap } from 'gsap';
import { isFinePointer } from './utils.js';

/** A dot that tracks the pointer and a ring that trails it; grows over links and photos. */
export function initCursor() {
  if (!isFinePointer()) return;
  const cursor = document.querySelector('.cursor');
  const dot = cursor.querySelector('.cursor__dot');
  const ring = cursor.querySelector('.cursor__ring');

  gsap.set([dot, ring], { x: innerWidth / 2, y: innerHeight / 2 });
  cursor.classList.add('is-hidden');

  const dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.6, ease: 'power3.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.6, ease: 'power3.out' });

  window.addEventListener('pointermove', (e) => {
    cursor.classList.remove('is-hidden');
    dotX(e.clientX); dotY(e.clientY);
    ringX(e.clientX); ringY(e.clientY);
  });
  document.documentElement.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));

  document.addEventListener('pointerover', (e) => {
    const view = e.target.closest('[data-cursor]');
    const hover = e.target.closest('a, button, input, label');
    cursor.classList.toggle('is-view', !!view && !hover);
    cursor.classList.toggle('is-hover', !!hover);
  });
}
