(() => {
  const STYLE_ID='stackup-academy-visual-system';
  if(document.getElementById(STYLE_ID))return;
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    :root{
      --academy-card-bg:linear-gradient(180deg,#f4ecd9 0%,#eee3cb 100%);
      --academy-card-border:#d4aa58cc;
      --academy-card-border-soft:#a87c3255;
      --academy-card-radius:24px;
      --academy-card-radius-inner:17px;
      --academy-card-shadow:0 12px 28px #00000030;
      --academy-card-gap:14px;
      --academy-card-pad-x:18px;
      --academy-card-pad-y:17px;
      --academy-index-size:48px;
      --academy-arrow-size:24px;
    }

    /* PADRÃO ÚNICO — CARDS PRINCIPAIS */
    #root .card.stage,
    #root .card.topic,
    #root .card.lesson{
      width:100%!important;
      border:1px solid var(--academy-card-border)!important;
      border-radius:var(--academy-card-radius)!important;
      box-shadow:var(--academy-card-shadow)!important;
      overflow:hidden!important;
      box-sizing:border-box!important;
    }

    #root .card.stage,
    #root .card.topic,
    #root .card.lesson{
      background:var(--academy-card-bg)!important;
    }

    #root .card.stage{
      padding:20px!important;
    }

    #root .card.topic{
      display:flex!important;
      align-items:center!important;
      gap:var(--academy-card-gap)!important;
      min-height:96px!important;
      padding:var(--academy-card-pad-y) var(--academy-card-pad-x)!important;
    }

    #root .card.lesson{
      padding:20px!important;
    }

    /* LISTAS: MESMA DISTÂNCIA ENTRE TODOS OS CARDS */
    #root .list{
      display:grid!important;
      gap:14px!important;
    }

    /* NÚMERO / ÍCONE ESQUERDO — MESMA CAIXA EM TODAS AS TELAS */
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
      background:#211008!important;
      color:#d4aa58!important;
      text-align:center!important;
      line-height:1!important;
    }

    /* ÁREA DE TEXTO — SEM TRUNCAR TÍTULOS */
    #root .card.topic .tcopy{
      flex:1 1 auto!important;
      min-width:0!important;
      display:flex!important;
      flex-direction:column!important;
      justify-content:center!important;
      gap:4px!important;
      overflow:visible!important;
    }

    #root .card.topic .ttitle{
      display:block!important;
      width:100%!important;
      margin:0!important;
      padding:0!important;
      line-height:1.16!important;
      white-space:normal!important;
      overflow:visible!important;
      text-overflow:clip!important;
      overflow-wrap:break-word!important;
      word-break:normal!important;
      -webkit-line-clamp:unset!important;
      -webkit-box-orient:initial!important;
    }

    #root .card.topic .tnote{
      display:block!important;
      width:100%!important;
      margin:0!important;
      line-height:1.34!important;
      white-space:normal!important;
      overflow:hidden!important;
      text-overflow:clip!important;
      overflow-wrap:break-word!important;
      word-break:normal!important;
      display:-webkit-box!important;
      -webkit-box-orient:vertical!important;
      -webkit-line-clamp:3!important;
    }

    /* SETA — MESMO TAMANHO E MESMA POSIÇÃO VISUAL */
    #root .card.topic .arrow{
      width:var(--academy-arrow-size)!important;
      min-width:var(--academy-arrow-size)!important;
      flex:0 0 var(--academy-arrow-size)!important;
      display:grid!important;
      place-items:center!important;
      align-self:center!important;
      margin:0!important;
      padding:0!important;
      color:#a87c32!important;
      font-size:28px!important;
      line-height:1!important;
      text-align:center!important;
    }

    /* CARDS INTERNOS DE CONTEÚDO — VARIANTE SECUNDÁRIA */
    #root .block,
    #root .rrow,
    #root .m2-card,
    #root .p3-shell,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group,
    #root .fi-spot,
    #root .detail-card{
      border:1px solid var(--academy-card-border-soft)!important;
      border-radius:var(--academy-card-radius-inner)!important;
      box-shadow:0 4px 12px #25170f12!important;
      box-sizing:border-box!important;
    }

    #root .block,
    #root .rrow,
    #root .m2-card,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group,
    #root .detail-card{
      padding:16px!important;
    }

    #root .blocks,
    #root .ranking,
    #root .p3x-math-grid,
    #root .p3m-odds{
      gap:12px!important;
    }

    #root .block h3,
    #root .detail-card h3{
      margin-top:0!important;
    }

    /* BADGES */
    #root .badge,
    #root .p3x-badge,
    #root .fi-type,
    #root .p3x-phase{
      border-radius:999px!important;
      letter-spacing:.05em!important;
    }

    /* CARDS DE ESTATÍSTICA */
    #root .fi-stats,
    #root .p3-progress{
      display:grid!important;
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      gap:8px!important;
      width:100%!important;
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
      border:1px solid #d4aa5870!important;
      border-radius:14px!important;
      background:linear-gradient(180deg,#2f1a10 0%,#211008 100%)!important;
      color:#f8f0df!important;
      text-align:center!important;
      box-shadow:0 5px 12px #00000030!important;
    }

    #root .fi-stat+.fi-stat{
      border-left:1px solid #d4aa5870!important;
    }

    #root .fi-stat:last-child,
    #root .p3-stat:last-child{
      background:linear-gradient(180deg,#195f4c 0%,#08372d 100%)!important;
      border-color:#d4aa58aa!important;
    }

    #root .fi-stat-label,
    #root .fi-stat span,
    #root .p3-stat span{
      display:block!important;
      order:1!important;
      margin:0 0 6px!important;
      color:#d8c6ad!important;
      font-size:10px!important;
      line-height:1.05!important;
      letter-spacing:.06em!important;
      text-transform:uppercase!important;
      white-space:nowrap!important;
    }

    #root .fi-stat-value,
    #root .fi-stat b,
    #root .p3-stat b{
      display:block!important;
      order:2!important;
      margin:0!important;
      color:#d4aa58!important;
      font-size:22px!important;
      line-height:1.05!important;
      font-weight:700!important;
      white-space:nowrap!important;
    }

    #root .fi-stat small{
      display:block!important;
      order:3!important;
      margin-top:4px!important;
      color:#b9a58d!important;
      font-size:10px!important;
      line-height:1.1!important;
    }

    #root .p3x-counter{
      position:sticky!important;
      top:8px!important;
      z-index:20!important;
    }

    #root .p3x-opt,
    #root .p3-option,
    #root .fi-option,
    #root .p3x-btn,
    #root .p3-btn,
    #root .fi-btn{
      border-radius:12px!important;
    }

    #root .p3x-panel>h3,
    #root .p3-head h3,
    #root .fi-head h3{
      line-height:1.12!important;
    }

    @media(max-width:420px){
      :root{
        --academy-card-pad-x:16px;
        --academy-card-pad-y:15px;
        --academy-index-size:46px;
        --academy-card-gap:12px;
      }

      #root .screen{
        padding-left:14px!important;
        padding-right:14px!important;
      }

      #root .list{gap:12px!important}
      #root .card.stage{padding:18px!important}
      #root .card.topic{min-height:92px!important}
      #root .card.lesson{padding:18px!important}
      #root .card.topic .arrow{font-size:26px!important}

      #root .fi-stats,
      #root .p3-progress{gap:6px!important}
      #root .fi-stat,
      #root .p3-stat{min-height:76px!important;padding:9px 4px!important}
      #root .fi-stat-label,
      #root .fi-stat span,
      #root .p3-stat span{font-size:9px!important;letter-spacing:.035em!important}
      #root .fi-stat-value,
      #root .fi-stat b,
      #root .p3-stat b{font-size:18px!important}
      #root .fi-stat small{font-size:9px!important}
    }

    @media(max-width:340px){
      :root{
        --academy-card-pad-x:13px;
        --academy-index-size:42px;
        --academy-card-gap:10px;
      }
      #root .card.topic{min-height:88px!important}
      #root .fi-stats,
      #root .p3-progress{grid-template-columns:1fr!important}
      #root .fi-stat,
      #root .p3-stat{min-height:64px!important}
    }
  `;
  document.head.appendChild(style);
})();
