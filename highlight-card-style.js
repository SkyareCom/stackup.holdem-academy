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

      /* Proteção responsiva: nenhum card pode ampliar a viewport no mobile */
      html,body,.app,#root,.screen,.list,.card{
        max-width:100%!important;
      }
      html,body,.app,#root{
        overflow-x:hidden!important;
      }
      #root .card.topic{
        min-width:0!important;
        overflow:hidden!important;
      }
      #root .card.topic .tcopy{
        min-width:0!important;
        width:0!important;
      }
      #root .card.topic .ttitle,
      #root .card.topic .tnote{
        min-width:0!important;
        max-width:100%!important;
      }
      #root .card.topic .arrow,
      #root .card.topic .idx{
        flex:none!important;
      }

      /* PADRÃO DE TÍTULOS: 1 linha com reticências */
      #root .card.stage .stitle,
      #root .head > h2,
      #root .card.topic .ttitle,
      #root .card.lesson > h2{
        display:block!important;
        width:100%!important;
        max-width:100%!important;
        min-width:0!important;
        white-space:nowrap!important;
        overflow:hidden!important;
        text-overflow:ellipsis!important;
      }

      /* PRIMEIRA TELA: descrição com até 2 linhas e altura uniforme */
      #root .card.stage .desc{
        display:-webkit-box!important;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden!important;
        white-space:normal!important;
        width:100%!important;
        max-width:100%!important;
        height:2.84em!important;
        min-height:2.84em!important;
        max-height:2.84em!important;
      }

      /* SEGUNDA CAMADA: descrição com até 2 linhas */
      #root .head > p{
        display:-webkit-box!important;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden!important;
        white-space:normal!important;
        width:100%!important;
        max-width:100%!important;
        height:2.9em!important;
        min-height:2.9em!important;
        max-height:2.9em!important;
      }

      #root .card.topic .tnote{
        display:-webkit-box!important;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden!important;
        white-space:normal!important;
        width:100%!important;
        max-width:100%!important;
        height:2.7em!important;
        min-height:2.7em!important;
        max-height:2.7em!important;
      }

      /* TERCEIRA CAMADA, QUANDO EXISTIR: descrição com até 2 linhas.
         O conteúdo didático interno permanece completo. */
      #root .card.lesson > .lead{
        display:-webkit-box!important;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden!important;
        white-space:normal!important;
        width:100%!important;
        max-width:100%!important;
        height:3em!important;
        min-height:3em!important;
        max-height:3em!important;
      }

      @media(max-width:480px){
        #root .card.topic{
          gap:10px!important;
        }
        #root .card.topic .idx{
          width:38px!important;
          height:38px!important;
        }
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
      await load('./practice-table.js?v=2','practice-table.js');
      await load('./practice-advanced-bank.js?v=1','practice-advanced-bank.js');
      await load('./practice-advanced.js?v=2','practice-advanced.js');
      await load('./practice-math-odds.js?v=2','practice-math-odds.js');
      await load('./typography-standard.js?v=2','typography-standard.js');
      await load('./portuguese-corrections.js?v=1','portuguese-corrections.js');
    }catch(err){
      console.error('[STACKUP] Falha ao carregar módulos interativos.',err);
    }
  })();
})();