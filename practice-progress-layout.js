(() => {
  const root=document.getElementById('root');
  if(!root)return;

  let observedShell=null;
  let shellObserver=null;
  let frame=0;

  function alignMathProgress(){
    frame=0;
    const shell=root.querySelector('.p3x-shell[data-p3x="math"]');

    if(!shell){
      shellObserver?.disconnect();
      shellObserver=null;
      observedShell=null;
      return;
    }

    if(shell!==observedShell){
      shellObserver?.disconnect();
      observedShell=shell;
      shellObserver=new MutationObserver(queueAlign);
      shellObserver.observe(shell,{childList:true});
    }

    const panel=shell.querySelector(':scope > .p3x-panel');
    const counter=panel?.querySelector(':scope > .fi-stats.p3x-counter');
    if(counter&&panel?.parentElement===shell){
      shell.insertBefore(counter,panel);
    }
  }

  function queueAlign(){
    if(frame)return;
    frame=requestAnimationFrame(alignMathProgress);
  }

  new MutationObserver(queueAlign).observe(root,{childList:true});
  window.addEventListener('popstate',queueAlign,{passive:true});
  queueAlign();
})();