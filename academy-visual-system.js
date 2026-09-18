(() => {
  const STYLE_ID='stackup-academy-visual-system';
  if(document.getElementById(STYLE_ID))return;

  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    :root{
      --academy-green:#0e4b3b;
      --academy-green-dark:#08372d;
      --academy-emerald:#195f4c;
      --academy-gold:#d4aa58;
      --academy-gold-dark:#a87c32;
      --academy-parchment:#f2ead8;
      --academy-parchment-2:#e7dcc2;
      --academy-brown:#211008;
      --academy-brown-2:#2a160d;
      --academy-ink:#25170f;
      --academy-muted:#725f4d;
      --academy-card-bg:linear-gradient(180deg,#f4ecd9 0%,#eee3cb 100%);
      --academy-card-bg-soft:linear-gradient(180deg,#ece1c7 0%,#e7dcc2 100%);
      --academy-card-border:#d4aa58cc;
      --academy-card-border-soft:#a87c3266;
      --academy-card-border-width:1.5px;
      --academy-card-radius:24px;
      --academy-inner-radius:16px;
      --academy-control-radius:12px;
      --academy-card-shadow:0 10px 26px #0000002b;
      --academy-card-gap:14px;
      --academy-card-padding:18px;
      --academy-inner-gap:10px;
      --academy-index-size:48px;
      --academy-arrow-size:24px;
      --academy-control-height:44px;
    }

    html,
    body{
      width:100%!important;
      max-width:100%!important;
      margin:0!important;
      overflow-x:hidden!important;
      background:var(--academy-brown)!important;
    }

    body{min-width:0!important}

    .app,
    #root,
    #root .screen,
    #root .list,
    #root .blocks,
    #root .ranking,
    #root .head,
    #root .intro,
    #root .card,
    #root .block,
    #root .rrow,
    #root .detail-card,
    #root .fi-shell,
    #root .fi-head,
    #root .fi-body,
    #root .fi-spot,
    #root .m2-grid,
    #root .m2-card,
    #root .m2-training,
    #root .m2-body,
    #root .m2-spot,
    #root .mg-theory,
    #root .mg-card,
    #root .mg-training,
    #root .mg-body,
    #root .mg-spot,
    #root .p3-shell,
    #root .p3x-shell,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group,
    #root .positions-visual,
    #root .positions-board,
    #root .p3x-live,
    #root .fv-wrap{
      min-width:0!important;
      max-width:100%!important;
      box-sizing:border-box!important;
    }

    .app{
      width:100%!important;
      overflow-x:hidden!important;
      background:var(--academy-brown)!important;
    }

    .brand{
      width:100%!important;
      max-width:100%!important;
      min-width:0!important;
      overflow:visible!important;
      background:linear-gradient(180deg,var(--academy-emerald),var(--academy-green) 58%,var(--academy-green-dark))!important;
      border-bottom-color:var(--academy-gold)!important;
      scroll-margin-top:0!important;
    }

    .brandin{
      display:flex!important;
      align-items:center!important;
      min-width:0!important;
      max-width:100%!important;
    }

    .brandin>div{min-width:0!important;max-width:100%!important;flex:1 1 auto!important}

    .brandin .logo[data-stackup-logo="1"]{
      display:block!important;
      width:80px!important;
      height:80px!important;
      max-width:80px!important;
      flex:0 0 80px!important;
      object-fit:contain!important;
      background:transparent!important;
    }

    .name,
    .sub{
      max-width:100%!important;
      white-space:normal!important;
      overflow:visible!important;
      text-overflow:clip!important;
      overflow-wrap:break-word!important;
      word-break:normal!important;
    }

    .navtools{
      width:100%!important;
      max-width:100%!important;
      min-width:0!important;
      box-sizing:border-box!important;
    }

    .navbtn,
    button,
    input,
    select,
    textarea{
      min-width:0!important;
      max-width:100%!important;
      box-sizing:border-box!important;
    }

    input,
    select,
    textarea{
      font-size:16px!important;
    }

    img,
    svg,
    canvas,
    video{
      max-width:100%!important;
      height:auto;
    }

    #root .screen{
      width:100%!important;
      padding-left:18px!important;
      padding-right:18px!important;
    }

    #root .list,
    #root .blocks,
    #root .ranking,
    #root .m2-grid,
    #root .mg-theory,
    #root .p3x-math-grid{
      display:grid!important;
      width:100%!important;
      gap:var(--academy-card-gap)!important;
    }

    #root .card.stage,
    #root .card.topic,
    #root .card.lesson,
    #root .block,
    #root .rrow,
    #root .m2-card,
    #root .mg-card,
    #root .detail-card{
      border-width:var(--academy-card-border-width)!important;
      border-style:solid!important;
      border-radius:var(--academy-card-radius)!important;
      box-shadow:var(--academy-card-shadow)!important;
      box-sizing:border-box!important;
    }

    #root .card.stage,
    #root .card.topic,
    #root .card.lesson{
      width:100%!important;
      border-color:var(--academy-card-border)!important;
      background:var(--academy-card-bg)!important;
      color:var(--academy-ink)!important;
    }

    #root .card.stage,
    #root .card.lesson{
      padding:var(--academy-card-padding)!important;
    }

    #root .card.topic{
      display:flex!important;
      align-items:center!important;
      gap:var(--academy-card-gap)!important;
      min-height:96px!important;
      padding:var(--academy-card-padding)!important;
      overflow:hidden!important;
    }

    #root .block,
    #root .rrow,
    #root .m2-card,
    #root .mg-card,
    #root .detail-card{
      border-color:var(--academy-card-border-soft)!important;
      background:var(--academy-card-bg-soft)!important;
      padding:var(--academy-card-padding)!important;
    }

    #root .card.topic .idx{
      width:var(--academy-index-size)!important;
      height:var(--academy-index-size)!important;
      min-width:var(--academy-index-size)!important;
      flex:0 0 var(--academy-index-size)!important;
      display:grid!important;
      place-items:center!important;
      margin:0!important;
      padding:0!important;
      border-radius:14px!important;
      background:var(--academy-brown)!important;
      color:var(--academy-gold)!important;
      text-align:center!important;
      line-height:1!important;
    }

    #root .card.topic .tcopy{
      flex:1 1 auto!important;
      width:auto!important;
      min-width:0!important;
      max-width:100%!important;
      display:flex!important;
      flex-direction:column!important;
      justify-content:center!important;
      gap:4px!important;
      overflow:visible!important;
    }

    #root .card.topic .arrow{
      width:var(--academy-arrow-size)!important;
      min-width:var(--academy-arrow-size)!important;
      flex:0 0 var(--academy-arrow-size)!important;
      display:grid!important;
      place-items:center!important;
      align-self:center!important;
      margin:0!important;
      padding:0!important;
      color:var(--academy-gold-dark)!important;
      font-size:28px!important;
      line-height:1!important;
      text-align:center!important;
    }

    #root .card.stage .stitle,
    #root .card.stage .desc,
    #root .head h2,
    #root .head p,
    #root .card.topic .ttitle,
    #root .card.topic .tnote,
    #root .card.lesson h2,
    #root .card.lesson h3,
    #root .card.lesson h4,
    #root .card.lesson p,
    #root .card.lesson li,
    #root .block h3,
    #root .block p,
    #root .detail-card h3,
    #root .detail-card p,
    #root .m2-card h3,
    #root .m2-card p,
    #root .mg-card h3,
    #root .mg-card p{
      max-width:100%!important;
      white-space:normal!important;
      overflow:visible!important;
      text-overflow:clip!important;
      overflow-wrap:break-word!important;
      word-break:normal!important;
      -webkit-line-clamp:unset!important;
      -webkit-box-orient:initial!important;
    }

    #root .card.topic .ttitle,
    #root .card.topic .tnote{
      display:block!important;
      width:100%!important;
      height:auto!important;
      min-height:0!important;
      max-height:none!important;
      margin:0!important;
      padding:0!important;
    }

    #root .card.topic .ttitle{line-height:1.16!important}
    #root .card.topic .tnote{margin-top:4px!important;line-height:1.34!important}

    #root .block h3,
    #root .detail-card h3,
    #root .m2-card h3,
    #root .mg-card h3{margin-top:0!important}

    /* One spacing and sizing contract for interactive training shells. */
    #root .fi-shell,
    #root .m2-training,
    #root .mg-training,
    #root .p3-shell,
    #root .p3x-panel{
      width:100%!important;
      margin-top:18px!important;
      border-radius:20px!important;
      box-sizing:border-box!important;
    }

    #root .fi-head,
    #root .m2-head,
    #root .mg-head{
      padding:16px!important;
    }

    #root .fi-body,
    #root .m2-body,
    #root .mg-body{
      padding:14px!important;
    }

    #root .fi-spot,
    #root .m2-spot,
    #root .mg-spot{
      width:100%!important;
      min-width:0!important;
      max-width:100%!important;
      border-radius:var(--academy-inner-radius)!important;
      box-sizing:border-box!important;
    }

    #root .mg-spot{padding:14px!important}

    #root .fi-spotbar,
    #root .m2-spotbar,
    #root .mg-spotbar{
      display:flex!important;
      align-items:center!important;
      justify-content:space-between!important;
      flex-wrap:wrap!important;
      gap:8px!important;
      min-width:0!important;
      max-width:100%!important;
    }

    #root .fi-spotbar span,
    #root .m2-spotbar span,
    #root .mg-spotbar span,
    #root .fi-type,
    #root .m2-type,
    #root .mg-type{
      min-width:0!important;
      max-width:100%!important;
      white-space:normal!important;
      overflow-wrap:anywhere!important;
    }

    #root .fi-question,
    #root .m2-question,
    #root .mg-question,
    #root .p3-q,
    #root .p3x-question,
    #root .p3x-context,
    #root .p3-result,
    #root .p3-output,
    #root .p3-note,
    #root .p3x-feedback,
    #root .m2-analysis,
    #root .mg-feedback,
    #root .fi-analysis{
      min-width:0!important;
      max-width:100%!important;
      white-space:normal!important;
      overflow-wrap:break-word!important;
      word-break:normal!important;
    }

    #root .fi-options,
    #root .m2-options,
    #root .mg-options,
    #root .p3-options,
    #root .p3x-options{
      display:grid!important;
      grid-template-columns:minmax(0,1fr)!important;
      gap:8px!important;
      width:100%!important;
      min-width:0!important;
    }

    #root .fi-option,
    #root .m2-option,
    #root .mg-option,
    #root .p3-option,
    #root .p3x-opt,
    #root .fi-btn,
    #root .m2-btn,
    #root .mg-btn,
    #root .p3-btn,
    #root .p3x-btn,
    #root .p3-calc,
    #root .p3x-filter-btn{
      min-width:0!important;
      max-width:100%!important;
      min-height:var(--academy-control-height)!important;
      box-sizing:border-box!important;
      border-radius:var(--academy-control-radius)!important;
      white-space:normal!important;
      overflow-wrap:anywhere!important;
      word-break:normal!important;
    }

    #root .fi-nav,
    #root .m2-nav,
    #root .mg-nav,
    #root .p3-actions,
    #root .p3x-nav{
      display:grid!important;
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      gap:8px!important;
      width:100%!important;
      min-width:0!important;
    }

    /* Progress is always inside its content card and follows one 3-card system. */
    #root .fi-stats,
    #root .m2-stats,
    #root .mg-stats,
    #root .p3-progress,
    #root .p3x-counter{
      position:static!important;
      display:grid!important;
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      gap:8px!important;
      width:100%!important;
      min-width:0!important;
      max-width:100%!important;
      margin:12px 0 16px!important;
      padding:0!important;
      border:0!important;
      border-radius:0!important;
      background:transparent!important;
      box-shadow:none!important;
      overflow:visible!important;
    }

    #root .m2-stats,
    #root .mg-stats{margin-left:0!important;margin-right:0!important}

    #root .fi-stat,
    #root .m2-stat,
    #root .mg-stat,
    #root .p3-stat{
      display:flex!important;
      flex-direction:column!important;
      align-items:center!important;
      justify-content:center!important;
      min-width:0!important;
      min-height:78px!important;
      padding:9px 5px!important;
      border:var(--academy-card-border-width) solid #d4aa5870!important;
      border-radius:14px!important;
      background:linear-gradient(180deg,#2f1a10 0%,var(--academy-brown) 100%)!important;
      color:#f8f0df!important;
      text-align:center!important;
      box-shadow:0 5px 12px #00000030!important;
      box-sizing:border-box!important;
    }

    #root .fi-stat+.fi-stat,
    #root .m2-stat+.m2-stat,
    #root .mg-stat+.mg-stat{
      border-left:var(--academy-card-border-width) solid #d4aa5870!important;
    }

    #root .fi-stat:last-child,
    #root .m2-stat:last-child,
    #root .mg-stat:last-child,
    #root .p3-stat:last-child{
      background:linear-gradient(180deg,var(--academy-emerald) 0%,var(--academy-green-dark) 100%)!important;
      border-color:#d4aa58aa!important;
    }

    #root .fi-stat span,
    #root .fi-stat .fi-stat-label,
    #root .m2-stat span,
    #root .mg-stat span,
    #root .p3-stat span{
      display:block!important;
      order:1!important;
      width:100%!important;
      margin:0 0 6px!important;
      color:#d8c6ad!important;
      line-height:1.08!important;
      letter-spacing:.035em!important;
      text-transform:uppercase!important;
      white-space:normal!important;
      overflow-wrap:anywhere!important;
      text-align:center!important;
    }

    #root .fi-stat b,
    #root .fi-stat strong,
    #root .fi-stat .fi-stat-value,
    #root .m2-stat strong,
    #root .mg-stat strong,
    #root .p3-stat b{
      display:block!important;
      order:2!important;
      width:100%!important;
      margin:0!important;
      color:var(--academy-gold)!important;
      line-height:1.08!important;
      font-weight:700!important;
      white-space:normal!important;
      overflow-wrap:anywhere!important;
      text-align:center!important;
      font-variant-numeric:tabular-nums!important;
    }

    #root .fi-stat small{
      display:block!important;
      order:3!important;
      width:100%!important;
      margin-top:4px!important;
      color:#b9a58d!important;
      line-height:1.1!important;
      white-space:normal!important;
    }

    /* Forms and calculator fields. */
    #root .p3-form{
      display:grid!important;
      grid-template-columns:repeat(2,minmax(0,1fr))!important;
      gap:8px!important;
      width:100%!important;
    }

    #root .p3-input,
    #root input,
    #root select,
    #root textarea{
      width:100%!important;
      min-width:0!important;
      max-width:100%!important;
      min-height:var(--academy-control-height)!important;
      box-sizing:border-box!important;
      border-radius:10px!important;
    }

    #root .p3-math-grid,
    #root .p3x-math-grid,
    #root .p3m-odds{
      width:100%!important;
      min-width:0!important;
      max-width:100%!important;
      gap:var(--academy-card-gap)!important;
    }

    #root .p3-math-card,
    #root .p3x-math-card,
    #root .p3m-group{
      width:100%!important;
      min-width:0!important;
      max-width:100%!important;
      padding:var(--academy-card-padding)!important;
      border-radius:var(--academy-inner-radius)!important;
      box-sizing:border-box!important;
      overflow:visible!important;
    }

    #root .p3-math-card h4,
    #root .p3x-math-card h3,
    #root .p3x-math-card p,
    #root .p3x-math-card .formula,
    #root .p3x-tip{
      max-width:100%!important;
      white-space:normal!important;
      overflow-wrap:break-word!important;
      word-break:normal!important;
    }

    /* Simulator filters, metadata and live table. */
    #root .p3x-sim-filters{
      display:grid!important;
      grid-template-columns:repeat(5,minmax(0,1fr))!important;
      gap:6px!important;
      width:100%!important;
      min-width:0!important;
    }

    #root .p3x-filter-btn{
      width:100%!important;
      padding-left:3px!important;
      padding-right:3px!important;
      font-size:clamp(10px,3vw,12px)!important;
    }

    #root .p3x-info{
      display:grid!important;
      grid-template-columns:repeat(4,minmax(0,1fr))!important;
      gap:6px!important;
      width:100%!important;
      max-width:500px!important;
      min-width:0!important;
    }

    #root .p3x-info>div,
    #root .p3x-hand{
      min-width:0!important;
      max-width:100%!important;
      box-sizing:border-box!important;
    }

    #root .p3x-info small,
    #root .p3x-info b,
    #root .p3x-hand strong,
    #root .p3x-seat-stack,
    #root .p3x-phase,
    #root .p3x-pot{
      max-width:100%!important;
      white-space:normal!important;
      overflow-wrap:anywhere!important;
    }

    #root .positions-board,
    #root .p3x-live .positions-board{
      width:100%!important;
      max-width:100%!important;
      min-width:0!important;
      box-sizing:border-box!important;
      overflow:hidden!important;
      isolation:isolate!important;
    }

    #root .seat,
    #root .seat-label,
    #root .p3x-seat-stack{
      box-sizing:border-box!important;
    }

    #root .seat-label{
      max-width:78px!important;
    }

    #root .p3x-board,
    #root .p3x-cards,
    #root .hand,
    #root .board-cards{
      min-width:0!important;
      max-width:100%!important;
      flex-wrap:wrap!important;
    }

    /* Fundamental visual exercises. */
    #root .fv-wrap{
      width:auto!important;
      margin-left:12px!important;
      margin-right:12px!important;
      overflow:hidden!important;
    }

    #root .fv-cards{
      display:flex!important;
      justify-content:center!important;
      flex-wrap:wrap!important;
      min-width:0!important;
      max-width:100%!important;
    }

    #root .fv-card{
      flex:0 0 auto!important;
      max-width:100%!important;
    }

    #root .fv-compare{
      display:grid!important;
      grid-template-columns:repeat(2,minmax(0,1fr))!important;
      gap:8px!important;
      min-width:0!important;
      max-width:100%!important;
    }

    #root .fv-handbox,
    #root .fv-position-board,
    #root .fv-row,
    #root .fv-format,
    #root .fv-formatline{
      min-width:0!important;
      max-width:100%!important;
      box-sizing:border-box!important;
    }

    #root .fv-row,
    #root .fv-formatline{
      flex-wrap:wrap!important;
    }

    #root .fv-steps,
    #root .m2-flow{
      display:flex!important;
      flex-wrap:wrap!important;
      gap:6px!important;
      width:100%!important;
      max-width:100%!important;
      overflow:visible!important;
    }

    #root .fv-step,
    #root .m2-chip{
      flex:1 1 78px!important;
      min-width:0!important;
      max-width:100%!important;
      box-sizing:border-box!important;
      white-space:normal!important;
      overflow-wrap:anywhere!important;
    }

    #root .fv-stats,
    #root .mg-visual{
      display:grid!important;
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      gap:6px!important;
      min-width:0!important;
      max-width:100%!important;
    }

    #root .fv-metric,
    #root .mg-vcell{
      min-width:0!important;
      max-width:100%!important;
      box-sizing:border-box!important;
      white-space:normal!important;
      overflow-wrap:anywhere!important;
    }

    #root .m2-cards{
      min-width:0!important;
      max-width:100%!important;
      flex-wrap:wrap!important;
    }

    #root .badge,
    #root .p3x-badge,
    #root .fi-type,
    #root .m2-type,
    #root .mg-type,
    #root .p3x-phase{
      max-width:100%!important;
      border-radius:999px!important;
      letter-spacing:.05em!important;
      white-space:normal!important;
      overflow-wrap:anywhere!important;
    }

    @media(max-width:420px){
      :root{
        --academy-card-padding:16px;
        --academy-card-gap:12px;
        --academy-index-size:46px;
      }

      .brand{
        padding-left:16px!important;
        padding-right:16px!important;
      }

      .brandin{gap:12px!important}

      .brandin .logo[data-stackup-logo="1"]{
        width:74px!important;
        height:74px!important;
        max-width:74px!important;
        flex-basis:74px!important;
      }

      #root .screen{
        padding-left:14px!important;
        padding-right:14px!important;
      }

      #root .card.topic{min-height:92px!important}
      #root .card.topic .arrow{font-size:26px!important}

      #root .fi-stats,
      #root .m2-stats,
      #root .mg-stats,
      #root .p3-progress,
      #root .p3x-counter{gap:6px!important}

      #root .fi-stat,
      #root .m2-stat,
      #root .mg-stat,
      #root .p3-stat{
        min-height:74px!important;
        padding:8px 4px!important;
      }

      #root .p3x-info{grid-template-columns:repeat(2,minmax(0,1fr))!important}
      #root .fv-compare{grid-template-columns:minmax(0,1fr)!important}

      #root .fi-nav,
      #root .m2-nav,
      #root .mg-nav,
      #root .p3-actions,
      #root .p3x-nav{
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
      }

      #root .fi-nav>*:last-child,
      #root .m2-nav>*:last-child,
      #root .mg-nav>*:last-child,
      #root .p3-actions>*:last-child,
      #root .p3x-nav>*:last-child{
        grid-column:1/-1!important;
      }
    }

    @media(max-width:390px){
      #root .p3-form{grid-template-columns:minmax(0,1fr)!important}
      #root .p3x-hands{grid-template-columns:minmax(0,1fr)!important}
      #root .mg-visual{grid-template-columns:minmax(0,1fr)!important}
      #root .mg-vcell{text-align:left!important}
    }

    @media(max-width:350px){
      :root{
        --academy-card-padding:14px;
        --academy-index-size:42px;
        --academy-card-gap:10px;
      }

      .brand{
        padding-left:12px!important;
        padding-right:12px!important;
      }

      .brandin{gap:10px!important}

      .brandin .logo[data-stackup-logo="1"]{
        width:66px!important;
        height:66px!important;
        max-width:66px!important;
        flex-basis:66px!important;
      }

      #root .screen{
        padding-left:12px!important;
        padding-right:12px!important;
      }

      #root .card.topic{min-height:88px!important}

      #root .fi-stat,
      #root .m2-stat,
      #root .mg-stat,
      #root .p3-stat{
        min-height:70px!important;
        padding-left:2px!important;
        padding-right:2px!important;
      }

      #root .fi-stat span,
      #root .m2-stat span,
      #root .mg-stat span,
      #root .p3-stat span{
        font-size:9px!important;
        letter-spacing:0!important;
      }

      #root .fi-stat b,
      #root .fi-stat strong,
      #root .m2-stat strong,
      #root .mg-stat strong,
      #root .p3-stat b{
        font-size:12px!important;
      }

      #root .p3x-sim-filters{
        grid-template-columns:repeat(3,minmax(0,1fr))!important;
      }
    }
  `;

  document.head.appendChild(style);
})();
