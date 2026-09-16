(() => {
  if(window.__stackupPageTopReset)return;
  window.__stackupPageTopReset=1;

  const root=document.getElementById('root');
  if(!root)return;

  if('scrollRestoration' in history)history.scrollRestoration='manual';

  const STYLE_ID='stackup-motion-performance';
  if(!document.getElementById(STYLE_ID)){
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      html,body{
        scroll-behavior:auto!important;
        overscroll-behavior-y:auto;
      }
      body,.app,#root{
        touch-action:pan-y pinch-zoom;
      }
      #root>.screen{
        animation:stackup-screen-in 140ms cubic-bezier(.2,.7,.2,1) both;
        transform:translateZ(0);
        backface-visibility:hidden;
      }
      @keyframes stackup-screen-in{
        from{opacity:.01;transform:translate3d(0,5px,0)}
        to{opacity:1;transform:translate3d(0,0,0)}
      }
      @media(prefers-reduced-motion:reduce){
        #root>.screen{animation:none!important;transform:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  let raf=0;
  function setTop(){
    const scrolling=document.scrollingElement||document.documentElement;
    if(scrolling)scrolling.scrollTop=0;
    window.scrollTo(0,0);
  }

  function scheduleTopReset(){
    if(raf)cancelAnimationFrame(raf);
    setTop();
    raf=requestAnimationFrame(()=>{
      raf=0;
      setTop();
    });
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

  document.addEventListener('click',event=>{
    if(isPageNavigation(event.target))scheduleTopReset();
  },true);

  const nativePushState=history.pushState.bind(history);
  history.pushState=function(...args){
    const value=nativePushState(...args);
    scheduleTopReset();
    return value;
  };

  const nativeReplaceState=history.replaceState.bind(history);
  history.replaceState=function(...args){
    const value=nativeReplaceState(...args);
    scheduleTopReset();
    return value;
  };

  window.addEventListener('popstate',scheduleTopReset,{passive:true});
  window.addEventListener('hashchange',scheduleTopReset,{passive:true});
  window.addEventListener('pageshow',event=>{
    if(event.persisted)scheduleTopReset();
  },{passive:true});

  scheduleTopReset();
})();
