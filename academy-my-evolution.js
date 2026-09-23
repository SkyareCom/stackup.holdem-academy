(() => {
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function addStyle(){if(document.getElementById('stackup-my-evolution-style'))return;const s=document.createElement('style');s.id='stackup-my-evolution-style';s.textContent=`
  .my-evolution{margin-top:16px;padding:16px;border:2px solid var(--gold);border-radius:20px;background:linear-gradient(180deg,#2f1a10,#211008);color:var(--w)}
  .my-evolution h3{margin:0;color:var(--gold);font-size:23px;text-transform:uppercase}.my-evolution .me-sub{margin:5px 0 14px;color:#cfbda7;font-size:13px;text-transform:uppercase}
  .me-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}.me-stat{padding:10px 4px;border:1px solid #d4aa5855;border-radius:12px;text-align:center;background:#2a160d}.me-stat b{display:block;color:#d4aa58;font-size:17px}.me-stat span{display:block;margin-top:4px;color:#d8c6ad;font-size:9px;text-transform:uppercase}
  .me-level{margin-top:8px;padding:10px;border:1px solid #d4aa5870;border-radius:12px;background:#08372d;text-align:center;text-transform:uppercase}.me-level strong{color:#d4aa58}
  .me-compare{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;margin-top:10px;padding:10px;border-radius:12px;background:#160b07}.me-period{text-align:center}.me-period b{display:block;color:#f8f0df;font-size:18px}.me-period span{font-size:9px;color:#cfbda7;text-transform:uppercase}.me-arrow{color:#d4aa58;font-size:20px}
  .me-areas{display:grid;gap:6px;margin-top:10px}.me-area{display:grid;grid-template-columns:1fr auto;gap:8px;padding:8px 10px;border:1px solid #d4aa5838;border-radius:10px;background:#2a160d;font-size:12px;text-transform:uppercase}.me-area b{color:#d4aa58}.me-empty{margin-top:10px;color:#cfbda7;font-size:12px;text-align:center}
  `;document.head.appendChild(s)}
  function render(){
    const p=window.StackupAcademyProgression?.snapshot();if(!p)return '';
    const delta=p.recent.mastery-p.previous.mastery,hasBaseline=p.previous.attempts>0,trend=!hasBaseline?'SEM BASE':delta>0?'▲ +'+delta+'%':delta<0?'▼ '+delta+'%':'—';
    const areas=p.areas.slice(0,6).map(a=>'<div class="me-area"><span>'+esc(a.name)+'</span><b>'+a.mastery+'% · '+a.xp+' XP</b></div>').join('');
    const next=p.nextXP?Math.max(0,p.nextXP-p.xp):0;
    return '<section class="my-evolution" data-my-evolution><h3>MINHA EVOLUÇÃO</h3><div class="me-sub">EU × EU MESMO</div><div class="me-grid"><div class="me-stat"><b>'+p.xp+'</b><span>XP TOTAL</span></div><div class="me-stat"><b>'+p.mastery+'%</b><span>DOMÍNIO</span></div><div class="me-stat"><b>'+p.correct+'/'+p.attempts+'</b><span>ACERTOS</span></div></div><div class="me-level"><strong>'+p.level+'</strong>'+(p.nextLevel?' · FALTAM '+next+' XP PARA '+p.nextLevel:' · NÍVEL MÁXIMO')+'</div><div class="me-compare"><div class="me-period"><b>'+(hasBaseline?p.previous.mastery+'%':'—')+'</b><span>PERÍODO ANTERIOR</span></div><div class="me-arrow">'+trend+'</div><div class="me-period"><b>'+p.recent.mastery+'%</b><span>ÚLTIMOS 7 DIAS</span></div></div>'+(areas?'<div class="me-areas">'+areas+'</div>':'<div class="me-empty">COMPLETE EXERCÍCIOS PARA CONSTRUIR SEU HISTÓRICO DE EVOLUÇÃO.</div>')+'</section>';
  }
  function mount(){addStyle();const lesson=document.querySelector('#root .card.lesson');if(!lesson)return;let old=lesson.querySelector('[data-my-evolution]');const h=document.createElement('div');h.innerHTML=render();const n=h.firstElementChild;if(!n)return;if(old)old.replaceWith(n);else lesson.appendChild(n)}
  const root=document.getElementById('root');if(root)new MutationObserver(()=>queueMicrotask(()=>{if(!document.querySelector('[data-my-evolution]'))mount()})).observe(root,{childList:true});
  window.addEventListener('stackup:xp',mount);mount();
})();