(() => {
  const STORAGE='stackup-language-v1';
  const EN='en-US';
  const translatedText=new WeakMap();
  const translatedAttrs=new WeakMap();
  const pendingRoots=new Set();
  let frame=0;

  const runtimePhrases=[
    ['MÃO VIVA','LIVE HAND'],['MÃOS VIVAS','LIVE HANDS'],
    ['QUEM AGE PRIMEIRO','WHO ACTS FIRST'],['QUEM AGE POR ÚLTIMO','WHO ACTS LAST'],
    ['AGE PRIMEIRO','ACTS FIRST'],['AGE POR ÚLTIMO','ACTS LAST'],['AGE ANTES','ACTS BEFORE'],['AGE DEPOIS','ACTS AFTER'],
    ['DEALER CONFERE','DEALER CHECKS'],['O DEALER CONFERE','THE DEALER CHECKS'],
    ['BLINDS/ANTES','BLINDS/ANTES'],['BLINDS / ANTES','BLINDS / ANTES'],['BLINDS E ANTES','BLINDS AND ANTES'],
    ['BLINDS E, QUANDO APLICÁVEL, ANTES','BLINDS AND, WHEN APPLICABLE, ANTES'],
    ['OS NÍVEIS ELEVAM BLINDS/ANTES AO LONGO DO EVENTO.','THE LEVELS INCREASE BLINDS/ANTES THROUGHOUT THE EVENT.'],
    ['ANTES JÁ FORMAM O POTE','ANTES ALREADY FORM THE POT'],['ANTES SÃO DEVOLVIDOS','ANTES ARE RETURNED'],
    ['JOGAR ARTIFICIALMENTE MAIS BRANDO CONTRA ALGUÉM','PLAY ARTIFICIALLY SOFTER AGAINST SOMEONE'],
    ['AFASTAR-SE SEM ATRAPALHAR','STEP AWAY WITHOUT DISRUPTING'],
    ['ADAPTAR-SE ENTRE REGRAS','ADAPT BETWEEN RULES'],
    ['MATEMATICA DO POKER SIMPLIFICADA','SIMPLIFIED POKER MATH'],
    ['MATEMÁTICA DO POKER SIMPLIFICADA','SIMPLIFIED POKER MATH'],
    ['APOSTAS OBRIGATÓRIAS E FORMAÇÃO INICIAL DO POTE.','Forced bets and initial pot creation.'],
    ['PRÉ-FLOP, FLOP, TURN E RIVER.','Pre-flop, flop, turn, and river.'],
    ['QUEM AGE PRIMEIRO, ORDEM DAS AÇÕES E FECHAMENTO DA RODADA.','Who acts first, action order, and how a betting round ends.'],
    ['BTN, BLINDS, POSIÇÕES INICIAIS, MÉDIAS E FINAIS.','BTN, blinds, early, middle, and late positions.'],
    ['QUANDO UMA DISTRIBUIÇÃO É INVÁLIDA E COMO PROCEDER.','When a deal is invalid and how to proceed.'],
    ['2 CARTAS NA MÃO E 5 COMUNITÁRIAS.','2 hole cards and 5 community cards.']
  ];
  const phrasePairs=runtimePhrases.concat(window.StackupI18nPhrases||[]).slice().sort((a,b)=>b[0].length-a[0].length);
  const words=Object.assign({},window.StackupI18nWords||{}, {
    protege:'protects',protegem:'protect',cassino:'casino',cassinos:'casinos',
    dupla:'pair',duplas:'pairs',ajustar:'adjust',ajusta:'adjusts',ajuste:'adjustment',
    decisao:'decision','decisão':'decision',decisoes:'decisions','decisões':'decisions',
    resultado:'result',resultados:'results',confere:'checks',conferem:'check',
    viva:'live',vivas:'live',vivo:'live',vivos:'live',contra:'against',
    'compara-se':'compare','comparam-se':'compare','divide-se':'is split','aproxima-se':'is closer',
    'refere-se':'refers','soma-se':'add','aplica-se':'applies','aplicam-se':'apply',
    'trata-se':'this is','torna-se':'becomes','mantém-se':'remains','encontra-se':'is',
    'descobre-se':'it is discovered','usa-se':'use','preserva-se':'preserve','corrige-se':'correct',
    'movem-se':'move','afastar-se':'step away','ausenta-se':'steps away','queima-se':'burn',
    'abre-se':'deal','escolhem-se':'choose','adaptar-se':'adapt',
    conectividade:'connectivity',movimentando:'moving',aplicam:'apply',brando:'soft',
    terceira:'third',matematica:'mathematics'
  });

  function language(){try{return localStorage.getItem(STORAGE)||'pt-BR';}catch(_){return 'pt-BR';}}
  function escapeRegExp(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
  function matchCase(source,target){
    if(source===source.toUpperCase())return target.toUpperCase();
    if(source===source.toLowerCase())return target.toLowerCase();
    if(source[0]&&source[0]===source[0].toUpperCase())return target.charAt(0).toUpperCase()+target.slice(1);
    return target;
  }
  function phraseRegex(pt){
    const body=escapeRegExp(pt),startsWord=/^[\p{L}\p{M}\p{N}]/u.test(pt),endsWord=/[\p{L}\p{M}\p{N}]$/u.test(pt);
    return new RegExp(`${startsWord?'(?<![\\p{L}\\p{M}\\p{N}])':''}${body}${endsWord?'(?![\\p{L}\\p{M}\\p{N}])':''}`,'giu');
  }

  const compiledPhrases=phrasePairs.map(([pt,en])=>({pt,en,re:phraseRegex(pt)}));
  const exactPhrases=new Map();
  for(const [pt,en] of phrasePairs){
    const key=pt.trim().toLocaleLowerCase('pt-BR');
    if(!exactPhrases.has(key))exactPhrases.set(key,en);
  }
  const ambiguousHints=new Set(['a','as','o','os','e','em','no','na','nos','nas','do','da','dos','das','de','por','para','com','sem']);
  const translationWordKeys=new Set(Object.entries(words).filter(([key,value])=>{
    const k=key.toLocaleLowerCase('pt-BR');
    return !ambiguousHints.has(k) && String(value).toLocaleLowerCase('en-US')!==k;
  }).map(([key])=>key.toLocaleLowerCase('pt-BR')));

  function protectPokerNotation(input){
    const slots=[];const hold=value=>{const i=slots.push(value)-1;return `\uE100${i}\uE101`;};let out=String(input);
    out=out.replace(/(?:10|[2-9AKQJ])[♠♥♦♣]/g,hold);
    out=out.replace(/\b(?:10|[2-9AKQJ])(?:-(?:10|[2-9AKQJ])){1,8}\b/g,hold);
    out=out.replace(/\b(?:[AKQJT2-9]{2})(?:s|o)?\b/g,hold);
    return {out,restore:value=>value.replace(/\uE100(\d+)\uE101/g,(_,i)=>slots[Number(i)]||'')};
  }

  function exactPhrase(input){
    const match=String(input).match(/^(\s*)([\s\S]*?)(\s*)$/);
    if(!match)return null;
    const target=exactPhrases.get(match[2].toLocaleLowerCase('pt-BR'));
    return target===undefined?null:match[1]+matchCase(match[2],target)+match[3];
  }

  function hasTranslationCandidate(input){
    if(/[À-ÿ]/.test(input))return true;
    const exact=exactPhrases.has(String(input).trim().toLocaleLowerCase('pt-BR'));
    if(exact)return true;
    const tokens=String(input).match(/[\p{L}\p{M}]+(?:[-’'][\p{L}\p{M}]+)*/gu)||[];
    return tokens.some(token=>translationWordKeys.has(token.toLocaleLowerCase('pt-BR')));
  }

  function translateString(input){
    if(language()!==EN || !input || !/[A-Za-zÀ-ÿ]/.test(input))return input;
    if(/^(?:10|[2-9AKQJ])$/.test(String(input).trim()))return input;
    const direct=exactPhrase(input);
    if(direct!==null)return direct;
    if(!hasTranslationCandidate(input))return input;
    const protectedText=protectPokerNotation(input);let out=protectedText.out,slots=[];
    for(const item of compiledPhrases){
      item.re.lastIndex=0;
      out=out.replace(item.re,match=>{const i=slots.push(matchCase(match,item.en))-1;return `\uE000${i}\uE001`;});
    }
    out=out.replace(/[\p{L}\p{M}]+(?:[-’'][\p{L}\p{M}]+)*/gu,token=>{const key=token.toLocaleLowerCase('pt-BR'),translated=words[key];return translated?matchCase(token,translated):token;});
    out=out.replace(/\uE000(\d+)\uE001/g,(_,i)=>slots[Number(i)]||'');return protectedText.restore(out);
  }

  const pokerCase=new Map([
    ['btn','BTN'],['sb','SB'],['bb','BB'],['utg','UTG'],['utg1','UTG1'],['utg2','UTG2'],['mp1','MP1'],['mp2','MP2'],
    ['lj','LJ'],['hj','HJ'],['co','CO'],['plo','PLO'],['mtt','MTT'],['sng','SNG'],['icm','ICM'],['ev','EV'],['vpip','VPIP'],['pfr','PFR']
  ]);
  function normalizeDescriptionCase(value,parent){
    if(!parent?.matches?.('.desc,.tnote'))return value;
    const letters=String(value).replace(/[^A-Za-z]/g,'');
    if(letters.length<6 || letters!==letters.toUpperCase())return value;
    let next=String(value).toLocaleLowerCase('en-US');
    next=next.replace(/\b[a-z0-9]+\b/gi,token=>pokerCase.get(token.toLowerCase())||token);
    next=next.replace(/hold['’]em/gi,"Hold'em").replace(/\bomaha\b/gi,'Omaha').replace(/\brazz\b/gi,'Razz').replace(/\bstud\b/gi,'Stud');
    return next.replace(/[A-Za-z]/,c=>c.toUpperCase());
  }

  function translateTextNode(node){
    if(!node || node.nodeType!==Node.TEXT_NODE)return;const parent=node.parentElement;
    if(!parent || ['SCRIPT','STYLE','NOSCRIPT','CODE','PRE'].includes(parent.tagName))return;
    const current=node.nodeValue;if(!current || !current.trim()||translatedText.get(node)===current)return;
    let next=translateString(current);next=normalizeDescriptionCase(next,parent);
    translatedText.set(node,next);if(next!==current)node.nodeValue=next;
  }
  function translateAttributes(el){
    if(!(el instanceof Element))return;const state=translatedAttrs.get(el)||{};
    for(const attr of ['aria-label','title','placeholder','alt']){if(!el.hasAttribute(attr))continue;const current=el.getAttribute(attr)||'';if(state[attr]===current)continue;const next=translateString(current);state[attr]=next;if(next!==current)el.setAttribute(attr,next);}translatedAttrs.set(el,state);
  }
  function translateTree(root=document.body){
    if(language()!==EN || !root)return;document.documentElement.lang=EN;document.title=translateString(document.title);
    if(root.nodeType===Node.TEXT_NODE){translateTextNode(root);return;}
    if(root.nodeType===Node.ELEMENT_NODE)translateAttributes(root);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);let n;while((n=walker.nextNode())){if(n.nodeType===Node.TEXT_NODE)translateTextNode(n);else translateAttributes(n);}
  }

  function flushPending(){
    frame=0;
    const roots=[...pendingRoots].filter(node=>node?.isConnected);
    pendingRoots.clear();
    const topLevel=roots.filter((node,index)=>!roots.some((other,i)=>i!==index&&other.nodeType===Node.ELEMENT_NODE&&other.contains?.(node)));
    for(const root of topLevel)translateTree(root);
  }
  function schedule(node){
    if(language()!==EN||!node)return;
    if(node.nodeType===Node.TEXT_NODE){translateTextNode(node);return;}
    if(node.nodeType!==Node.ELEMENT_NODE)return;
    pendingRoots.add(node);
    if(!frame)frame=requestAnimationFrame(flushPending);
  }
  function start(){
    if(language()!==EN)return;translateTree(document.body);
    const observer=new MutationObserver(records=>{
      for(const record of records){
        if(record.type==='characterData'){translateTextNode(record.target);continue;}
        if(record.type==='attributes'){translateAttributes(record.target);continue;}
        for(const node of record.addedNodes)schedule(node);
      }
    });
    observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','alt']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  window.StackupI18n={translate:translateString,language,translateTree};
})();
