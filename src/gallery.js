import './styles/tokens.css';
import './styles/base.css';
import './styles/gallery.css';
import { photos } from './gallery-list.js';

// Styles are loaded by now; reveal the page (see the inline style in the HTML head)
document.documentElement.classList.add('ready');

const grid = document.getElementById('ggrid');
document.getElementById('gcount').textContent = photos.length;

const frag = document.createDocumentFragment();
photos.forEach((p, i) => {
  const a = document.createElement('a');
  a.className = 'gpage__item';
  a.href = `/images/gallery/${p}.jpg`;
  a.id = p;
  a.dataset.i = i;
  const img = new Image();
  img.src = `/images/gallery/${p}.jpg`;
  img.alt = `Nuwara Eliya Panthers photo ${i + 1}`;
  img.loading = 'lazy';
  a.append(img);
  frag.append(a);
});
grid.append(frag);

const lb = document.getElementById('lb');
const lbImg = document.getElementById('lbImg');
const lbCount = document.getElementById('lbCount');
let cur = 0;

function show(i) {
  cur = (i + photos.length) % photos.length;
  lbImg.src = `/images/gallery/${photos[cur]}.jpg`;
  lbCount.textContent = `${cur + 1} / ${photos.length}`;
}
function open(i) {
  show(i);
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
  history.replaceState(null, '', `#${photos[cur]}`);
}
function close() {
  lb.hidden = true;
  document.body.style.overflow = '';
}

grid.addEventListener('click', (e) => {
  const a = e.target.closest('.gpage__item');
  if (!a) return;
  e.preventDefault();
  open(+a.dataset.i);
});
document.getElementById('lbClose').addEventListener('click', close);
document.getElementById('lbPrev').addEventListener('click', () => show(cur - 1));
document.getElementById('lbNext').addEventListener('click', () => show(cur + 1));
lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
window.addEventListener('keydown', (e) => {
  if (lb.hidden) return;
  if (e.key === 'Escape') close();
  else if (e.key === 'ArrowLeft') show(cur - 1);
  else if (e.key === 'ArrowRight') show(cur + 1);
});

// Arriving from the home-page grid (#photo-name) opens that photo
const start = photos.indexOf(decodeURIComponent(location.hash.slice(1)));
if (start >= 0) open(start);
