(() => {
  const root=document.getElementById('root');
  if(!root)return;
  const style=document.createElement('style');
  style.textContent=`
    body{padding-bottom:76px!important}
    .stackup-shortcuts{position:fixed;left:0;right:0;bottom:0;z-index:9000;height:68px;background:#f6ecd1f5;border-top:2px solid #c99a43;box-shadow:0 -5px 18px #1a090633;display:grid;grid-template-columns:repeat(5,1fr);padding:5px max(4px,env(safe-area-inset-right)) calc(5px + env(safe-area-inset-bottom)) max(4px,env(safe-area-inset-left));backdrop-filter:blur(8px)}
    .stackup-shortcuts button{border:0;background:transparent;color:#3a281d;min-width:0;padding:3px 2px;font-family:'Coming Soon',cursive!important;font-weight:700!important;font-style:italic!important;font-size:9px;line-height:1.15;text-transform:uppercase;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px}
    .stackup-shortcuts .sn-icon{font-family:'Coming Soon',cursive!important;font-weight:700!important;font-style:italic!important;color:#a8792f;font-size:17px;line-height:1}
    .stackup-shortcuts button.active{color:#0b5a45}.stackup-shortcuts button.active .sn-icon{color:#0b5a45}
    @media(max-width:350px){.stackup-shortcuts button{font-size:8px}}
  `;
  document.head.appendChild(style);
  const nav=document.createElement('nav');nav.className='stackup-shortcuts';nav.setAttribute('aria-label','Atalhos principais');
  const items=[
    ['⌂','HOME','home'],
    ['01','FUNDAMENTOS','fundamentos'],
    ['02','MODALIDADES','modalidades'],
    ['03','PRÁTICA','pratica'],
    ['◎','IDIOMA','idioma']
  ];
  const go=(key)=>{
    window.StackupPlatform?.analytics?.track('footer_shortcut_clicked',{destination:key});
    if(key==='home'){if(typeof window.goHome==='function')window.goHome();else if(typeof home==='function')home();return}
    if(key==='idioma'){
      const entry=document.getElementById('stackup-entry');
      if(entry){entry.style.display='block';entry.querySelector('.se-card')?.querySelector('[data-open]')?.click();return}
      window.dispatchEvent(new CustomEvent('stackup:open-language'));
      return;
    }
    if(typeof stage==='function')stage(key,1);
  };
  items.forEach(([icon,label,key])=>{const b=document.createElement('button');b.type='button';b.dataset.key=key;b.innerHTML=`<span class="sn-icon">${icon}</span><span>${label}</span>`;b.onclick=()=>go(key);nav.appendChild(b)});
  document.body.appendChild(nav);
  const update=()=>{const hash=(location.hash||'#home').toLowerCase();nav.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.key==='home'?hash==='#home'||!hash:hash.includes(b.dataset.key)))};
  addEventListener('hashchange',update,{passive:true});addEventListener('popstate',update,{passive:true});update();

  // Horizontal swipe between the five footer destinations.
  const keys=items.map(x=>x[2]);
  const current=()=>{
    const h=(location.hash||'#home').toLowerCase();
    if(h.includes('fundamentos'))return 'fundamentos';
    if(h.includes('modalidades'))return 'modalidades';
    if(h.includes('pratica'))return 'pratica';
    if(document.getElementById('stackup-entry')?.style.display!=='none' && document.querySelector('#stackup-entry .se-card.open'))return 'idioma';
    return 'home';
  };
  let sx=0,sy=0,started=false;
  const surface=root;
  surface.addEventListener('touchstart',e=>{
    if(e.touches.length!==1)return;
    const t=e.touches[0];sx=t.clientX;sy=t.clientY;started=true;
  },{passive:true});
  surface.addEventListener('touchend',e=>{
    if(!started||!e.changedTouches.length)return;started=false;
    const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;
    if(Math.abs(dx)<65||Math.abs(dx)<Math.abs(dy)*1.25)return;
    const tag=e.target?.closest?.('input,textarea,select,button,a');
    if(tag)return;
    const i=keys.indexOf(current());
    const next=dx<0?i+1:i-1;
    if(next<0||next>=keys.length)return;
    surface.animate([{opacity:1,transform:'translateX(0)'},{opacity:.72,transform:`translateX(${dx<0?'-18px':'18px'})`}],{duration:130,easing:'ease-out'});
    setTimeout(()=>go(keys[next]),105);
  },{passive:true});
})();