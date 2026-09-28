(() => {
  const STORAGE='stackup-language-v1';
  const root=document.getElementById('root');
  const navtools=document.getElementById('navtools');

  function getLanguage(){
    try{return localStorage.getItem(STORAGE)||'pt-BR';}catch(_){return 'pt-BR';}
  }

  function languageLabel(code){
    return code==='en-US'?'INGLÊS':'PORTUGUÊS';
  }

  function applyDocumentLanguage(code){
    document.documentElement.lang=code;
  }

  function saveLanguage(code){
    try{localStorage.setItem(STORAGE,code);}catch(_){ }
    applyDocumentLanguage(code);
    window.dispatchEvent(new CustomEvent('stackup:languagechange',{detail:{language:code}}));
  }

  function buildHomeCard(){
    const homeList=root?.querySelector('.screen .intro + .list');
    if(!homeList || homeList.querySelector('[data-stackup-language-card]'))return;

    const button=document.createElement('button');
    button.className='card stage';
    button.type='button';
    button.dataset.stackupLanguageCard='1';
    button.innerHTML=`<div class="kicker">CONFIGURAÇÃO</div><div class="stitle">IDIOMA</div><div class="desc">Escolha Português ou Inglês para usar o aplicativo.</div><div class="foot"><span>${languageLabel(getLanguage())}</span><span class="arrow">›</span></div>`;
    homeList.insertBefore(button,homeList.firstChild);
  }

  function renderLanguageScreen(){
    if(!root)return;
    navtools?.classList.add('show');
    const current=getLanguage();
    root.innerHTML=`<section class="screen"><div class="head"><div class="eyebrow">CONFIGURAÇÃO</div><h2>IDIOMA</h2><p>Escolha o idioma do aplicativo.</p></div><div class="list"><button class="card topic" type="button" data-stackup-language="pt-BR"><span class="idx">PT</span><span class="tcopy"><span class="ttitle">PORTUGUÊS</span><span class="tnote">Português do Brasil${current==='pt-BR'?' · SELECIONADO':''}</span></span><span class="arrow">›</span></button><button class="card topic" type="button" data-stackup-language="en-US"><span class="idx">EN</span><span class="tcopy"><span class="ttitle">INGLÊS</span><span class="tnote">English (United States)${current==='en-US'?' · SELECTED':''}</span></span><span class="arrow">›</span></button></div></section>`;
  }

  function openLanguageScreen(){
    try{history.pushState({type:'language'},'','#language');}catch(_){ }
    renderLanguageScreen();
  }

  function reloadHome(){
    const url=new URL(location.href);
    url.hash='';
    url.searchParams.delete('_fresh');
    location.replace(url.href);
  }

  document.addEventListener('click',event=>{
    const card=event.target.closest?.('[data-stackup-language-card]');
    if(card){
      event.preventDefault();
      openLanguageScreen();
      return;
    }
    const choice=event.target.closest?.('[data-stackup-language]');
    if(!choice)return;
    event.preventDefault();
    const next=choice.dataset.stackupLanguage;
    if(next!==getLanguage()){
      saveLanguage(next);
      reloadHome();
      return;
    }
    if(history.length>1)history.back();
    else reloadHome();
  });

  applyDocumentLanguage(getLanguage());
  let cardFrame=0;
  const observer=new MutationObserver(()=>{if(cardFrame)return;cardFrame=requestAnimationFrame(()=>{cardFrame=0;buildHomeCard();});});
  if(root)observer.observe(root,{childList:true});
  buildHomeCard();
})();
