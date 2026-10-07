import { gsap } from 'gsap';

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });

/**
 * Ink screen → logo, name and a gold progress line → curtain lifts.
 * Resolves the moment the curtain starts lifting so the hero can play underneath.
 */
export function runPreloader() {
  const el = document.querySelector('.preloader');
  const count = el.querySelector('.preloader__count');
  const counter = { v: 0 };

  // Wait for fonts + hero photo, but never hold the visitor longer than 4s
  const assetsReady = Promise.race([
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      loadImage('/images/hero-hills.jpg'),
    ]),
    new Promise((r) => setTimeout(r, 4000)),
  ]);

  return new Promise((resolve) => {
    let introDone;
    const introFinished = new Promise((r) => (introDone = r));
    const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => introDone() });
    intro
      .fromTo('.preloader__logo', { opacity: 0, scale: 0.8, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 1.4 })
      .to('.preloader__name span', { y: 0, duration: 1.2 }, 0.25)
      .to('.preloader__bar span', { scaleX: 1, duration: 1.9, ease: 'power3.inOut' }, 0.3)
      .to(counter, {
        v: 100,
        duration: 1.9,
        ease: 'power3.inOut',
        onUpdate: () => (count.textContent = String(Math.round(counter.v)).padStart(3, '0')),
      }, 0.3);

    Promise.all([assetsReady, introFinished]).then(() => {
      const out = gsap.timeline({ onComplete: () => el.remove() });
      out
        .to('.preloader__inner', { y: -40, opacity: 0, duration: 0.8, ease: 'power3.in' })
        .add(resolve, '-=0.15')
        .fromTo(el,
          { clipPath: 'inset(0% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.3, ease: 'expo.inOut' }, '-=0.2');
    });
  });
}
