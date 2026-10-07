import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll } from './anim/smooth.js';
import { runPreloader } from './anim/preloader.js';
import { prepareHero, playHero, heroScroll } from './anim/hero.js';
import { initReveals } from './anim/reveals.js';
import { initSections } from './anim/sections.js';
import { initNav, initMagnetic } from './anim/nav.js';
import { initCursor } from './anim/cursor.js';

gsap.registerPlugin(ScrollTrigger);

// Reduced motion (or no class for any reason): leave the page static and fully visible.
const animate = document.documentElement.classList.contains('js-anim');

if (animate) {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  const lenis = initSmoothScroll();
  lenis.stop();

  prepareHero();
  initReveals();
  initSections(gsap.matchMedia());
  initNav();
  initMagnetic();
  initCursor();
  heroScroll();

  runPreloader().then(() => {
    playHero();
    lenis.start();
    ScrollTrigger.refresh();
  });

  // Images below the fold can shift layout as they load
  window.addEventListener('load', () => ScrollTrigger.refresh());
} else {
  document.querySelector('.preloader')?.remove();
  initFormOnly();
}

/** Without motion the form still needs its submit handling. */
function initFormOnly() {
  const form = document.querySelector('.apply');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = form.elements.name.value.trim() && /^\S+@\S+\.\S+$/.test(form.elements.email.value.trim());
    form.querySelector('.apply__error').hidden = !!ok;
    if (ok) {
      form.querySelector('.apply__fields').hidden = true;
      form.querySelector('.apply__done').hidden = false;
    }
  });
}
