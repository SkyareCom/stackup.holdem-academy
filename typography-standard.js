(() => {
  const STYLE_ID='stackup-typography-standard';
  if(document.getElementById(STYLE_ID)) return;

  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    :root{
      --type-display:clamp(28px,8.8vw,34px);
      --type-stage:clamp(24px,7.2vw,28px);
      --type-section:clamp(21px,6.2vw,24px);
      --type-card-title:clamp(18px,5.5vw,21px);
      --type-item-title:clamp(18px,5.2vw,20px);
      --type-question:clamp(16px,4.8vw,18px);
      --type-lead:clamp(15px,4.4vw,17px);
      --type-body:clamp(14px,4.1vw,16px);
      --type-small:clamp(12px,3.6vw,14px);
      --type-meta:clamp(11px,3.1vw,12px);
      --type-micro:11px;
      font-family:'Love Ya Like A Sister',cursive!important;
    }

    html,body,
    body *{
      font-family:'Love Ya Like A Sister',cursive!important;
    }

    .navicon,
    .rank,.suit,
    .fv-rank,.fv-suit{
      font-family:Arial,sans-serif!important;
    }

    .name{font-size:clamp(20px,6vw,24px)!important;line-height:1.02!important}
    .sub{font-size:clamp(12px,3.8vw,14px)!important;line-height:1.2!important}
    .navbtn{font-size:var(--type-body)!important}

    .intro h1,.stitle{font-size:var(--type-stage)!important}
    .intro p,.head p,.desc{font-size:var(--type-body)!important;line-height:1.45!important}
    .kicker,.eyebrow,.badge,.foot{font-size:var(--type-small)!important}
    .head h2,.card.lesson>h2{font-size:var(--type-display)!important;line-height:1.04!important}
    .ttitle,.rname{font-size:var(--type-item-title)!important}
    .tnote,.rnote{font-size:var(--type-small)!important;line-height:1.4!important}
    .idx{font-size:var(--type-item-title)!important}
    .lead{font-size:var(--type-lead)!important;line-height:1.5!important}

    .card.lesson{font-size:var(--type-body)!important}
    .card.lesson h3,
    .detail-card h3{font-size:var(--type-card-title)!important;line-height:1.15!important}
    .card.lesson h4{font-size:var(--type-question)!important;line-height:1.2!important}
    .card.lesson p,
    .card.lesson li,
    .detail-card p,
    .block p,
    .bet-sequence p,
    .strategy-example p,
    .ci p{font-size:var(--type-body)!important;line-height:1.5!important}
    .ci strong{font-size:var(--type-question)!important}
    .street-chip strong,.action-chip strong{font-size:var(--type-lead)!important}
    .street-chip span,.action-chip span{font-size:var(--type-small)!important}
    .step-item{font-size:var(--type-body)!important;line-height:1.45!important}
    .step-num,.ct-tag,.profile-tag{font-size:var(--type-small)!important}

    .rank,.fv-rank{font-size:var(--type-lead)!important}
    .suit,.fv-suit{font-size:var(--type-question)!important}

    .fi-kicker{font-size:var(--type-meta)!important}
    .fi-head h3{font-size:var(--type-section)!important;line-height:1.1!important}
    .fi-head p{font-size:var(--type-small)!important;line-height:1.45!important}
    .fi-mode{font-size:var(--type-micro)!important}
    .fi-stat b,.fi-stat .fi-stat-value{font-size:var(--type-question)!important}
    .fi-stat span,.fi-stat small,.fi-stat .fi-stat-label{font-size:var(--type-micro)!important}
    .fi-spotbar span{font-size:var(--type-meta)!important}
    .fi-question{font-size:var(--type-question)!important;line-height:1.42!important}
    .fi-help,.fi-analysis,.fi-complete{font-size:var(--type-small)!important}
    .fi-option,.fi-result{font-size:var(--type-body)!important}
    .fi-btn,.fi-seqnum{font-size:var(--type-meta)!important}

    .fv-label,.fv-handtitle,.fv-seat,.fv-step,.fv-metric span{font-size:var(--type-micro)!important}
    .fv-empty{font-size:var(--type-small)!important}
    .fv-pill,.fv-value,.fv-formatline,.fv-scene p{font-size:var(--type-meta)!important}
    .fv-scene h4,.fv-name,.fv-format h4{font-size:var(--type-question)!important}
    .fv-metric b{font-size:var(--type-lead)!important}

    h1,h2,h3,h4,
    .name,.sub,.stitle,.ttitle,.rname,
    .lead,.desc,.tnote,.rnote,
    p,li,button,span{
      overflow-wrap:break-word;
      word-break:normal;
    }
  `;
  document.head.appendChild(style);
})();
