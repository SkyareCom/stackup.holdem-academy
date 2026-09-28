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
})();