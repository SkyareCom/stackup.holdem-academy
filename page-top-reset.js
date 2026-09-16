(() => {
  if(window.__stackupPageTopReset)return;
  window.__stackupPageTopReset=1;
  const root=document.getElementById('root');
  if(!root)return;
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  const style=document.createElement('style');
  style.id='stackup-motion-performance';
  style.textContent=`
    html,body{scroll-behavior:auto!important}
    body,.app,#root{touch-action:pan-y pinch-zoom}
    /* Keep the scrolling screen and sticky descendants out of transforms. */
    #root>.screen{animation:none!important;transform:none!important}
  `;
  document.head.appendChild(style);
  // Only a screen replacement commits navigation. Child enhancements,
  // history metadata and bfcache restoration must not move the viewport.
  let screen=root.querySelector(':scope > .screen');
  new MutationObserver(()=>{
    const next=root.querySelector(':scope > .screen');
    if(!next||next===screen)return;
    screen=next;
    window.scrollTo({top:0,left:0,behavior:'instant'});
  }).observe(root,{childList:true});
})();
