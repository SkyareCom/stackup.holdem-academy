(() => {
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const SECTION_ORDER=['FUNDAMENTOS','MODALIDADES','SIM','QUIZ','MATH'];
  const SECTION_LABEL={FUNDAMENTOS:'FUNDAMENTOS',MODALIDADES:'MODALIDADES',SIM:'SIMULADOR',QUIZ:'QUIZ',MATH:'MATEMÁTICA'};
  const SECTION_TOTAL={FUNDAMENTOS:700,MODALIDADES:400,SIM:250,QUIZ:50,MATH:100};
  function addStyle(){if(document.getElementById('stackup-my-evolution-style'))return;const s=document.createElement('style');s.id='stackup-my-evolution-style';s.textContent=`
  .my-evolution{margin-top:16px;padding:16px;border:2px solid var(--gold);border-radius:20px;background:linear-gradient(180deg,#2f1a10,#211008);color:var(--w);min-width:0;max-width:100%;overflow:hidden}
  .my-evolution h3{margin:0;color:var(--gold);font-size:clamp(20px,6vw,23px);line-height:1.15;text-transform:uppercase}.my-evolution .me-sub{margin:6px 0 14px;color:#cfbda7;font-size:12px;line-height:1.35;text-transform:uppercase}
  .me-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}.me-stat{min-width:0;padding:10px 4px;border:1px solid #d4aa5855;border-radius:12px;text-align:center;background:#2a160d}.me-stat b{display:block;color:#d4aa58;font-size:clamp(15px,4.6vw,18px);line-height:1.1;overflow-wrap:anywhere}.me-stat span{display:block;margin-top:5px;color:#d8c6ad;font-size:9px;line-height:1.25;text-transform:uppercase;overflow-wrap:anywhere}
  .me-level{margin-top:9px;padding:11px 9px;border:1px solid #d4aa5870;border-radius:12px;background:#08372d;text-align:center;line-height:1.4;text-transform:uppercase;overflow-wrap:anywhere}.me-level strong{color:#d4aa58}
  .me-compare{display:grid;grid-template-columns:minmax(0,1fr) minmax(74px,auto) minmax(0,1fr);align-items:center;gap:7px;margin-top:10px;padding:10px 8px;border-radius:12px;background:#160b07}.me-period{min-width:0;text-align:center}.me-period b{display:block;color:#f8f0df;font-size:18px}.me-period span{display:block;font-size:9px;line-height:1.35;color:#cfbda7;text-transform:uppercase;overflow-wrap:anywhere}.me-arrow{min-width:0;color:#d4aa58;font-size:clamp(12px,3.6vw,16px);line-height:1.2;text-align:center;overflow-wrap:anywhere}
  .me-section-title{margin:16px 0 8px;color:#d4aa58;font-size:14px;line-height:1.3;text-transform:uppercase}.me-areas{display:grid;gap:8px}.me-area{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;padding:10px;border:1px solid #d4aa5838;border-radius:10px;background:#2a160d;font-size:11px;line-height:1.35;text-transform:uppercase}.me-area>span{min-width:0;overflow-wrap:anywhere}.me-area b{color:#d4aa58;text-align:right;white-space:normal}.me-area-detail{display:block;margin-top:3px;color:#cfbda7;font-size:9px;line-height:1.3}
  .me-empty{margin-top:10px;color:#cfbda7;font-size:12px;line-height:1.45;text-align:center}.me-reset{width:100%;min-height:46px;margin-top:16px;padding:10px 12px;border:1px solid #d4aa58;border-radius:12px;background:#160b07;color:#d4aa58;font:inherit;font-size:12px;line-height:1.3;text-transform:uppercase;cursor:pointer;white-space:normal}.me-reset-confirm{margin-top:8px;color:#cfbda7;font-size:10px;line-height:1.4;text-align:center}
  @media(max-width:380px){.my-evolution{padding:13px}.me-grid{gap:5px}.me-stat{padding:9px 2px}.me-compare{grid-template-columns:minmax(0,1fr);gap:9px}.me-arrow{padding:5px 0;border-top:1px solid #d4aa5838;border-bottom:1px solid #d4aa5838}.me-area{grid-template-columns:minmax(0,1fr);gap:5px}.me-area b{text-align:left}}
  `;document.head.appendChild(s)}
  function sectionRows(p){
    const map=Object.fromEntries((p.areas||[]).map(a=>[String(a.name).toUpperCase(),a]));
    const extra=(p.areas||[]).filter(a=>!SECTION_ORDER.includes(String(a.name).toUpperCase())).map(a=>String(a.name).toUpperCase());
    return [...SECTION_ORDER,...extra].map(key=>{
      const a=map[key]||{attempts:0,correct:0,xp:0,mastery:0};
      const total=SECTION_TOTAL[key];
      const totalText=total?total+' PERGUNTAS':'BANCO INTERATIVO';
      return '<div class="me-area"><span>'+esc(SECTION_LABEL[key]||key)+'<small class="me-area-detail">'+totalText+' · '+a.attempts+' RESPONDIDAS</small></span><b>'+a.correct+'/'+a.attempts+' ACERTOS · '+a.mastery+'% · '+a.xp+' XP</b></div>';
    }).join('');
  }
  function render(){
    const p=window.StackupAcademyProgression?.snapshot();if(!p)return '';
    const delta=p.recent.mastery-p.previous.mastery,hasBaseline=p.previous.attempts>0,trend=!hasBaseline?'SEM BASE':delta>0?'▲ +'+delta+'%':delta<0?'▼ '+delta+'%':'—';
    const next=p.nextXP?Math.max(0,p.nextXP-p.xp):0;
    return '<section class="my-evolution" data-my-evolution><h3>MINHA EVOLUÇÃO</h3><div class="me-sub">EU HERÓI × EU VILÃO</div><div class="me-grid"><div class="me-stat"><b>'+p.xp+'</b><span>XP TOTAL</span></div><div class="me-stat"><b>'+p.mastery+'%</b><span>DOMÍNIO</span></div><div class="me-stat"><b>'+p.correct+'/'+p.attempts+'</b><span>ACERTOS</span></div></div><div class="me-level"><strong>'+p.level+'</strong>'+(p.nextLevel?' · FALTAM '+next+' XP PARA '+p.nextLevel:' · NÍVEL MÁXIMO')+'</div><div class="me-compare"><div class="me-period"><b>'+(hasBaseline?p.previous.mastery+'%':'—')+'</b><span>EU VILÃO · PERÍODO ANTERIOR</span></div><div class="me-arrow">'+trend+'</div><div class="me-period"><b>'+p.recent.mastery+'%</b><span>EU HERÓI · ÚLTIMOS 7 DIAS</span></div></div><h4 class="me-section-title">DESEMPENHO POR SEÇÃO</h4><div class="me-areas">'+sectionRows(p)+'</div><button class="me-reset" type="button" data-reset-history>APAGAR HISTÓRICO E ZERAR AVALIAÇÃO</button><div class="me-reset-confirm">APAGA XP, ACERTOS, TENTATIVAS, DOMÍNIO E HISTÓRICO DE EVOLUÇÃO DESTE DISPOSITIVO.</div></section>';
  }
  function mountPage(){addStyle();const host=document.querySelector('[data-evolution-page]');if(!host)return;host.innerHTML=render();const btn=host.querySelector('[data-reset-history]');if(btn)btn.onclick=()=>{if(!confirm('APAGAR TODO O HISTÓRICO DE EVOLUÇÃO E ZERAR A AVALIAÇÃO?'))return;window.StackupAcademyProgression?.reset?.();mountPage();};}
  const root=document.getElementById('root');if(root)new MutationObserver(()=>queueMicrotask(mountPage)).observe(root,{childList:true,subtree:true});
  window.addEventListener('stackup:xp',mountPage);window.addEventListener('stackup:progress-reset',mountPage);window.StackupMyEvolution={mountPage,render};mountPage();
})();