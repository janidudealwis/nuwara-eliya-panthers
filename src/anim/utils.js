export const isFinePointer = () => window.matchMedia('(pointer: fine)').matches;

/**
 * Wraps every character of an element's text in `.char` spans, keeping words
 * together (so lines never break mid-word). Returns the char spans.
 */
export function splitChars(el) {
  const chars = [];
  const text = el.textContent;
  el.textContent = '';
  text.split(/(\s+)/).forEach((part) => {
    if (!part) return;
    if (/^\s+$/.test(part)) {
      el.appendChild(document.createTextNode(' '));
      return;
    }
    const word = document.createElement('span');
    word.className = 'word';
    [...part].forEach((c) => {
      const ch = document.createElement('span');
      ch.className = 'char';
      ch.textContent = c;
      word.appendChild(ch);
      chars.push(ch);
    });
    el.appendChild(word);
  });
  el.setAttribute('aria-label', text.trim());
  return chars;
}

/** Wraps every word in `.word` spans. Returns the word spans. */
export function splitWords(el) {
  const text = el.textContent.trim();
  el.textContent = '';
  const words = text.split(/\s+/).map((w, i, arr) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = w;
    el.appendChild(span);
    if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
    return span;
  });
  return words;
}

export const expo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
