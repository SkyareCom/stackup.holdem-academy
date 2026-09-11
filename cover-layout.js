(() => {
  const apply=()=>{
    const root=document.getElementById('root');
    if(!root)return;
    const h1=root.querySelector('.intro h1');
    if(!h1)return;
    const expected='APRENDA POKER\nEM 3 ETAPAS.';
    if(h1.dataset.coverSplit==='1')return;
    h1.innerHTML='APRENDA POKER<br>EM 3 ETAPAS.';
    h1.dataset.coverSplit='1';
    h1.setAttribute('aria-label',expected.replace('\n',' '));
  };
  const root=document.getElementById('root');
  if(root){
    new MutationObserver(apply).observe(root,{childList:true});
  }
  apply();
})();