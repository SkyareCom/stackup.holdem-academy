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
        gap:0!important;
        margin:11px 12px!important;
        padding:0!important;
        overflow:hidden!important;
        border:1px solid #d4aa5860!important;
        border-radius:14px!important;
        background:#2a160d!important;
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
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
        text-align:center!important;
      }
      .fi-stat+.fi-stat{border-left:1px solid #d4aa5840!important}
      .fi-stat .fi-stat-label{
        display:block!important;
        width:100%!important;
        margin:0 0 5px!important;
        color:#d8c6ad!important;
        font-size:clamp(8px,2.35vw,10px)!important;
        line-height:1.05!important;
        letter-spacing:.03em!important;
        text-transform:uppercase!important;
        white-space:nowrap!important;
      }
      .fi-stat .fi-stat-value{
        display:block!important;
        width:100%!important;
        max-width:100%!important;
        color:var(--gold,#d4aa58)!important;
        font-size:clamp(12px,3.55vw,17px)!important;
        line-height:1.05!important;
        letter-spacing:-.035em!important;
        white-space:nowrap!important;
        font-variant-numeric:tabular-nums!important;
      }
      @media(max-width:390px){
        .fi-stats{margin:10px 8px!important}
        .fi-stat{min-height:64px!important;padding:8px 2px!important}
        .fi-stat .fi-stat-label{font-size:clamp(8px,2.25vw,9px)!important;letter-spacing:.015em!important}
        .fi-stat .fi-stat-value{font-size:clamp(12px,3.45vw,14px)!important;letter-spacing:-.045em!important}
      }
      @media(max-width:340px){
        .fi-stats{margin:9px 6px!important}
        .fi-stat{padding-inline:1px!important}
        .fi-stat .fi-stat-label{font-size:8px!important}
        .fi-stat .fi-stat-value{font-size:12px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function normalize(panel){
    if(!panel || panel.dataset.unifiedProgress==='1') return;
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