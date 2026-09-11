(() => {
  const STYLE_ID='stackup-highlight-card-style';
  if(!document.getElementById(STYLE_ID)){
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .bet-sequence,
      .strategy-example,
      .ct-tag,
      .profile-tag{
        border-radius:12px!important;
      }

      .ct-tag,
      .profile-tag{
        display:block!important;
        width:100%;
        max-width:100%;
        box-sizing:border-box;
        padding:9px 12px!important;
        line-height:1.3;
      }
    `;
    document.head.appendChild(style);
  }

  const hasScript=needle=>[...document.scripts].some(s=>(s.getAttribute('src')||'').includes(needle));
  const load=(src,needle)=>new Promise((resolve,reject)=>{
    if(hasScript(needle)) return resolve();
    const s=document.createElement('script');
    s.src=src;
    s.async=false;
    s.onload=resolve;
    s.onerror=reject;
    document.body.appendChild(s);
  });

  (async()=>{
    try{
      await load('./cover-layout.js?v=3','cover-layout.js');
      await load('./fundamentals-learning-flow.js?v=2','fundamentals-learning-flow.js');
      if(!window.StackupFundamentalsSpotBank){
        await load('./fundamentals-interactive-bank.js?v=1','fundamentals-interactive-bank.js');
      }
      await load('./fundamentals-visual-layer.js?v=2','fundamentals-visual-layer.js');
      await load('./fundamentals-interactive.js?v=3','fundamentals-interactive.js');
      await load('./fundamentals-progress-panel.js?v=1','fundamentals-progress-panel.js');
      await load('./modalities-module.js?v=1','modalities-module.js');
      await load('./modalities-depth-details.js?v=1','modalities-depth-details.js');
      await load('./mixed-games-module.js?v=2','mixed-games-module.js');
      await load('./practice-module.js?v=1','practice-module.js');
      await load('./typography-standard.js?v=1','typography-standard.js');
    }catch(err){
      console.error('[STACKUP] Falha ao carregar módulos interativos.',err);
    }
  })();
})();