(() => {
  const STYLE_ID='stackup-fundamentals-progress-panel-style';

  function addStyle(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .fi-stats{
        display:grid!important;
        grid-template-columns:repeat(3,minmax(0,1fr))!important;
        gap:8px!important;
        width:100%!important;
        max-width:100%!important;
        min-width:0!important;
        box-sizing:border-box!important;
        margin:12px 0 16px!important;
        padding:0!important;
        overflow:visible!important;
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
      }
      .fi-stat{
        display:flex!important;
        flex-direction:column!important;
        align-items:center!important;
        justify-content:center!important;
        min-width:0!important;
        min-height:68px!important;
        padding:9px 4px!important;
        overflow:hidden!important;
        border:1px solid #d4aa5870!important;
        border-radius:14px!important;
        background:linear-gradient(180deg,#2f1a10,#211008)!important;
        text-align:center!important;
        box-sizing:border-box!important;
      }
      .fi-stat+.fi-stat{border-left:1px solid #d4aa5870!important}
      .fi-stat:last-child{background:linear-gradient(180deg,#195f4c,#08372d)!important;border-color:#d4aa58aa!important}
      .fi-stat .fi-stat-label{
        display:block!important;
        width:100%!important;
        margin:0 0 5px!important;
        color:#d8c6ad!important;
        font-size:clamp(8px,2.35vw,10px)!important;
        line-height:1.05!important;
        letter-spacing:.03em!important;
        text-transform:uppercase!important;
        white-space:normal!important;
        overflow-wrap:anywhere!important;
      }
      .fi-stat .fi-stat-value{
        display:block!important;
        width:100%!important;
        max-width:100%!important;
        color:var(--gold,#d4aa58)!important;
        font-size:clamp(12px,3.55vw,17px)!important;
        line-height:1.05!important;
        letter-spacing:-.035em!important;
        white-space:normal!important;
        overflow-wrap:anywhere!important;
        font-variant-numeric:tabular-nums!important;
      }
      @media(max-width:390px){
        .fi-stats{gap:6px!important;margin:10px 0 14px!important}
        .fi-stat{min-height:64px!important;padding:8px 2px!important}
        .fi-stat .fi-stat-label{font-size:clamp(8px,2.25vw,9px)!important;letter-spacing:.015em!important}
        .fi-stat .fi-stat-value{font-size:clamp(12px,3.45vw,14px)!important;letter-spacing:-.045em!important}
      }
      @media(max-width:340px){
        .fi-stats{gap:4px!important;margin:9px 0 13px!important}
        .fi-stat{padding-inline:1px!important}
        .fi-stat .fi-stat-label{font-size:8px!important}
        .fi-stat .fi-stat-value{font-size:12px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function placeOutsideTrainingCard(panel){
    if(!panel) return;
    const shell=panel.closest('.fi-shell');
    if(!shell) return;
    const lesson=shell.parentElement;
    if(!lesson?.matches('.card.lesson')) return;

    const previous=lesson.querySelector(':scope > .fi-stats[data-fi-progress-outside="1"]');
    if(previous && previous!==panel) previous.remove();

    panel.dataset.fiProgressOutside='1';
    lesson.insertBefore(panel,shell);
  }

  function normalize(panel){
    if(!panel) return;

    if(panel.dataset.unifiedProgress!=='1'){
      const stats=[...panel.querySelectorAll('.fi-stat')];
      if(stats.length!==3) return;

      const correctPct=(stats[0].querySelector('b')?.textContent||'0%').trim();
      const correctRaw=(stats[0].querySelector('small')?.textContent||'0/0').trim();
      const correct=correctRaw.split('/')[0]||'0';

      const realizedPct=(stats[1].querySelector('b')?.textContent||'0%').trim();
      const realizedRaw=(stats[1].querySelector('small')?.textContent||'0/50').trim();
      const realized=realizedRaw.split('/')[0]||'0';

      const total=(panel.dataset.fiTotal||stats[2].querySelector('small')?.textContent?.split('/')[1]||'50').trim();

      const values=[
        ['CERTOS',correct,correctPct],
        ['REALIZADOS',realized,realizedPct],
        ['TOTAL',total,'100%']
      ];

      stats.forEach((el,i)=>{
        const [label,qty,pct]=values[i];
        el.innerHTML=`<span class="fi-stat-label">${label}</span><strong class="fi-stat-value">${qty} · ${pct}</strong>`;
      });
      panel.dataset.unifiedProgress='1';
    }

    placeOutsideTrainingCard(panel);
  }

  function normalizeWithin(node){
    if(!(node instanceof Element)) return;
    if(node.matches('.fi-stats')) normalize(node);
    node.querySelectorAll?.('.fi-stats').forEach(normalize);
  }

  function apply(){
    addStyle();
    document.getElementById('root')?.querySelectorAll('.fi-stats').forEach(normalize);
  }

  const root=document.getElementById('root');
  if(root){
    const observer=new MutationObserver(records=>{
      for(const record of records){
        for(const node of record.addedNodes) normalizeWithin(node);
      }
    });
    observer.observe(root,{childList:true,subtree:true});
  }
  apply();
})();