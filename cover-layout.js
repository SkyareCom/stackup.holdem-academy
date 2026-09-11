(() => {
  const isEnglish=(()=>{try{return localStorage.getItem('stackup-language-v1')==='en-US';}catch(_){return false;}})();
  const TITLE_HTML=isEnglish?'LEARN POKER<br>IN 3 STEPS.':'APRENDA POKER<br>EM 3 ETAPAS.';
  const TITLE_LABEL=isEnglish?'LEARN POKER IN 3 STEPS.':'APRENDA POKER EM 3 ETAPAS.';
  const DESCRIPTION=isEnglish?'Study interactively, following a logical and progressive learning path.':'Estude de forma interativa, seguindo uma sequência lógica e progressiva.';
  const HEADER_LOGO='./header-logo-transparent.png?v=1';
  let frame=0;

  const scrollHeader=()=>{
    window.scrollTo({top:0,left:0,behavior:'auto'});
    requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'auto'}));
  };

  const applyLogo=()=>{
    const brand=document.querySelector('.brandin');
    if(!brand)return;
    const current=brand.querySelector('.logo');
    if(current && current.tagName==='IMG' && current.dataset.stackupLogo==='1'){
      if(current.getAttribute('src')!==HEADER_LOGO)current.src=HEADER_LOGO;
      current.width=80;current.height=80;
      Object.assign(current.style,{width:'80px',height:'80px',flex:'0 0 80px',objectFit:'contain',display:'block',background:'transparent'});
      return;
    }
    const img=document.createElement('img');
    img.className='logo';img.dataset.stackupLogo='1';img.src=HEADER_LOGO;img.alt="StackUp Hold'em Academy";img.width=80;img.height=80;
    Object.assign(img.style,{width:'80px',height:'80px',flex:'0 0 80px',objectFit:'contain',display:'block',background:'transparent'});
    if(current)current.replaceWith(img);else brand.prepend(img);
  };

  const apply=()=>{
    applyLogo();
    const root=document.getElementById('root');if(!root)return;
    const intro=root.querySelector('.intro');if(!intro)return;
    const h1=intro.querySelector('h1');
    if(h1 && h1.innerHTML!==TITLE_HTML){h1.innerHTML=TITLE_HTML;h1.setAttribute('aria-label',TITLE_LABEL);}
    const p=intro.querySelector('p');if(p && p.textContent!==DESCRIPTION)p.textContent=DESCRIPTION;
  };

  const queueApply=()=>{
    if(frame)return;
    frame=requestAnimationFrame(()=>{frame=0;apply();scrollHeader();});
  };
  const root=document.getElementById('root');
  if(root)new MutationObserver(queueApply).observe(root,{childList:true});
  window.addEventListener('popstate',scrollHeader,{passive:true});
  document.addEventListener('click',event=>{if(event.target.closest('.stage,.topic,#backBtn,#homeBtn,#brand'))setTimeout(scrollHeader,0);},true);
  apply();
})();
