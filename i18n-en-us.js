(() => {
  const STORAGE='stackup-language-v1';
  const EN='en-US';
  const translatedText=new WeakMap();
  const translatedAttrs=new WeakMap();
  let queued=false;

  const phrasePairs=window.StackupI18nPhrases||[];
  const words=window.StackupI18nWords||{};

  phrasePairs.sort((a,b)=>b[0].length-a[0].length);

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
  function translateString(input){
    if(language()!==EN || !input || !/[A-Za-zÀ-ÿ]/.test(input))return input;
    let out=String(input),slots=[];
    for(const [pt,en] of phrasePairs){
      const re=new RegExp(escapeRegExp(pt),'gi');
      out=out.replace(re,match=>{const i=slots.push(matchCase(match,en))-1;return `\uE000${i}\uE001`;});
    }
    out=out.replace(/[\p{L}\p{M}]+(?:[-’'][\p{L}\p{M}]+)*/gu,token=>{
      const key=token.toLocaleLowerCase('pt-BR');
      const translated=words[key];
      return translated?matchCase(token,translated):token;
    });
    out=out.replace(/\uE000(\d+)\uE001/g,(_,i)=>slots[Number(i)]||'');
    return out;
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
    let state=translatedAttrs.get(el)||{};
    for(const attr of ['aria-label','title','placeholder']){
      if(!el.hasAttribute(attr))continue;
      const current=el.getAttribute(attr)||'';
      if(state[attr]===current)continue;
      const next=translateString(current);
      state[attr]=next;
      if(next!==current)el.setAttribute(attr,next);
    }
    if(el instanceof HTMLInputElement && /^(button|submit|reset)$/i.test(el.type)){
      const current=el.value||'';
      if(state.value!==current){
        const next=translateString(current);
        state.value=next;
        if(next!==current)el.value=next;
      }
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
    observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','value']});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  window.StackupI18n={translate:translateString,language,translateTree};
})();
