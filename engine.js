// ============================================================
// MOTOR DE CARTAS E AVALIAÇÃO DE MÃOS — testado isoladamente em Node
// antes de ser embutido no artifact (mesma lógica, copiada verbatim).
// ============================================================

const RANK_NAMES = {14:'A',13:'K',12:'Q',11:'J',10:'10',9:'9',8:'8',7:'7',6:'6',5:'5',4:'4',3:'3',2:'2'};
const SUIT_NAMES = {s:'♠', h:'♥', d:'♦', c:'♣'};
const CATEGORY_NAMES = [
  'Carta Alta','Par','Dois Pares','Trinca','Sequência',
  'Flush','Full House','Quadra','Straight Flush','Royal Flush'
];

function makeDeck() {
  const ranks = [2,3,4,5,6,7,8,9,10,11,12,13,14];
  const suits = ['s','h','d','c'];
  const deck = [];
  for (const s of suits) for (const r of ranks) deck.push({ r, s });
  return deck;
}

function shuffle(deck, rng = Math.random) {
  const d = deck.slice();
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

function combinations(arr, k) {
  const result = [];
  const combo = [];
  function go(start) {
    if (combo.length === k) { result.push(combo.slice()); return; }
    for (let i = start; i < arr.length; i++) {
      combo.push(arr[i]);
      go(i + 1);
      combo.pop();
    }
  }
  go(0);
  return result;
}

// Avalia EXATAMENTE 5 cartas. Retorna {score, category, categoryName, tiebreak, cards}
function evaluate5(cards) {
  if (cards.length !== 5) throw new Error('evaluate5 espera exatamente 5 cartas, recebeu ' + cards.length);
  const ranksDesc = cards.map(c => c.r).sort((a, b) => b - a);
  const suits = cards.map(c => c.s);
  const isFlush = suits.every(s => s === suits[0]);

  const counts = {};
  for (const r of ranksDesc) counts[r] = (counts[r] || 0) + 1;
  const groups = Object.entries(counts)
    .map(([r, c]) => ({ r: +r, c }))
    .sort((a, b) => (b.c - a.c) || (b.r - a.r));

  const uniqueDesc = [...new Set(ranksDesc)];
  let isStraight = false, straightHigh = 0;
  // sequência normal
  if (uniqueDesc.length === 5) {
    if (uniqueDesc[0] - uniqueDesc[4] === 4) {
      isStraight = true;
      straightHigh = uniqueDesc[0];
    } else if (uniqueDesc.join(',') === '14,5,4,3,2') { // A-2-3-4-5 (o "wheel")
      isStraight = true;
      straightHigh = 5;
    }
  }

  let category, tiebreak;
  if (isFlush && isStraight) {
    category = straightHigh === 14 ? 9 : 8; // Royal é o caso especial de straight flush A-alto
    tiebreak = [straightHigh];
  } else if (groups[0].c === 4) {
    category = 7;
    tiebreak = [groups[0].r, groups[1].r];
  } else if (groups[0].c === 3 && groups[1] && groups[1].c === 2) {
    category = 6;
    tiebreak = [groups[0].r, groups[1].r];
  } else if (isFlush) {
    category = 5;
    tiebreak = ranksDesc.slice();
  } else if (isStraight) {
    category = 4;
    tiebreak = [straightHigh];
  } else if (groups[0].c === 3) {
    category = 3;
    const kickers = groups.slice(1).map(g => g.r);
    tiebreak = [groups[0].r, ...kickers];
  } else if (groups[0].c === 2 && groups[1] && groups[1].c === 2) {
    category = 2;
    const pairHigh = Math.max(groups[0].r, groups[1].r);
    const pairLow = Math.min(groups[0].r, groups[1].r);
    const kicker = groups[2].r;
    tiebreak = [pairHigh, pairLow, kicker];
  } else if (groups[0].c === 2) {
    category = 1;
    const kickers = groups.slice(1).map(g => g.r);
    tiebreak = [groups[0].r, ...kickers];
  } else {
    category = 0;
    tiebreak = ranksDesc.slice();
  }

  // codifica em número comparável: categoria domina, depois tiebreak em base 15
  let score = category;
  for (let i = 0; i < 5; i++) {
    score = score * 15 + (tiebreak[i] !== undefined ? tiebreak[i] : 0);
  }

  const catNameIdx = category === 9 ? 8 : category; // royal usa mesmo nome-base "Straight Flush" + flag
  return {
    score,
    category,
    categoryName: category === 9 ? 'Royal Flush' : CATEGORY_NAMES[category],
    tiebreak,
    cards: cards.slice(),
  };
}

// Avalia a MELHOR mão de 5 dentre um conjunto maior de cartas (Hold'em/Stud: 7 cartas próprias+board)
function evaluateBest(cards) {
  if (cards.length === 5) return evaluate5(cards);
  const combos = combinations(cards, 5);
  let best = null;
  for (const combo of combos) {
    const ev = evaluate5(combo);
    if (!best || ev.score > best.score) best = ev;
  }
  return best;
}

// Omaha: EXATAMENTE 2 cartas da mão + EXATAMENTE 3 do board
function evaluateOmaha(hole, board) {
  const holePairs = combinations(hole, 2);
  const boardTriples = combinations(board, 3);
  let best = null;
  for (const hp of holePairs) {
    for (const bt of boardTriples) {
      const ev = evaluate5([...hp, ...bt]);
      if (!best || ev.score > best.score) { best = ev; best.usedHole = hp; best.usedBoard = bt; }
    }
  }
  return best;
}

function cardStr(c) {
  return RANK_NAMES[c.r] + SUIT_NAMES[c.s];
}

// Determina quem faz o "bring-in" na 3rd street do Seven Card Stud:
// a carta aberta mais baixa começa a aposta; empate quebrado pela ordem das naipes
// (regra de cassino padrão: ♣ < ♦ < ♥ < ♠, alfabética em inglês: clubs<diamonds<hearts<spades)
const SUIT_ORDER = { c: 0, d: 1, h: 2, s: 3 };
function bringInSeat(activeSeats, upCardOf) {
  // activeSeats: array de índices de assentos ativos; upCardOf(seat) -> {r,s} da 3ª carta (up) desse assento
  let best = null;
  for (const seat of activeSeats) {
    const card = upCardOf(seat);
    if (best === null) { best = seat; continue; }
    const bestCard = upCardOf(best);
    if (card.r < bestCard.r || (card.r === bestCard.r && SUIT_ORDER[card.s] < SUIT_ORDER[bestCard.s])) {
      best = seat;
    }
  }
  return best;
}

// Determina quem age primeiro a partir da 4th street: a melhor mão exposta (up cards) age primeiro
function bestExposedSeat(activeSeats, upCardsOf) {
  let best = null, bestEval = null;
  for (const seat of activeSeats) {
    const ups = upCardsOf(seat);
    if (ups.length < 2) continue; // precisa de pelo menos 2 cartas expostas pra avaliar algo com sentido
    const ev = ups.length >= 5 ? evaluateBest(ups) : partialHighCard(ups);
    if (!bestEval || ev.score > bestEval.score) { bestEval = ev; best = seat; }
  }
  return best !== null ? best : (activeSeats[0] ?? null);
}

// Avaliação simplificada de mãos parciais (2, 3 ou 4 cartas expostas) só pra ordenar quem age primeiro no Stud
function partialHighCard(cards) {
  const ranksDesc = cards.map(c => c.r).sort((a, b) => b - a);
  const counts = {};
  for (const r of ranksDesc) counts[r] = (counts[r] || 0) + 1;
  const groups = Object.entries(counts).map(([r, c]) => ({ r: +r, c })).sort((a, b) => (b.c - a.c) || (b.r - a.r));
  let category = groups[0].c >= 2 ? (groups[0].c === 4 ? 7 : groups[0].c === 3 ? 3 : (groups[1] && groups[1].c === 2 ? 2 : 1)) : 0;
  let score = category;
  for (let i = 0; i < 5; i++) score = score * 15 + (ranksDesc[i] || 0);
  return { score, category };
}

// ------------------------------------------------------------
// Avaliação de mão BAIXA (Ace-to-Five / "California low"), usada em Razz
// e na metade "Lo" de Omaha Hi/Lo e Stud Hi/Lo.
// Regra: Ás sempre vale 1 (o menor); sequências e flushes NÃO contam
// nem a favor nem contra; a mão com as 5 cartas mais baixas, sem repetição,
// vence. Uma mão com par é sempre pior que qualquer mão sem par.
// Menor score = mão melhor (inverso da mão alta).
// ------------------------------------------------------------
function lowScore5(cards) {
  const lowRanks = cards.map(c => (c.r === 14 ? 1 : c.r));
  const desc = lowRanks.slice().sort((a, b) => b - a); // maior primeiro, pra comparação lexicográfica
  const counts = {};
  for (const r of lowRanks) counts[r] = (counts[r] || 0) + 1;
  const groups = Object.entries(counts).map(([r, c]) => ({ r: +r, c })).sort((a, b) => (b.c - a.c) || (b.r - a.r));

  let badness, tiebreak;
  if (groups[0].c === 4) { badness = 5; tiebreak = [groups[0].r, groups[1].r]; }
  else if (groups[0].c === 3 && groups[1] && groups[1].c === 2) { badness = 4; tiebreak = [groups[0].r, groups[1].r]; }
  else if (groups[0].c === 3) { badness = 3; tiebreak = [groups[0].r, ...groups.slice(1).map(g => g.r)]; }
  else if (groups[0].c === 2 && groups[1] && groups[1].c === 2) {
    badness = 2;
    const hi = Math.max(groups[0].r, groups[1].r), lo = Math.min(groups[0].r, groups[1].r);
    tiebreak = [hi, lo, groups[2].r];
  } else if (groups[0].c === 2) { badness = 1; tiebreak = [groups[0].r, ...groups.slice(1).map(g => g.r)]; }
  else { badness = 0; tiebreak = desc; }

  let score = badness;
  for (let i = 0; i < 5; i++) score = score * 14 + (tiebreak[i] !== undefined ? tiebreak[i] : 0);
  return { score, badness, lowRanksSorted: desc.slice().sort((a, b) => a - b) };
}

function evaluateLowBest(cards) {
  const pool = cards.length === 5 ? [cards] : combinations(cards, 5);
  let best = null;
  for (const combo of pool) {
    const ls = lowScore5(combo);
    if (!best || ls.score < best.score) best = { ...ls, cards: combo };
  }
  return best;
}

// Omaha Hi/Lo: mão baixa também precisa da regra 2 da mão + 3 do board
function evaluateOmahaLow(hole, board) {
  const holePairs = combinations(hole, 2);
  const boardTriples = combinations(board, 3);
  let best = null;
  for (const hp of holePairs) {
    for (const bt of boardTriples) {
      const five = [...hp, ...bt];
      const ls = lowScore5(five);
      if (!best || ls.score < best.score) best = { ...ls, cards: five, usedHole: hp, usedBoard: bt };
    }
  }
  return best;
}

// "8 ou melhor": só existe mão baixa se a melhor seleção tiver 5 cartas distintas, todas ≤ 8
function qualifiesLow(lowResult, cutoff = 8) {
  return lowResult.badness === 0 && lowResult.lowRanksSorted[lowResult.lowRanksSorted.length - 1] <= cutoff;
}

function lowHandLabel(lowResult) {
  const names = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K' };
  const cards = lowResult.lowRanksSorted.slice().sort((a, b) => a - b);
  return cards.map(r => names[r] || String(r)).join('-') + ' baixa';
}

module.exports = {
  makeDeck, shuffle, combinations, evaluate5, evaluateBest, evaluateOmaha, cardStr,
  RANK_NAMES, SUIT_NAMES, CATEGORY_NAMES, bringInSeat, bestExposedSeat, partialHighCard, SUIT_ORDER,
  lowScore5, evaluateLowBest, evaluateOmahaLow, qualifiesLow, lowHandLabel,
};
