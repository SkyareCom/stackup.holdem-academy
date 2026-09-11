const fs=require('fs');
const path=require('path');
const vm=require('vm');

const ROOT=__dirname;
const context={window:{}};
vm.createContext(context);
for(const file of [
  'i18n-en-us-phrases-1.js','i18n-en-us-phrases-2.js','i18n-en-us-phrases-3.js',
  'i18n-en-us-words.js','i18n-en-us-words-extra-1.js','i18n-en-us-words-extra-2.js','i18n-en-us-words-extra-3.js','i18n-en-us-words-extra-4.js'
]) vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),context,{filename:file});

const runtimePhrases=[
  ['MÃO VIVA','LIVE HAND'],['MÃOS VIVAS','LIVE HANDS'],
  ['QUEM AGE PRIMEIRO','WHO ACTS FIRST'],['QUEM AGE POR ÚLTIMO','WHO ACTS LAST'],
  ['AGE PRIMEIRO','ACTS FIRST'],['AGE POR ÚLTIMO','ACTS LAST'],['AGE ANTES','ACTS BEFORE'],['AGE DEPOIS','ACTS AFTER'],
  ['DEALER CONFERE','DEALER CHECKS'],['O DEALER CONFERE','THE DEALER CHECKS'],
  ['BLINDS/ANTES','BLINDS/ANTES'],['BLINDS / ANTES','BLINDS / ANTES'],['BLINDS E ANTES','BLINDS AND ANTES'],
  ['BLINDS E, QUANDO APLICÁVEL, ANTES','BLINDS AND, WHEN APPLICABLE, ANTES'],
  ['OS NÍVEIS ELEVAM BLINDS/ANTES AO LONGO DO EVENTO.','THE LEVELS INCREASE BLINDS/ANTES THROUGHOUT THE EVENT.'],
  ['ANTES JÁ FORMAM O POTE','ANTES ALREADY FORM THE POT'],['ANTES SÃO DEVOLVIDOS','ANTES ARE RETURNED']
];
const runtimeWords={
  protege:'protects',protegem:'protect',cassino:'casino',cassinos:'casinos',dupla:'pair',duplas:'pairs',
  ajustar:'adjust',ajusta:'adjusts',ajuste:'adjustment',decisao:'decision','decisão':'decision',
  decisoes:'decisions','decisões':'decisions',resultado:'result',resultados:'results',confere:'checks',
  conferem:'check',viva:'live',vivas:'live',vivo:'live',vivos:'live'
};
const phrasePairs=runtimePhrases.concat(context.window.StackupI18nPhrases||[]).slice().sort((a,b)=>b[0].length-a[0].length);
const words=Object.assign({},context.window.StackupI18nWords||{},runtimeWords);
const failures=[];
let checks=0;
const check=(name,ok,detail='')=>{checks++;if(!ok)failures.push(`${name}${detail?`: ${detail}`:''}`);};

function escapeRegExp(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function matchCase(source,target){
  if(source===source.toUpperCase())return target.toUpperCase();
  if(source===source.toLowerCase())return target.toLowerCase();
  if(source[0]&&source[0]===source[0].toUpperCase())return target.charAt(0).toUpperCase()+target.slice(1);
  return target;
}
function phraseRegex(pt){
  const body=escapeRegExp(pt);
  const startsWord=/^[\p{L}\p{M}\p{N}]/u.test(pt),endsWord=/[\p{L}\p{M}\p{N}]$/u.test(pt);
  return new RegExp(`${startsWord?'(?<![\\p{L}\\p{M}\\p{N}])':''}${body}${endsWord?'(?![\\p{L}\\p{M}\\p{N}])':''}`,'giu');
}
function protectPokerNotation(input){
  const slots=[];const hold=value=>{const i=slots.push(value)-1;return `\uE100${i}\uE101`;};let out=String(input);
  out=out.replace(/(?:10|[2-9AKQJ])[♠♥♦♣]/g,hold);
  out=out.replace(/\b(?:10|[2-9AKQJ])(?:-(?:10|[2-9AKQJ])){1,8}\b/g,hold);
  out=out.replace(/\b(?:[AKQJT2-9]{2})(?:s|o)?\b/g,hold);
  return {out,restore:value=>value.replace(/\uE100(\d+)\uE101/g,(_,i)=>slots[Number(i)]||'')};
}
function translate(input){
  if(!input||!/[A-Za-zÀ-ÿ]/.test(input))return input;
  if(/^(?:10|[2-9AKQJ])$/.test(String(input).trim()))return input;
  const protectedText=protectPokerNotation(input);let out=protectedText.out;const slots=[];
  for(const [pt,en] of phrasePairs)out=out.replace(phraseRegex(pt),match=>{const i=slots.push(matchCase(match,en))-1;return `\uE000${i}\uE001`;});
  out=out.replace(/[\p{L}\p{M}]+(?:[-’'][\p{L}\p{M}]+)*/gu,token=>{const tr=words[token.toLocaleLowerCase('pt-BR')];return tr?matchCase(token,tr):token;});
  out=out.replace(/\uE000(\d+)\uE001/g,(_,i)=>slots[Number(i)]||'');return protectedText.restore(out);
}

check('large phrase catalog',phrasePairs.length>=410,`found ${phrasePairs.length}`);
check('large word catalog',Object.keys(words).length>=3010,`found ${Object.keys(words).length}`);
check('Ace card with suit preserved',translate('A♠ K♠')==='A♠ K♠',translate('A♠ K♠'));
check('Ace-high chain preserved',translate('A-K-Q-J-10')==='A-K-Q-J-10',translate('A-K-Q-J-10'));
check('standalone Ace rank preserved',translate('A')==='A',translate('A'));
check('phrase boundary protects INFORMATION',translate('INFORMAÇÃO')==='INFORMATION',translate('INFORMAÇÃO'));
check('no informaction regression',!translate('INFORMAÇÃO').toLowerCase().includes('informaction'),translate('INFORMAÇÃO'));
check('remaining protege translated',translate('protege')==='protects',translate('protege'));
check('remaining cassino translated',translate('cassino')==='casino',translate('cassino'));
check('remaining duplas translated',translate('duplas')==='pairs',translate('duplas'));
check('remaining ajustar translated',translate('ajustar')==='adjust',translate('ajustar'));
check('remaining decisao translated',translate('decisao')==='decision',translate('decisao'));
check('remaining resultado translated',translate('resultado')==='result',translate('resultado'));
check('live hand phrase',translate('mão viva').toLowerCase()==='live hand',translate('mão viva'));
check('acts-first phrase',translate('quem age primeiro').toLowerCase()==='who acts first',translate('quem age primeiro'));
check('poker antes preserved',translate('blinds/antes').toLowerCase()==='blinds/antes',translate('blinds/antes'));

const sourceFiles=fs.readdirSync(ROOT).filter(file=>/\.(?:js|html)$/.test(file)&&!file.startsWith('i18n-en-us')&&!file.startsWith('test-')&&!file.startsWith('audit-'));
const unmappedAccented=new Map();
for(const file of sourceFiles){
  const source=fs.readFileSync(path.join(ROOT,file),'utf8');
  const tokens=source.match(/[\p{L}\p{M}]+(?:[-’'][\p{L}\p{M}]+)*/gu)||[];
  for(const token of tokens){
    const key=token.toLocaleLowerCase('pt-BR');
    if(/[áàâãéêíóôõúç]/i.test(token)&&!Object.prototype.hasOwnProperty.call(words,key)&&key!=='aã'){
      if(!unmappedAccented.has(key))unmappedAccented.set(key,new Set());unmappedAccented.get(key).add(file);
    }
  }
}
check('all accented Portuguese source words mapped',unmappedAccented.size===0,[...unmappedAccented].map(([w,f])=>`${w} (${[...f].join(',')})`).join('; '));

// Every dictionary key whose English translation differs is treated as Portuguese residue if it survives rendering.
// Poker ANTE/ANTES are explicitly allowed because they are also correct English poker terms.
const allowSurvivors=new Set(`ante antes holdem omaha razz stud poker button dealer floor staff blinds blind stack stacks pot board flop turn river showdown muck call raise fold check bet all-in limp straddle stake stakes kicker kickers range ranges cash game games heads-up lowball draw short deck royal straight flush full house ranking hand hands menu regular ideal area observe`.split(/\s+/));
const residueKeys=new Set(Object.entries(words).filter(([pt,en])=>pt.toLocaleLowerCase('pt-BR')!==String(en).toLocaleLowerCase('en-US')&&!allowSurvivors.has(pt.toLocaleLowerCase('pt-BR'))).map(([pt])=>pt.toLocaleLowerCase('pt-BR')));
const manualUnmapped=new Set(`confere conferem viva vivas protege protegem cassino cassinos dupla duplas ajustar ajusta ajuste decisao decisoes resultado resultados`.split(/\s+/));
const portugueseSuffix=/(?:ções|ção|mente|dades|dade|agens|agem|eiros|eiras|eiro|eira|ando|endo|indo|ariam|eria|iriam|avam|íamos|ado|ada|ados|adas)$/iu;
const literal=/('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)/gs;
const residue=[];
for(const file of sourceFiles){
  const source=fs.readFileSync(path.join(ROOT,file),'utf8');
  for(const match of source.matchAll(literal)){
    let raw=match[0].slice(1,-1);if(raw.length>5000)continue;
    raw=raw.replace(/\\n|\\t/g,' ').replace(/\$\{[^}]*\}/g,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&(?:#\d+|\w+);/g,' ');
    if(!/[A-Za-zÀ-ÿ]/.test(raw))continue;
    const srcTokens=raw.match(/[\p{L}\p{M}]+/gu)||[];
    const sourceLooksPortuguese=srcTokens.some(t=>/[áàâãéêíóôõúç]/i.test(t)||residueKeys.has(t.toLocaleLowerCase('pt-BR'))||manualUnmapped.has(t.toLocaleLowerCase('pt-BR')));
    if(!sourceLooksPortuguese)continue;
    const output=translate(raw),outTokens=output.match(/[\p{L}\p{M}]+/gu)||[];
    const bad=outTokens.filter(token=>{
      const k=token.toLocaleLowerCase('pt-BR');
      if(allowSurvivors.has(k))return false;
      return /[áàâãéêíóôõúç]/i.test(token)||residueKeys.has(k)||manualUnmapped.has(k)||portugueseSuffix.test(token);
    });
    if(bad.length)residue.push(`${file}: ${[...new Set(bad)].join(', ')} :: ${output.replace(/\s+/g,' ').slice(0,260)}`);
  }
}
check('zero Portuguese residue after EN-US translation',residue.length===0,residue.slice(0,120).join(' | '));

const index=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
check('header logo is direct PNG',index.includes('src="./header-logo-transparent.png?v=1"'));
check('old inline SVG logo removed',!index.includes('<svg class="logo"'));
check('Love Ya Like A Sister preserved',index.includes("family=Love+Ya+Like+A+Sister")&&index.includes("font-family:'Love Ya Like A Sister',cursive"));
const sw=fs.readFileSync(path.join(ROOT,'sw.js'),'utf8');
check('service worker current',/stackup-academy-v6[89]/.test(sw)&&/SW_VERSION=6[89]/.test(sw));
check('service worker caches English catalogs',sw.includes('i18n-en-us-phrases-3.js')&&[1,2,3,4].every(i=>sw.includes(`i18n-en-us-words-extra-${i}.js`)));

if(failures.length){console.error(`i18n audit: ${checks-failures.length}/${checks} passed, ${failures.length} failed`);for(const failure of failures)console.error(`FAIL: ${failure}`);process.exit(1);}
console.log(`i18n audit: ${checks}/${checks} passed`);
console.log(`phrases: ${phrasePairs.length}; word mappings: ${Object.keys(words).length}; source files audited: ${sourceFiles.length}`);
