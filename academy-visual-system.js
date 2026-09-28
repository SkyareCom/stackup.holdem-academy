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
      --academy-card-shadow:0 10px 26px #0000002b;
      --academy-card-gap:14px;
      --academy-card-padding:18px;
      --academy-index-size:48px;
      --academy-arrow-size:24px;
    }

    html,
    body{
      width:100%!important;
      max-width:100%!important;
      overflow-x:hidden!important;
      background:var(--academy-brown)!important;
    }

    body{
      min-width:0!important;
    }

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
    #root .p3-shell,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group,
    #root .fi-spot{
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

    .brandin,
    .brandin>div{
      min-width:0!important;
      max-width:100%!important;
    }

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
      min-width:0;
      max-width:100%;
      box-sizing:border-box;
    }

    img,
    svg,
    canvas,
    video{
      max-width:100%;
      height:auto;
    }

    #root .card.stage,
    #root .card.topic,
    #root .card.lesson,
    #root .block,
    #root .rrow,
    #root .m2-card,
    #root .p3-shell,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group,
    #root .fi-spot,
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
    }

    #root .block,
    #root .rrow,
    #root .m2-card,
    #root .p3-shell,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group,
    #root .fi-spot,
    #root .detail-card{
      border-color:var(--academy-card-border-soft)!important;
      background-color:var(--academy-parchment-2)!important;
    }

    #root .block,
    #root .rrow,
    #root .m2-card,
    #root .p3-shell,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group,
    #root .detail-card{
      padding:var(--academy-card-padding)!important;
    }

    #root .list{
      display:grid!important;
      gap:var(--academy-card-gap)!important;
      width:100%!important;
    }

    #root .blocks,
    #root .ranking,
    #root .p3x-math-grid,
    #root .p3m-odds{
      gap:var(--academy-card-gap)!important;
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
      min-width:0!important;
      max-width:100%!important;
      display:flex!important;
      flex-direction:column!important;
      justify-content:center!important;
      gap:4px!important;
      overflow:visible!important;
    }

    #root .card.topic .ttitle,
    #root .card.topic .tnote,
    #root .stitle,
    #root .desc,
    #root .head h2,
    #root .head p,
    #root .card.lesson h2,
    #root .card.lesson h3,
    #root .card.lesson h4,
    #root .card.lesson p,
    #root .card.lesson li,
    #root .block h3,
    #root .block p,
    #root .detail-card h3,
    #root .detail-card p{
      max-width:100%!important;
      white-space:normal!important;
      overflow:visible!important;
      text-overflow:clip!important;
      overflow-wrap:break-word!important;
      word-break:normal!important;
      -webkit-line-clamp:unset!important;
      -webkit-box-orient:initial!important;
    }

    #root .card.topic .ttitle{
      display:block!important;
      width:100%!important;
      margin:0!important;
      padding:0!important;
      line-height:1.16!important;
    }

    #root .card.topic .tnote{
      display:block!important;
      width:100%!important;
      margin:4px 0 0!important;
      line-height:1.34!important;
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

    #root .block h3,
    #root .detail-card h3{
      margin-top:0!important;
    }

    #root .hand,
    #root .fv-hand,
    #root .fv-cards,
    #root .board-cards{
      min-width:0!important;
      max-width:100%!important;
      flex-wrap:wrap!important;
    }

    #root .badge,
    #root .p3x-badge,
    #root .fi-type,
    #root .p3x-phase{
      max-width:100%!important;
      border-radius:999px!important;
      letter-spacing:.05em!important;
      white-space:normal!important;
    }

    #root .fi-stats,
    #root .p3-progress{
      display:grid!important;
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      gap:8px!important;
      width:100%!important;
      max-width:100%!important;
      margin:12px 0 16px!important;
      padding:0!important;
      border:0!important;
      border-radius:0!important;
      background:transparent!important;
      box-shadow:none!important;
      overflow:visible!important;
    }

    #root .fi-stat,
    #root .p3-stat{
      display:flex!important;
      flex-direction:column!important;
      align-items:center!important;
      justify-content:center!important;
      min-width:0!important;
      min-height:82px!important;
      padding:10px 6px!important;
      border:var(--academy-card-border-width) solid #d4aa5870!important;
      border-radius:14px!important;
      background:linear-gradient(180deg,#2f1a10 0%,var(--academy-brown) 100%)!important;
      color:#f8f0df!important;
      text-align:center!important;
      box-shadow:0 5px 12px #00000030!important;
    }

    #root .fi-stat+.fi-stat{
      border-left:var(--academy-card-border-width) solid #d4aa5870!important;
    }

    #root .fi-stat:last-child,
    #root .p3-stat:last-child{
      background:linear-gradient(180deg,var(--academy-emerald) 0%,var(--academy-green-dark) 100%)!important;
      border-color:#d4aa58aa!important;
    }

    #root .fi-stat-label,
    #root .fi-stat span,
    #root .p3-stat span{
      display:block!important;
      order:1!important;
      margin:0 0 6px!important;
      color:#d8c6ad!important;
      line-height:1.05!important;
      letter-spacing:.06em!important;
      text-transform:uppercase!important;
      white-space:normal!important;
      overflow-wrap:break-word!important;
    }

    #root .fi-stat-value,
    #root .fi-stat b,
    #root .p3-stat b{
      display:block!important;
      order:2!important;
      margin:0!important;
      color:var(--academy-gold)!important;
      line-height:1.05!important;
      font-weight:700!important;
      white-space:normal!important;
      overflow-wrap:break-word!important;
    }

    #root .fi-stat small{
      display:block!important;
      order:3!important;
      margin-top:4px!important;
      color:#b9a58d!important;
      line-height:1.1!important;
    }

    #root .p3x-counter{
      position:sticky!important;
      top:8px!important;
      z-index:20!important;
      max-width:100%!important;
    }

    #root .p3x-opt,
    #root .p3-option,
    #root .fi-option,
    #root .p3x-btn,
    #root .p3-btn,
    #root .fi-btn{
      max-width:100%!important;
      min-width:0!important;
      border-radius:12px!important;
      white-space:normal!important;
      overflow-wrap:break-word!important;
    }

    #root .p3x-panel>h3,
    #root .p3-head h3,
    #root .fi-head h3{
      line-height:1.12!important;
      overflow-wrap:break-word!important;
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

      .brandin{
        gap:12px!important;
      }

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

      #root .card.topic{
        min-height:92px!important;
      }

      #root .card.topic .arrow{
        font-size:26px!important;
      }

      #root .fi-stats,
      #root .p3-progress{
        gap:6px!important;
      }

      #root .fi-stat,
      #root .p3-stat{
        min-height:76px!important;
        padding:9px 4px!important;
      }
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

      .brandin{
        gap:10px!important;
      }

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

      #root .card.topic{
        min-height:88px!important;
      }

      #root .fi-stats,
      #root .p3-progress{
        grid-template-columns:1fr!important;
      }

      #root .fi-stat,
      #root .p3-stat{
        min-height:64px!important;
      }
    }
  `;

  document.head.appendChild(style);
})();
