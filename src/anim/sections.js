import { gsap } from 'gsap';
import { splitChars } from './utils.js';

/** Choreography that is specific to one section. */
export function initSections(mm) {
  values();
  course();
  experiences();
  code(mm);
  events();
  membership();
  footer();
}

function values() {
  const rows = gsap.utils.toArray('.values__row');
  gsap.fromTo(rows.map((r) => r.querySelectorAll('.values__name, .values__note')),
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0, duration: 1.3, ease: 'expo.out', stagger: 0.12,
      scrollTrigger: { trigger: '.values', start: 'top 85%', once: true },
    });
}

function course() {
  // Ambient glow — slow, breathing drift
  gsap.to('.orb--green', { xPercent: -12, scale: 1.12, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.to('.orb--gold', { xPercent: 14, scale: 1.2, duration: 11, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.to('.orb--green', { y: 260, ease: 'none', scrollTrigger: { trigger: '.course', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.to('.orb--gold', { y: -200, ease: 'none', scrollTrigger: { trigger: '.course', start: 'top bottom', end: 'bottom top', scrub: true } });

  // Numbers count up — only when they're real numbers (placeholders just fade in)
  gsap.utils.toArray('[data-count]').forEach((el) => {
    const target = parseInt(el.textContent, 10);
    if (!/^\d+$/.test(el.textContent.trim())) return;
    const o = { v: 0 };
    gsap.to(o, {
      v: target, duration: 2.2, ease: 'expo.out',
      onUpdate: () => (el.textContent = Math.round(o.v)),
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

function experiences() {
  const grid = document.querySelector('.exp-grid');
  const items = gsap.utils.toArray('.exp');
  const tl = gsap.timeline({ scrollTrigger: { trigger: grid, start: 'top 80%', once: true } });
  tl.fromTo('.exp .vrule', { scaleY: 0 }, { scaleY: 1, duration: 1.8, ease: 'expo.inOut', stagger: 0.12 }, 0.1)
    .fromTo(items.map((i) => i.querySelector('.exp__num span')), { yPercent: 110 }, { yPercent: 0, duration: 1.5, ease: 'expo.out', stagger: 0.12 }, 0.3)
    .fromTo(items.map((i) => i.querySelectorAll('.exp__title, .exp__text')), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out', stagger: 0.12 }, 0.45);
}

function code(mm) {
  const lines = gsap.utils.toArray('.code__line');

  // Desktop: pin the band and let the creed write itself as you scroll
  mm.add('(min-width: 900px)', () => {
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.code', start: 'top top', end: '+=140%', pin: true, scrub: 1, refreshPriority: 1 },
    });
    tl.fromTo('.code__media img', { scale: 1.3 }, { scale: 1, duration: 3 }, 0)
      .fromTo('.code__card', { y: 140, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, 0)
      .fromTo('.code__logo', { opacity: 0, rotate: -20, scale: 0.6 }, { opacity: 1, rotate: 0, scale: 1, duration: 0.6, ease: 'power2.out' }, 0.4);
    lines.forEach((l, i) => {
      tl.fromTo(l, { opacity: 0.08, y: 24, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, 0.9 + i * 0.55);
    });
    tl.fromTo('.code__label', { opacity: 0, letterSpacing: '0.6em' }, { opacity: 1, letterSpacing: '0.18em', duration: 0.6 }, 2.5);
  });

  // Mobile: a simple timed reveal — no pinning on small screens
  mm.add('(max-width: 899px)', () => {
    gsap.fromTo('.code__media img', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.code', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo(['.code__card', '.code__logo', ...lines, '.code__label'],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out', stagger: 0.14, scrollTrigger: { trigger: '.code__card', start: 'top 80%', once: true } });
  });
}

function events() {
  gsap.utils.toArray('.event').forEach((row) => {
    const parts = row.querySelectorAll('.event__date, .event__name, .event__meta, .event__btn');
    const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 90%', once: true } });
    tl.fromTo(row.querySelector('.event__rule'), { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: 'expo.inOut' }, 0)
      .fromTo(parts, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out', stagger: 0.08 }, 0.25);
  });
}

function membership() {
  gsap.fromTo('.membership__media', { yPercent: -8 }, {
    yPercent: 8, ease: 'none',
    scrollTrigger: { trigger: '.membership', start: 'top bottom', end: 'bottom top', scrub: true },
  });

  const tl = gsap.timeline({ scrollTrigger: { trigger: '.apply', start: 'top 82%', once: true } });
  tl.fromTo('.apply', { opacity: 0, y: 80, rotateX: 8, transformPerspective: 1200 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.6, ease: 'expo.out' })
    .fromTo('.apply__title, .apply .field, .apply .btn-solid', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.09 }, 0.3);

  bindForm();
}

function bindForm() {
  const form = document.querySelector('.apply');
  const fields = form.querySelector('.apply__fields');
  const done = form.querySelector('.apply__done');
  const error = form.querySelector('.apply__error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
      error.hidden = false;
      gsap.fromTo(error, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' });
      gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
      return;
    }
    error.hidden = true;
    gsap.timeline()
      .to(fields.children, { opacity: 0, y: -20, duration: 0.6, ease: 'power3.in', stagger: 0.04 })
      .add(() => { fields.hidden = true; done.hidden = false; })
      .fromTo(done.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out', stagger: 0.12 });
  });
}

function footer() {
  const word = document.querySelector('.footer__word');
  const chars = splitChars(word);
  gsap.fromTo(chars,
    { yPercent: 100 },
    {
      yPercent: 0, ease: 'none', stagger: 0.06,
      scrollTrigger: { trigger: '.footer', start: 'top 85%', end: 'bottom bottom', scrub: 0.8 },
    });
}
