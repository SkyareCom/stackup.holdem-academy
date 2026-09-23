(() => {
  const id='stackup-academy-xp-panel-style';
  if(!document.getElementById(id)){const s=document.createElement('style');s.id=id;s.textContent='.academy-xp-panel{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin:12px 0 16px}.academy-xp-stat{min-width:0;padding:9px 5px;border:1px solid #d4aa5870;border-radius:13px;background:#211008;color:#f8f0df;text-align:center}.academy-xp-stat b{display:block;color:#d4aa58;font-size:16px;line-height:1.1}.academy-xp-stat span{display:block;margin-top:4px;color:#d8c6ad;font-size:9px;text-transform:uppercase;letter-spacing:.04em}.academy-xp-level{grid-column:1/-1;padding:8px 10px;border:1px solid #d4aa5855;border-radius:11px;background:#08372d;color:#f8f0df;text-align:center;font-size:12px;text-transform:uppercase}';document.head.appendChild(s)}
  function html(){
    const p=window.StackupAcademyProgression?.snapshot();if(!p)return '';
    const next=p.nextXP?Math.max(0,p.nextXP-p.xp):0;
    return '<div class="academy-xp-panel" data-academy-xp-panel><div class="academy-xp-stat"><b>'+p.xp+'</b><span>XP</span></div><div class="academy-xp-stat"><b>'+p.mastery+'%</b><span>DOMÍNIO</span></div><div class="academy-xp-stat"><b>'+p.correct+'/'+p.attempts+'</b><span>ACERTOS</span></div><div class="academy-xp-level">'+p.level+(p.nextLevel?' · '+next+' XP PARA '+p.nextLevel:' · NÍVEL MÁXIMO')+'</div></div>';
  }
  function mount(){
    const lesson=document.querySelector('#root .card.lesson');if(!lesson||lesson.querySelector('[data-academy-xp-panel]'))return;
    const holder=document.createElement('div');holder.innerHTML=html();const panel=holder.firstElementChild;if(panel)lesson.insertBefore(panel,lesson.firstChild);
  }
  const root=document.getElementById('root');if(root)new MutationObserver(()=>queueMicrotask(mount)).observe(root,{childList:true});mount();
  window.addEventListener('stackup:xp',()=>{document.querySelectorAll('[data-academy-xp-panel]').forEach(x=>{const h=document.createElement('div');h.innerHTML=html();const n=h.firstElementChild;if(n)x.replaceWith(n)})});
})();