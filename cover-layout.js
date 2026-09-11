(() => {
  const TITLE_HTML='APRENDA POKER<br>EM 3 ETAPAS.';
  const TITLE_LABEL='APRENDA POKER EM 3 ETAPAS.';
  const DESCRIPTION='Estude de forma interativa, seguindo uma sequência lógica e progressiva.';
  const HEADER_LOGO='./medalhão_heráldico_dourado_e_esmeralda.png?v=1';

  const scrollHeader=()=>{
    const go=()=>window.scrollTo({top:0,left:0,behavior:'auto'});
    go();
    requestAnimationFrame(go);
    setTimeout(go,0);
    setTimeout(go,120);
  };

  const applyLogo=()=>{
    const brand=document.querySelector('.brandin');
    if(!brand)return;
    const current=brand.querySelector('.logo');
    if(current && current.tagName==='IMG' && current.dataset.stackupLogo==='1'){
      if(current.getAttribute('src')!==HEADER_LOGO)current.src=HEADER_LOGO;
      current.width=80;
      current.height=80;
      current.style.width='80px';
      current.style.height='80px';
      current.style.flex='0 0 80px';
      current.style.objectFit='contain';
      current.style.display='block';
      current.style.background='transparent';
      return;
    }
    const img=document.createElement('img');
    img.className='logo';
    img.dataset.stackupLogo='1';
    img.src=HEADER_LOGO;
    img.alt="StackUp Hold'em Academy";
    img.width=80;
    img.height=80;
    img.style.width='80px';
    img.style.height='80px';
    img.style.flex='0 0 80px';
    img.style.objectFit='contain';
    img.style.display='block';
    img.style.background='transparent';
    if(current)current.replaceWith(img);else brand.prepend(img);
  };

  const apply=()=>{
    applyLogo();
    const root=document.getElementById('root');
    if(!root)return;
    const intro=root.querySelector('.intro');
    if(!intro)return;

    const h1=intro.querySelector('h1');
    if(h1 && h1.innerHTML!==TITLE_HTML){
      h1.innerHTML=TITLE_HTML;
      h1.setAttribute('aria-label',TITLE_LABEL);
    }

    const p=intro.querySelector('p');
    if(p && p.textContent!==DESCRIPTION){
      p.textContent=DESCRIPTION;
    }
  };

  const root=document.getElementById('root');
  if(root){
    new MutationObserver(apply).observe(root,{childList:true,subtree:true});
    new MutationObserver(scrollHeader).observe(root,{childList:true});
  }
  window.addEventListener('popstate',scrollHeader);
  document.addEventListener('click',event=>{
    if(event.target.closest('.stage,.topic,#backBtn,#homeBtn,#brand'))setTimeout(scrollHeader,0);
  },true);
  apply();
})();