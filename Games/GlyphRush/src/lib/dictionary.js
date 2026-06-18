let wordSet = null;
let loadingPromise = null;

const WORD_LISTS_URL = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';

export async function loadDictionary() {
  if (wordSet) return wordSet;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    try {
      const response = await fetch(WORD_LISTS_URL);
      const text = await response.text();
      const words = text.split('\n')
        .map(w => w.trim().toUpperCase())
        .filter(w => w.length >= 3);
      wordSet = new Set(words);
      console.log(`✅ Dictionary loaded: ${wordSet.size} words`);
      return wordSet;
    } catch (err) {
      console.warn('Failed to load dictionary:', err);
      wordSet = new Set();
      return wordSet;
    }
  })();

  return loadingPromise;
}

export function isValidWord(word) {
  if (!wordSet) return true;
  return wordSet.has(word.toUpperCase());
}