(() => {
  const STORAGE='stackup-language-v1';
  const EN='en-US';
  const translatedText=new WeakMap();
  const translatedAttrs=new WeakMap();
  let queued=false;

  const runtimePhrases=[
    ['MÃO VIVA','LIVE HAND'],['MÃOS VIVAS','LIVE HANDS'],
    ['QUEM AGE PRIMEIRO','WHO ACTS FIRST'],['QUEM AGE POR ÚLTIMO','WHO ACTS LAST'],
    ['AGE PRIMEIRO','ACTS FIRST'],['AGE POR ÚLTIMO','ACTS LAST'],['AGE ANTES','ACTS BEFORE'],['AGE DEPOIS','ACTS AFTER'],
    ['DEALER CONFERE','DEALER CHECKS'],['O DEALER CONFERE','THE DEALER CHECKS'],
    ['BLINDS/ANTES','BLINDS/ANTES'],['BLINDS / ANTES','BLINDS / ANTES'],['BLINDS E ANTES','BLINDS AND ANTES'],
    ['BLINDS E, QUANDO APLICÁVEL, ANTES','BLINDS AND, WHEN APPLICABLE, ANTES'],
    ['OS NÍVEIS ELEVAM BLINDS/ANTES AO LONGO DO EVENTO.','THE LEVELS INCREASE BLINDS/ANTES THROUGHOUT THE EVENT.'],
    ['ANTES JÁ FORMAM O POTE','ANTES ALREADY FORM THE POT'],
    ['ANTES SÃO DEVOLVIDOS','ANTES ARE RETURNED']
  ];
  const phrasePairs=runtimePhrases.concat(window.StackupI18nPhrases||[]).slice().sort((a,b)=>b[0].length-a[0].length);
  const words=Object.assign({},window.StackupI18nWords||{}, {
    protege:'protects',protegem:'protect',cassino:'casino',cassinos:'casinos',
    dupla:'pair',duplas:'pairs',ajustar:'adjust',ajusta:'adjusts',ajuste:'adjustment',
    decisao:'decision','decisão':'decision',decisoes:'decisions','decisões':'decisions',
    resultado:'result',resultados:'results',confere:'checks',conferem:'check',
    viva:'live',vivas:'live',vivo:'live',vivos:'live'
  });

  function language(){
    try{return localStorage.getItem(STORAGE)||'pt-BR';}catch(_){return 'pt-BR';}
  }
  function escapeRegExp(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
  function matchCase(source,target){
    if(source===source.toUpperCase())return target.toUpperCase();
    if(source===source.toLowerCase())return target.toLowerCase();
    if(source[0]&&source[0]===source[0].toUpperCase())return target.charAt(0).toUpperCase()+target.slice(1);
    return target;
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

  function phraseRegex(pt){
    const body=escapeRegExp(pt);
    const startsWord=/^[\p{L}\p{M}\p{N}]/u.test(pt);
    const endsWord=/[\p{L}\p{M}\p{N}]$/u.test(pt);
    return new RegExp(`${startsWord?'(?<![\\p{L}\\p{M}\\p{N}])':''}${body}${endsWord?'(?![\\p{L}\\p{M}\\p{N}])':''}`,'giu');
  }

  function translateString(input){
    if(language()!==EN || !input || !/[A-Za-zÀ-ÿ]/.test(input))return input;
    if(/^(?:10|[2-9AKQJ])$/.test(String(input).trim()))return input;
    const protectedText=protectPokerNotation(input);
    let out=protectedText.out,slots=[];
    for(const [pt,en] of phrasePairs){
      const re=phraseRegex(pt);
      out=out.replace(re,match=>{const i=slots.push(matchCase(match,en))-1;return `\uE000${i}\uE001`;});
    }
    out=out.replace(/[\p{L}\p{M}]+(?:[-’'][\p{L}\p{M}]+)*/gu,token=>{
      const key=token.toLocaleLowerCase('pt-BR');
      const translated=words[key];
      return translated?matchCase(token,translated):token;
    });
    out=out.replace(/\uE000(\d+)\uE001/g,(_,i)=>slots[Number(i)]||'');
    return protectedText.restore(out);
  }

  function translateTextNode(node){
    if(!node || node.nodeType!==Node.TEXT_NODE)return;
    const parent=node.parentElement;
    if(!parent || ['SCRIPT','STYLE','NOSCRIPT','CODE','PRE'].includes(parent.tagName))return;
    const current=node.nodeValue;
    if(!current || !current.trim())return;
    if(translatedText.get(node)===current)return;
    const next=translateString(current);
    translatedText.set(node,next);
    if(next!==current)node.nodeValue=next;
  }

  function translateAttributes(el){
    if(!(el instanceof Element))return;
    const state=translatedAttrs.get(el)||{};
    for(const attr of ['aria-label','title','placeholder','alt']){
      if(!el.hasAttribute(attr))continue;
      const current=el.getAttribute(attr)||'';
      if(state[attr]===current)continue;
      const next=translateString(current);
      state[attr]=next;
      if(next!==current)el.setAttribute(attr,next);
    }
    translatedAttrs.set(el,state);
  }

  function translateTree(root=document.body){
    if(language()!==EN || !root)return;
    document.documentElement.lang=EN;
    document.title=translateString(document.title);
    if(root.nodeType===Node.TEXT_NODE)translateTextNode(root);
    if(root.nodeType===Node.ELEMENT_NODE)translateAttributes(root);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);
    let n;
    while((n=walker.nextNode())){
      if(n.nodeType===Node.TEXT_NODE)translateTextNode(n);else translateAttributes(n);
    }
  }

  function schedule(root){
    if(language()!==EN)return;
    if(root && root.nodeType===Node.TEXT_NODE){translateTextNode(root);return;}
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{queued=false;translateTree(document.body);});
  }

  function start(){
    if(language()!==EN)return;
    translateTree(document.body);
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
  window.StackupI18n={translate:translateString,language};
})();
