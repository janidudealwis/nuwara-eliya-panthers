// Show a shimmering skeleton on image frames until their photo has loaded.
const FRAMES = '.person__photo, .gallery__item, .gpage__item, .sponsor__logo';

export function initSkeletons(root = document) {
  root.querySelectorAll(FRAMES).forEach((frame) => {
    const img = frame.querySelector('img');
    if (!img || (img.complete && img.naturalWidth)) return;
    frame.classList.add('is-skeleton');
    const done = () => frame.classList.remove('is-skeleton');
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });
}
