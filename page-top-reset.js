(() => {
  const root=document.getElementById('root');
  if(!root)return;

  if('scrollRestoration' in history)history.scrollRestoration='manual';

  let frame=0;
  function resetToHeader(){
    if(frame)cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{
      frame=0;
      window.scrollTo({top:0,left:0,behavior:'auto'});
      document.documentElement.scrollTop=0;
      document.body.scrollTop=0;
    });
  }

  new MutationObserver(mutations=>{
    if(mutations.some(mutation=>mutation.target===root&&mutation.type==='childList')){
      resetToHeader();
    }
  }).observe(root,{childList:true});

  window.addEventListener('popstate',resetToHeader,{passive:true});
  window.addEventListener('hashchange',resetToHeader,{passive:true});
  window.addEventListener('pageshow',resetToHeader,{passive:true});

  resetToHeader();
})();
