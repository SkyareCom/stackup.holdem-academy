(() => {
  const root=document.getElementById('root');
  const brand=document.getElementById('brand')||document.querySelector('.brand');
  if(!root)return;

  if('scrollRestoration' in history)history.scrollRestoration='manual';

  let resetId=0;
  let lockUntil=0;

  function setTop(){
    const scrolling=document.scrollingElement||document.documentElement;
    if(scrolling)scrolling.scrollTop=0;
    document.documentElement.scrollTop=0;
    document.body.scrollTop=0;
    window.scrollTo({top:0,left:0,behavior:'auto'});

    if(brand){
      const box=brand.getBoundingClientRect();
      if(Math.abs(box.top)>1){
        brand.scrollIntoView({block:'start',inline:'nearest',behavior:'auto'});
        if(scrolling)scrolling.scrollTop=0;
        window.scrollTo(0,0);
      }
    }
  }

  function resetToHeader(lockMs=1500){
    const id=++resetId;
    lockUntil=Math.max(lockUntil,Date.now()+lockMs);
    const run=()=>{if(id===resetId)setTop();};

    run();
    requestAnimationFrame(()=>{
      run();
      requestAnimationFrame(()=>{
        run();
        requestAnimationFrame(run);
      });
    });

    [0,40,100,180,320,520,800,1100,1450].forEach(delay=>setTimeout(run,delay));
  }

  function isPageNavigation(target){
    if(!(target instanceof Element))return false;
    return Boolean(target.closest(
      'button.card.topic,button.card.stage,a.card.topic,a.card.stage,'+
      '.card.topic[role="button"],.card.stage[role="button"],'+
      '[data-language],[data-stage],[data-topic],'+
      '#backBtn,#homeBtn,#brand,.navbtn'
    ));
  }

  root.addEventListener('click',event=>{
    if(isPageNavigation(event.target))resetToHeader();
  },true);

  document.addEventListener('click',event=>{
    if(isPageNavigation(event.target))resetToHeader();
  },true);

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

  new MutationObserver(()=>{
    if(Date.now()<lockUntil)resetToHeader(Math.max(250,lockUntil-Date.now()));
  }).observe(root,{childList:true});

  window.addEventListener('scroll',()=>{
    if(Date.now()<lockUntil && window.scrollY>0)setTop();
  },{passive:true});

  window.addEventListener('popstate',()=>resetToHeader(),{passive:true});
  window.addEventListener('hashchange',()=>resetToHeader(),{passive:true});
  window.addEventListener('pageshow',()=>resetToHeader(900),{passive:true});

  resetToHeader(900);
})();
