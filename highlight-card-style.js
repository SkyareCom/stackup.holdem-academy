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

      html,body,.app,#root,.screen,.list,.card{
        max-width:100%!important;
      }
      html,body,.app,#root{
        overflow-x:hidden!important;
      }
      button,.navbtn,.card{
        touch-action:manipulation;
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

      #root .card.stage .stitle,
      #root .head > h2,
      #root .card.topic .ttitle{
        display:block!important;
        width:100%!important;
        max-width:100%!important;
        min-width:0!important;
        white-space:nowrap!important;
        overflow:hidden!important;
        text-overflow:ellipsis!important;
      }

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

      #root .card.lesson > h2,
      #root .card.lesson h3,
      #root .card.lesson h4{
        display:block!important;
        width:100%!important;
        max-width:100%!important;
        min-width:0!important;
        white-space:normal!important;
        overflow:visible!important;
        text-overflow:clip!important;
        overflow-wrap:anywhere!important;
        word-break:normal!important;
        height:auto!important;
        min-height:0!important;
        max-height:none!important;
      }

      #root .card.lesson > h2{
        line-height:1.05!important;
      }

      #root .card.lesson > .lead{
        display:-webkit-box!important;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden!important;
        white-space:normal!important;
        width:100%!important;
        max-width:100%!important;
        line-height:1.5!important;
        height:3em!important;
        min-height:3em!important;
        max-height:3em!important;
      }

      #root .card.lesson .blocks .block{
        min-width:0!important;
        overflow:hidden!important;
      }

      #root .card.lesson .blocks .block > h3{
        line-height:1.15!important;
      }

      #root .card.lesson .blocks .block > p{
        display:-webkit-box!important;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden!important;
        white-space:normal!important;
        width:100%!important;
        max-width:100%!important;
        line-height:1.5!important;
        height:3em!important;
        min-height:3em!important;
        max-height:3em!important;
      }

      @media(max-width:700px){
        #root .card.topic,
        #root .card.lesson .block,
        #root .rrow,
        #root .m2-card{
          content-visibility:auto;
          contain-intrinsic-size:auto 96px;
        }
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

  if(navigator.serviceWorker?.controller)return;

  const hasScript=needle=>[...document.scripts].some(s=>(s.getAttribute('src')||'').includes(needle));
  const load=(src,needle)=>new Promise((resolve,reject)=>{
    if(hasScript(needle))return resolve();
    const s=document.createElement('script');
    s.src=src;
    s.async=false;
    s.onload=resolve;
    s.onerror=reject;
    document.body.appendChild(s);
  });

  (async()=>{
    try{
      await load('./cover-layout.js?v=10','cover-layout.js');
      await load('./fundamentals-learning-flow.js?v=3','fundamentals-learning-flow.js');
      await load('./typography-standard.js?v=2','typography-standard.js');
      await load('./portuguese-corrections.js?v=3','portuguese-corrections.js');
      await load('./academy-loader.js?v=10','academy-loader.js');
    }catch(err){
      console.error('[STACKUP] Core module load failed.',err);
    }
  })();
})();