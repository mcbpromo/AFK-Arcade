// Real Boggle dice (physical game accurate)
const DICE = [
  'RIFOBX',  // die 1
  'IFEHEУ',  // die 2 - note: using Y
  'DENOWS',  // die 3
  'UTOKND',  // die 4
  'HMSRAO',  // die 5
  'LUPETS',  // die 6
  'ACITOА',  // die 7
  'YLGKUE',  // die 8
  'QuBMJOA', // die 9 - Qu face
  'EHISPN',  // die 10
  'VETIGN',  // die 11
  'BALIYT',  // die 12
  'EZAVBD',  // die 13
  'RALESC',  // die 14
  'UWILЕГ',  // die 15
  'PACEMD',  // die 16
];

// Letter point values (Scrabble-inspired, tuned for Boggle)
export const LETTER_POINTS = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4,
  I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3,
  Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8,
  Y: 4, Z: 10
};

export function getWordBonus(wordLength) {
  if (wordLength <= 4) return 1;
  if (wordLength === 5) return 2;
  if (wordLength === 6) return 3;
  if (wordLength === 7) return 5;
  return 11; // 8+ letters
}

export function calculateWordPoints(word) {
  const upper = word.toUpperCase();
  let base = 0;
  for (const ch of upper) {
    base += LETTER_POINTS[ch] || 0;
  }
  return base * getWordBonus(upper.length);
}

export function generateBoard() {
  const shuffled = [...DICE].sort(() => Math.random() - 0.5);
  const board = [];
  for (let i = 0; i < 16; i++) {
    const die = shuffled[i];
    // Handle Qu specially
    const faces = die.startsWith('Qu') 
      ? ['Qu', ...die.slice(2).split('')]
      : die.split('');
    const face = faces[Math.floor(Math.random() * faces.length)];
    board.push(face);
  }
  return board; // flat array of 16
}

function getNeighbors(pos) {
  const row = Math.floor(pos / 4);
  const col = pos % 4;
  const neighbors = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < 4 && nc >= 0 && nc < 4) {
        neighbors.push(nr * 4 + nc);
      }
    }
  }
  return neighbors;
}

export function canFormWord(board, word) {
  const upper = word.toUpperCase();
  const boardUpper = board.map(c => c.toUpperCase());

  const letters = [];
  let i = 0;
  while (i < upper.length) {
    if (upper[i] === 'Q' && i + 1 < upper.length && upper[i + 1] === 'U') {
      letters.push('QU');
      i += 2;
    } else {
      letters.push(upper[i]);
      i++;
    }
  }

  function dfs(letterIdx, pos, visited) {
    if (letterIdx === letters.length) return true;
    const neighbors = letterIdx === 0
      ? Array.from({ length: 16 }, (_, i) => i)
      : getNeighbors(pos);

    for (const next of neighbors) {
      if (visited.has(next)) continue;
      if (boardUpper[next] === letters[letterIdx]) {
        visited.add(next);
        if (dfs(letterIdx + 1, next, visited)) return true;
        visited.delete(next);
      }
    }
    return false;
  }

  return dfs(0, -1, new Set());
}

export function validateWord(board, word, foundWords) {
  const clean = word.trim().toUpperCase();
  if (clean.length < 3) return { valid: false, reason: 'Too short (min 3 letters)' };
  if (/[^A-Z]/.test(clean)) return { valid: false, reason: 'Invalid characters' };
  if (foundWords.has(clean)) return { valid: false, reason: 'Already found' };
  if (!canFormWord(board, clean)) return { valid: false, reason: 'Cannot be formed on board' };
  return { valid: true };
}