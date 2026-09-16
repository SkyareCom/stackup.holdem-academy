(() => {
  const STYLE_ID='stackup-highlight-card-style';
  if(document.getElementById(STYLE_ID))return;

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
      width:100%!important;
      max-width:100%!important;
      min-width:0!important;
      box-sizing:border-box!important;
      padding:9px 12px!important;
      line-height:1.3!important;
      white-space:normal!important;
      overflow-wrap:anywhere!important;
    }

    html,body,.app,#root,.screen,.list,.card{
      max-width:100%!important;
      box-sizing:border-box!important;
    }

    html,body,.app,#root{
      overflow-x:hidden!important;
    }

    button,.navbtn,.card{
      touch-action:manipulation;
    }

    #root .card.stage,
    #root .card.topic,
    #root .card.lesson{
      min-width:0!important;
      height:auto!important;
    }

    #root .card.topic{
      overflow:hidden!important;
    }

    #root .card.topic .tcopy{
      flex:1 1 auto!important;
      width:auto!important;
      min-width:0!important;
      max-width:100%!important;
    }

    #root .card.stage .stitle,
    #root .card.stage .desc,
    #root .head>h2,
    #root .head>p,
    #root .card.topic .ttitle,
    #root .card.topic .tnote,
    #root .card.lesson>h2,
    #root .card.lesson>.lead,
    #root .card.lesson h3,
    #root .card.lesson h4,
    #root .card.lesson p,
    #root .card.lesson li,
    #root .card.lesson .blocks .block>p{
      display:block!important;
      width:100%!important;
      max-width:100%!important;
      min-width:0!important;
      height:auto!important;
      min-height:0!important;
      max-height:none!important;
      white-space:normal!important;
      overflow:visible!important;
      text-overflow:clip!important;
      overflow-wrap:break-word!important;
      word-break:normal!important;
      -webkit-line-clamp:unset!important;
      -webkit-box-orient:initial!important;
    }

    #root .card.topic .idx,
    #root .card.topic .arrow{
      flex:none!important;
    }

    #root .card.lesson .blocks .block{
      min-width:0!important;
      max-width:100%!important;
    }
  `;
  document.head.appendChild(style);
})();
