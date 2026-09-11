(() => {
  const TITLE_HTML='APRENDA POKER<br>EM 3 ETAPAS.';
  const TITLE_LABEL='APRENDA POKER EM 3 ETAPAS.';
  const DESCRIPTION='Estude de forma interativa em uma ordem lógica de aprendizado.';

  const apply=()=>{
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
    new MutationObserver(apply).observe(root,{childList:true});
  }
  apply();
})();