(() => {
  const root=document.getElementById('root');
  const topNav=document.getElementById('navtools');
  if(!root)return;

  const STYLE_ID='stackup-bottom-navigation-style';
  if(!document.getElementById(STYLE_ID)){
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      #root .stackup-bottom-nav{
        display:flex;
        gap:10px;
        width:100%;
        margin:24px 0 0;
        padding:4px 0 0;
        box-sizing:border-box;
      }
      #root .stackup-bottom-nav .navbtn{
        flex:1 1 0;
        width:100%;
      }
      @media(max-width:380px){
        #root .stackup-bottom-nav{gap:8px}
        #root .stackup-bottom-nav .navbtn{font-size:14px}
      }
    `;
    document.head.appendChild(style);
  }

  function labels(){
    const back=document.querySelector('#backBtn span:last-child')?.textContent?.trim()||'VOLTAR';
    const home=document.querySelector('#homeBtn span:last-child')?.textContent?.trim()||'MENU PRINCIPAL';
    return {back,home};
  }

  function makeButton(icon,label,action){
    const button=document.createElement('button');
    button.type='button';
    button.className='navbtn';

    const iconSpan=document.createElement('span');
    iconSpan.className='navicon';
    iconSpan.textContent=icon;

    const labelSpan=document.createElement('span');
    labelSpan.textContent=label;

    button.append(iconSpan,labelSpan);
    button.addEventListener('click',action);
    return button;
  }

  window.StackUpNativeBack=function(){
    const state=history.state;
    if(state?.type&&state.type!=='home'){
      history.back();
      return true;
    }
    return false;
  };

  function ensureBottomNavigation(){
    const state=history.state;
    const screen=root.querySelector('.screen');
    const existing=root.querySelector('.stackup-bottom-nav');

    if(!screen||!state?.type||state.type==='home'){
      existing?.remove();
      return;
    }

    const {back,home}=labels();
    if(existing){
      const spans=existing.querySelectorAll('.navbtn span:last-child');
      if(spans[0]&&spans[0].textContent!==back)spans[0].textContent=back;
      if(spans[1]&&spans[1].textContent!==home)spans[1].textContent=home;
      if(existing.parentElement!==screen)screen.appendChild(existing);
      return;
    }

    const nav=document.createElement('nav');
    nav.className='stackup-bottom-nav';
    nav.setAttribute('aria-label','Navegação da tela');

    nav.append(
      makeButton('‹',back,()=>window.StackUpNativeBack()),
      makeButton('⌂',home,()=>{
        if(typeof window.goHome==='function')window.goHome();
        else if(typeof goHome==='function')goHome();
      })
    );

    screen.appendChild(nav);
  }

  let queued=false;
  function schedule(){
    if(queued)return;
    queued=true;
    queueMicrotask(()=>{
      queued=false;
      ensureBottomNavigation();
    });
  }

  new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
  if(topNav)new MutationObserver(schedule).observe(topNav,{childList:true,subtree:true,characterData:true});
  window.addEventListener('popstate',schedule,{passive:true});
  schedule();
})();
