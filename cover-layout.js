(() => {
  const TITLE_HTML='APRENDA POKER<br>EM 3 ETAPAS.';
  const TITLE_LABEL='APRENDA POKER EM 3 ETAPAS.';
  const DESCRIPTION='Estude de forma interativa, seguindo uma sequência lógica e progressiva.';
  const HEADER_LOGO='./header-logo-green-gold.png?v=1';

  const applyLogo=()=>{
    const brand=document.querySelector('.brandin');
    if(!brand)return;
    const current=brand.querySelector('.logo');
    if(current && current.tagName==='IMG' && current.dataset.stackupLogo==='1'){
      current.src=HEADER_LOGO;
      current.width=80;
      current.height=80;
      current.style.width='80px';
      current.style.height='80px';
      current.style.flex='0 0 80px';
      current.style.objectFit='contain';
      current.style.display='block';
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
  }
  apply();
})();