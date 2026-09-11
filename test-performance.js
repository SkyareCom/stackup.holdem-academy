const fs=require('fs');
const assert=(name,ok)=>{if(!ok){console.error(`FAIL: ${name}`);process.exitCode=1;}else console.log(`PASS: ${name}`);};
const i18n=fs.readFileSync('i18n-en-us.js','utf8');
const reset=fs.readFileSync('session-reset.js','utf8');
const cover=fs.readFileSync('cover-layout.js','utf8');
const lang=fs.readFileSync('language-selector.js','utf8');

assert('i18n phrase regexes are precompiled',i18n.includes('const compiledPhrases=phrasePairs.map'));
assert('i18n uses exact phrase fast path',i18n.includes('const exactPhrases=new Map()')&&i18n.includes('function exactPhrase'));
assert('i18n queues only changed subtrees',i18n.includes('pendingRoots.add(node)')&&i18n.includes('for(const root of topLevel)translateTree(root)'));
const schedule=(i18n.match(/function schedule\(node\)[\s\S]*?\n  }/)||[''])[0];
assert('i18n mutation scheduler does not rescan whole document',!schedule.includes('translateTree(document.body)'));
assert('English card descriptions are sentence case',i18n.includes("['APOSTAS OBRIGATÓRIAS E FORMAÇÃO INICIAL DO POTE.','Forced bets and initial pot creation.']")&&i18n.includes("['PRÉ-FLOP, FLOP, TURN E RIVER.','Pre-flop, flop, turn, and river.']"));
assert('English high-visibility descriptions are natural',i18n.includes("['BTN, BLINDS, POSIÇÕES INICIAIS, MÉDIAS E FINAIS.','BTN, blinds, early, middle, and late positions.']")&&i18n.includes("['QUANDO UMA DISTRIBUIÇÃO É INVÁLIDA E COMO PROCEDER.','When a deal is invalid and how to proceed.']"));
assert('brief Android visibility changes do not force reload',reset.includes('MIN_AWAY_MS=3000')&&reset.includes('awayDuration()>=MIN_AWAY_MS'));
assert('cover observer no longer watches entire subtree',cover.includes("observe(root,{childList:true})")&&!cover.includes("observe(root,{childList:true,subtree:true})"));
assert('language-card observer is batched',lang.includes('cardFrame=requestAnimationFrame')&&lang.includes("observe(root,{childList:true})"));

if(process.exitCode)process.exit(process.exitCode);
console.log('Performance and UI consistency guards OK');
