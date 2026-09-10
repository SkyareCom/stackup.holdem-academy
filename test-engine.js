const { evaluate5, evaluateBest, evaluateOmaha, cardStr, combinations, makeDeck, shuffle } = require('./engine.js');

let pass = 0, fail = 0;
function check(name, cond, extra) {
  if (cond) { pass++; }
  else { fail++; console.log('FALHOU:', name, extra || ''); }
}

const C = (spec) => spec.map(s => {
  const suit = s.slice(-1);
  const rankStr = s.slice(0, -1);
  const rank = rankStr === 'A' ? 14 : rankStr === 'K' ? 13 : rankStr === 'Q' ? 12 : rankStr === 'J' ? 11 : parseInt(rankStr, 10);
  return { r: rank, s: suit };
});

// 1. Royal flush
let h = evaluate5(C(['As','Ks','Qs','Js','10s']));
check('royal flush categoria', h.category === 9, h.categoryName);

// 2. Straight flush comum
h = evaluate5(C(['9h','8h','7h','6h','5h']));
check('straight flush 9-alto', h.category === 8 && h.tiebreak[0] === 9);

// 3. Quadra
h = evaluate5(C(['7s','7h','7d','7c','2s']));
check('quadra de setes', h.category === 7 && h.tiebreak[0] === 7 && h.tiebreak[1] === 2);

// 4. Full house
h = evaluate5(C(['Ks','Kh','Kd','2c','2s']));
check('full house reis cheio de dois', h.category === 6 && h.tiebreak[0] === 13 && h.tiebreak[1] === 2);

// 5. Flush
h = evaluate5(C(['Ah','9h','7h','4h','2h']));
check('flush A-alto', h.category === 5 && h.tiebreak[0] === 14);

// 6. Sequência normal
h = evaluate5(C(['9s','8h','7d','6c','5s']));
check('sequência 9-alto', h.category === 4 && h.tiebreak[0] === 9);

// 7. Roda (wheel) A-2-3-4-5 conta como sequência 5-alto
h = evaluate5(C(['As','2h','3d','4c','5s']));
check('roda A-2-3-4-5 é sequência 5-alto', h.category === 4 && h.tiebreak[0] === 5, h);

// 8. Trinca
h = evaluate5(C(['Qs','Qh','Qd','9c','2s']));
check('trinca de damas', h.category === 3 && h.tiebreak[0] === 12);

// 9. Dois pares
h = evaluate5(C(['Js','Jh','4d','4c','2s']));
check('dois pares valetes e quatros', h.category === 2 && h.tiebreak[0] === 11 && h.tiebreak[1] === 4);

// 10. Um par
h = evaluate5(C(['10s','10h','8d','5c','2s']));
check('par de dez', h.category === 1 && h.tiebreak[0] === 10);

// 11. Carta alta
h = evaluate5(C(['As','Jh','8d','5c','2s']));
check('carta alta A', h.category === 0 && h.tiebreak[0] === 14);

// 12. Comparação: flush vence sequência
const flushHand = evaluate5(C(['Ah','9h','7h','4h','2h']));
const straightHand = evaluate5(C(['9s','8h','7d','6c','5s']));
check('flush > sequência', flushHand.score > straightHand.score);

// 13. Comparação: full house vence flush
const fullHand = evaluate5(C(['Ks','Kh','Kd','2c','2s']));
check('full house > flush', fullHand.score > flushHand.score);

// 14. Kicker desempata par igual
const pairA = evaluate5(C(['10s','10h','Ad','5c','2s'])); // par de 10, kicker A
const pairB = evaluate5(C(['10d','10c','Kd','5h','2h'])); // par de 10, kicker K
check('par igual, kicker A > kicker K', pairA.score > pairB.score);

// 15. evaluateBest com 7 cartas (Hold'em): deve achar o melhor 5 dentre os 7
const sevenCards = C(['As','Ks','Qs','Js','9s','2h','3d']); // straight flush escondido (A-K-Q-J-9 não é seq, mas tem flush A-alto)
h = evaluateBest(sevenCards);
check('best-of-7 acha pelo menos um flush', h.category >= 5, h.categoryName);

const sevenCards2 = C(['2h','7d','9c','As','Ks','Qs','Js']); // board tem Q J com A K -> quase straight, sem flush
h = evaluateBest(sevenCards2);
// melhor aqui é par nenhum -> carta alta A com kickers K Q J 9? checar não trava
check('best-of-7 não trava com carta alta', h.category === 0);

// 16. combinations() gera C(7,5)=21
check('combinations 7 escolhe 5 = 21', combinations([1,2,3,4,5,6,7], 5).length === 21);

// 17. Omaha: DEVE usar exatamente 2 da mão + 3 do board (não pode usar 1 ou 3 da mão)
// mão: dois pares nas mãos (As Ah) + (Ks Kh), board tem 3 damas -> pode formar trinca de damas usando qualquer par + Q,Q,Q? não,
// precisa 2 da mão + 3 do board. Board = Qs Qh Qd 2c 3d
const holeOmaha = C(['As','Ah','Ks','Kh']);
const boardOmaha = C(['Qs','Qh','Qd','2c','3d']);
h = evaluateOmaha(holeOmaha, boardOmaha);
// Melhor: usar A,A da mão + Q,Q,Q do board? Não pode: precisa exatamente 3 do board, board só tem 3 damas então ok Q,Q,Q + A,A = full house Q cheio de A? espera: full house = 3 de um rank + 2 de outro. QQQ (trinca) + AA (par) = full house Reis... não, Q é a trinca, A é o par -> "Damas cheias de Ases"
check('omaha full house com 2 da mão + 3 do board', h.category === 6 && h.tiebreak[0] === 12 && h.tiebreak[1] === 14, h);
check('omaha usou exatamente 2 cartas da mão', h.usedHole.length === 2);
check('omaha usou exatamente 3 cartas do board', h.usedBoard.length === 3);

// 18. Omaha: mão com quadra "no papel" mas ilegal de usar (não pode jogar as 4 cartas da mão)
// mão: 2s 2h 2d 2c (quatro doses) - mas só pode usar 2! board sem par de 2
const holeQuads = C(['2s','2h','2d','2c']);
const boardNoQuad = C(['9s','8h','7d','As','Ks']);
h = evaluateOmaha(holeQuads, boardNoQuad);
check('omaha NÃO permite quadra usando as 4 cartas da mão (regra 2+3)', h.category < 7, h.categoryName);

// 19. deck tem 52 cartas únicas
const deck = makeDeck();
check('deck tem 52 cartas', deck.length === 52);
const uniqueKeys = new Set(deck.map(c => c.r + c.s));
check('deck sem repetição', uniqueKeys.size === 52);

// 20. shuffle preserva as 52 cartas (só reordena)
const shuffled = shuffle(deck);
const uniqueShuffled = new Set(shuffled.map(c => c.r + c.s));
check('shuffle preserva todas as cartas', uniqueShuffled.size === 52 && shuffled.length === 52);

console.log(`\n${pass} passaram, ${fail} falharam.`);

// ---- testes da mão baixa (Razz / Hi-Lo) ----
const { evaluateLowBest, evaluateOmahaLow, qualifiesLow, lowScore5 } = require('./engine.js');
let pass2 = 0, fail2 = 0;
function check2(name, cond, extra) {
  if (cond) pass2++; else { fail2++; console.log('FALHOU (low):', name, extra || ''); }
}

// 21. A roda A-2-3-4-5 é a MELHOR mão baixa possível
const wheel = evaluateLowBest(C(['As','2h','3d','4c','5s']));
const nextBest = evaluateLowBest(C(['2s','3h','4d','5c','6s']));
check2('roda A2345 é melhor mão baixa que 23456', wheel.score < nextBest.score, {wheel, nextBest});

// 22. Qualquer mão sem par vence qualquer mão com par (mesmo REI-alta sem par vs par de 2)
const kingHighNoPair = evaluateLowBest(C(['Ks','Qh','Jd','9c','7s']));
const pairOfDeuces = evaluateLowBest(C(['2s','2h','3d','4c','5s']));
check2('sem-par (K alta) vence par-de-2 na mão baixa', kingHighNoPair.score < pairOfDeuces.score, {kingHighNoPair, pairOfDeuces});

// 23. best-of-7 escolhe o melhor sub-conjunto de 5 (Razz real usa 7 cartas)
const sevenLow = evaluateLowBest(C(['As','5h','9d','2c','Ks','7s','3h'])); // deve escolher A,2,3,5,7 -> 7-5-3-2-A
check2('best-of-7 low ignora as cartas altas (9,K) e monta 7-5-3-2-A', sevenLow.badness === 0 && sevenLow.lowRanksSorted.join(',') === '1,2,3,5,7', sevenLow);

// 24. qualifiesLow: 8-ou-melhor
const qualifies = qualifiesLow(evaluateLowBest(C(['As','4h','6d','7c','8s'])), 8);
const notQualifies = qualifiesLow(evaluateLowBest(C(['As','4h','6d','7c','9s'])), 8); // tem 9, não qualifica
check2('8-6-7-4-A qualifica (todas <=8)', qualifies === true);
check2('9 alta não qualifica pra 8-ou-melhor', notQualifies === false);

// 25. Omaha Hi/Lo: regra 2+3 também vale pro lado baixo
const holeLow = C(['As','2h','Kd','Kc']);
const boardLow = C(['3s','4h','5d','9c','Ts']);
const omahaLow = evaluateOmahaLow(holeLow, boardLow);
check2('omaha low usa A,2 da mão + 3,4,5 do board = roda', omahaLow.badness === 0 && omahaLow.lowRanksSorted.join(',') === '1,2,3,4,5', omahaLow);
check2('omaha low usou exatamente 2 da mão e 3 do board', omahaLow.usedHole.length === 2 && omahaLow.usedBoard.length === 3);

console.log(`\n[low] ${pass2} passaram, ${fail2} falharam.`);
console.log(`\nTOTAL: ${pass + pass2} passaram, ${fail + fail2} falharam.`);
process.exit((fail + fail2) > 0 ? 1 : 0);
