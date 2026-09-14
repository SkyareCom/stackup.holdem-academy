(() => {
  const STYLE_ID='stackup-academy-visual-system';
  if(document.getElementById(STYLE_ID))return;
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    #root .card.stage,
    #root .card.topic,
    #root .card.lesson{
      border:1px solid #d4aa58cc!important;
      border-radius:20px!important;
      box-shadow:0 10px 26px #00000030!important;
    }

    #root .card.stage,
    #root .card.topic{
      background:linear-gradient(180deg,#f4ecd9 0%,#eee3cb 100%)!important;
    }

    #root .card.stage{padding:18px!important}
    #root .card.topic{padding:15px!important}
    #root .card.lesson{padding:18px!important}

    #root .block,
    #root .rrow,
    #root .m2-card,
    #root .p3-shell,
    #root .p3x-panel,
    #root .p3x-math-card,
    #root .p3m-group,
    #root .fi-spot{
      border-radius:16px!important;
      border-color:#a87c3255!important;
      box-shadow:0 4px 12px #25170f12!important;
    }

    #root .blocks,
    #root .p3x-math-grid,
    #root .p3m-odds{
      gap:12px!important;
    }

    #root .badge,
    #root .p3x-badge,
    #root .fi-type,
    #root .p3x-phase{
      border-radius:999px!important;
      letter-spacing:.05em!important;
    }

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
      #root .screen{padding-left:14px!important;padding-right:14px!important}
      #root .list{gap:12px!important}
      #root .card.stage{padding:16px!important}
      #root .card.topic{padding:14px!important}
      #root .card.lesson{padding:16px!important}
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
      #root .fi-stats,
      #root .p3-progress{grid-template-columns:1fr!important}
      #root .fi-stat,
      #root .p3-stat{min-height:64px!important}
    }
  `;
  document.head.appendChild(style);
})();
