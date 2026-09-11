const fs=require('fs');
const path=require('path');
const vm=require('vm');

const ROOT=__dirname;
const context={window:{}};
vm.createContext(context);
for(const file of [
  'i18n-en-us-phrases-1.js',
  'i18n-en-us-phrases-2.js',
  'i18n-en-us-phrases-3.js',
  'i18n-en-us-words.js',
  'i18n-en-us-words-extra-1.js','i18n-en-us-words-extra-2.js','i18n-en-us-words-extra-3.js','i18n-en-us-words-extra-4.js'
]){
  vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),context,{filename:file});
}

const phrasePairs=(context.window.StackupI18nPhrases||[]).slice().sort((a,b)=>b[0].length-a[0].length);
const words=context.window.StackupI18nWords||{};
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
  const startsWord=/^[\p{L}\p{M}\p{N}]/u.test(pt);
  const endsWord=/[\p{L}\p{M}\p{N}]$/u.test(pt);
  return new RegExp(`${startsWord?'(?<![\\p{L}\\p{M}\\p{N}])':''}${body}${endsWord?'(?![\\p{L}\\p{M}\\p{N}])':''}`,'giu');
}
function protectPokerNotation(input){
  const slots=[];
  const hold=value=>{const i=slots.push(value)-1;return `\uE100${i}\uE101`;};
  let out=String(input);
  out=out.replace(/(?:10|[2-9AKQJ])[♠♥♦♣]/g,hold);
  out=out.replace(/\b(?:10|[2-9AKQJ])(?:-(?:10|[2-9AKQJ])){1,8}\b/g,hold);
  out=out.replace(/\b(?:[AKQJT2-9]{2})(?:s|o)?\b/g,hold);
  return {out,restore:value=>value.replace(/\uE100(\d+)\uE101/g,(_,i)=>slots[Number(i)]||'')};
}
function translate(input){
  if(!input||!/[A-Za-zÀ-ÿ]/.test(input))return input;
  if(/^(?:10|[2-9AKQJ])$/.test(String(input).trim()))return input;
  const protectedText=protectPokerNotation(input);
  let out=protectedText.out;
  const slots=[];
  for(const [pt,en] of phrasePairs){
    out=out.replace(phraseRegex(pt),match=>{const i=slots.push(matchCase(match,en))-1;return `\uE000${i}\uE001`;});
  }
  out=out.replace(/[\p{L}\p{M}]+(?:[-’'][\p{L}\p{M}]+)*/gu,token=>{
    const translated=words[token.toLocaleLowerCase('pt-BR')];
    return translated?matchCase(token,translated):token;
  });
  out=out.replace(/\uE000(\d+)\uE001/g,(_,i)=>slots[Number(i)]||'');
  return protectedText.restore(out);
}

check('large phrase catalog',phrasePairs.length>=400,`found ${phrasePairs.length}`);
check('large word catalog',Object.keys(words).length>=3000,`found ${Object.keys(words).length}`);
check('Ace card with suit preserved',translate('A♠ K♠')==='A♠ K♠',translate('A♠ K♠'));
check('Ace-high chain preserved',translate('A-K-Q-J-10')==='A-K-Q-J-10',translate('A-K-Q-J-10'));
check('standalone Ace rank preserved',translate('A')==='A',translate('A'));
check('phrase boundary protects INFORMATION',translate('INFORMAÇÃO')==='INFORMATION',translate('INFORMAÇÃO'));
check('no informaction regression',!translate('INFORMAÇÃO').toLowerCase().includes('informaction'),translate('INFORMAÇÃO'));
check('known sentence 1',translate('Compare as cinco melhores cartas.')==='Compare the best five cards.',translate('Compare as cinco melhores cartas.'));
check('known sentence 2',translate('Procedimentos irregulares devem seguir regra da casa.')==='Irregular procedures must follow house rules.',translate('Procedimentos irregulares devem seguir regra da casa.'));
check('known sentence 3',translate('Como as cartas são fechadas e não existe board, a informação vem principalmente do padrão de apostas e da quantidade de cartas trocadas.').startsWith('Because the cards are face down'),translate('Como as cartas são fechadas e não existe board, a informação vem principalmente do padrão de apostas e da quantidade de cartas trocadas.'));

// Full word-level source sweep: every accented Portuguese token used anywhere in the app
// must have an English word mapping, except the [aã] regex character class used to match "vilão".
const sourceFiles=fs.readdirSync(ROOT).filter(file=>/\.(?:js|html)$/.test(file)&&!file.startsWith('i18n-en-us')&&!file.startsWith('test-')&&!file.startsWith('audit-'));
const unmappedAccented=new Map();
for(const file of sourceFiles){
  const source=fs.readFileSync(path.join(ROOT,file),'utf8');
  const tokens=source.match(/[\p{L}\p{M}]+(?:[-’'][\p{L}\p{M}]+)*/gu)||[];
  for(const token of tokens){
    const key=token.toLocaleLowerCase('pt-BR');
    if(/[áàâãéêíóôõúç]/i.test(token)&&!Object.prototype.hasOwnProperty.call(words,key)&&key!=='aã'){
      if(!unmappedAccented.has(key))unmappedAccented.set(key,new Set());
      unmappedAccented.get(key).add(file);
    }
  }
}
check('all accented Portuguese source words mapped',unmappedAccented.size===0,[...unmappedAccented].map(([w,f])=>`${w} (${[...f].join(',')})`).join('; '));

// Rendered-string approximation: scan human-facing literals and ensure the English result
// contains neither Portuguese diacritics nor high-confidence untranslated Portuguese words.
const markers=new Set(`que uma para por sem depois como você vocês qual quais quem jogador jogadores mão mãos cartas carta pote fichas ficha aposta apostas regra regras rodada posição posições torneio torneios modalidade modalidades baralho distribuição deve devem pode podem mais menos mesmo mesma quando entre cada todos todas seu seus sua suas ninguém alguém muito muitas muitos outra outras outro outros então ainda apenas sempre conforme próprio próprias próprios adversário adversários decisão decisões conteúdo conteúdos capítulo capítulos pergunta perguntas resposta respostas exercício exercícios`.split(/\s+/));
const literal=/('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)/gs;
const residue=[];
for(const file of sourceFiles){
  const source=fs.readFileSync(path.join(ROOT,file),'utf8');
  for(const match of source.matchAll(literal)){
    let raw=match[0].slice(1,-1);
    if(raw.length>3500)continue;
    raw=raw.replace(/\\n|\\t/g,' ').replace(/\$\{[^}]*\}/g,' ');
    raw=raw.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&(?:#\d+|\w+);/g,' ');
    if(!/[A-Za-zÀ-ÿ]/.test(raw))continue;
    const sourceTokens=raw.match(/[\p{L}\p{M}]+/gu)||[];
    const likelyPortuguese=sourceTokens.some(token=>/[áàâãéêíóôõúç]/i.test(token)||markers.has(token.toLocaleLowerCase('pt-BR')));
    if(!likelyPortuguese)continue;
    const output=translate(raw);
    const outputTokens=output.match(/[\p{L}\p{M}]+/gu)||[];
    const bad=outputTokens.filter(token=>{const k=token.toLocaleLowerCase('pt-BR');return k!=='aã'&&(/[áàâãéêíóôõúç]/i.test(token)||markers.has(k));});
    if(bad.length)residue.push(`${file}: ${[...new Set(bad)].join(', ')} :: ${output.replace(/\s+/g,' ').slice(0,180)}`);
  }
}
check('no Portuguese residue in translated human-facing literals',residue.length===0,residue.slice(0,20).join(' | '));

const index=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
check('header logo is direct PNG',index.includes('src="./header-logo-transparent.png?v=1"'));
check('old inline SVG logo removed',!index.includes('<svg class="logo"'));
check('English runtime loaded directly',index.includes('i18n-en-us-words-extra-1.js?v=1')&&index.includes('i18n-en-us.js?v=3'));
const logoPath=path.join(ROOT,'header-logo-transparent.png');
check('header logo file exists',fs.existsSync(logoPath));
if(fs.existsSync(logoPath)){
  const bytes=fs.readFileSync(logoPath);
  check('header logo is PNG',bytes.subarray(0,8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])));
  check('header logo is non-empty',bytes.length>1000,`${bytes.length} bytes`);
}
const cover=fs.readFileSync(path.join(ROOT,'cover-layout.js'),'utf8');
check('cover uses ASCII logo path',cover.includes("./header-logo-transparent.png?v=1"));
check('cover is language aware',cover.includes("stackup-language-v1")&&cover.includes('LEARN POKER'));
const sw=fs.readFileSync(path.join(ROOT,'sw.js'),'utf8');
check('service worker v68',sw.includes("stackup-academy-v68")&&sw.includes('SW_VERSION=68'));
check('service worker caches English extras',sw.includes('i18n-en-us-phrases-3.js')&&[1,2,3,4].every(i=>sw.includes(`i18n-en-us-words-extra-${i}.js`)));
check('service worker caches restored logo',sw.includes('header-logo-transparent.png'));

if(failures.length){
  console.error(`i18n audit: ${checks-failures.length}/${checks} passed, ${failures.length} failed`);
  for(const failure of failures)console.error(`FAIL: ${failure}`);
  process.exit(1);
}
console.log(`i18n audit: ${checks}/${checks} passed`);
console.log(`phrases: ${phrasePairs.length}; word mappings: ${Object.keys(words).length}; source files audited: ${sourceFiles.length}`);
