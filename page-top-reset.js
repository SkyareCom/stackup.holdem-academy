(() => {
  const root=document.getElementById('root');
  const brand=document.getElementById('brand')||document.querySelector('.brand');
  if(!root)return;

  if('scrollRestoration' in history)history.scrollRestoration='manual';

  let resetId=0;
  function setTop(){
    window.scrollTo(0,0);
    document.documentElement.scrollTop=0;
    document.body.scrollTop=0;
    if(brand&&brand.getBoundingClientRect().top<0){
      brand.scrollIntoView({block:'start',inline:'nearest',behavior:'auto'});
      window.scrollTo(0,0);
    }
  }

  function resetToHeader(){
    const id=++resetId;
    const run=()=>{if(id===resetId)setTop();};

    run();
    requestAnimationFrame(()=>{
      run();
      requestAnimationFrame(run);
    });
    setTimeout(run,0);
    setTimeout(run,50);
    setTimeout(run,140);
    setTimeout(run,320);
  }

  const nativePushState=history.pushState.bind(history);
  history.pushState=function(...args){
    const value=nativePushState(...args);
    resetToHeader();
    return value;
  };

  const nativeReplaceState=history.replaceState.bind(history);
  history.replaceState=function(...args){
    const value=nativeReplaceState(...args);
    resetToHeader();
    return value;
  };

  root.addEventListener('click',event=>{
    const card=event.target.closest('button.card,.card[role="button"],a.card');
    if(card)resetToHeader();
  },true);

  document.addEventListener('click',event=>{
    if(event.target.closest('#backBtn,#homeBtn,#brand'))resetToHeader();
  },true);

  window.addEventListener('popstate',resetToHeader,{passive:true});
  window.addEventListener('hashchange',resetToHeader,{passive:true});
  window.addEventListener('pageshow',resetToHeader,{passive:true});

  resetToHeader();
})();
