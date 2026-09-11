(() => {
  const STYLE_ID='stackup-typography-standard';
  if(document.getElementById(STYLE_ID)) return;

  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    :root{
      --type-display:34px;
      --type-stage:28px;
      --type-section:24px;
      --type-card-title:21px;
      --type-item-title:20px;
      --type-question:18px;
      --type-lead:17px;
      --type-body:16px;
      --type-small:14px;
      --type-meta:12px;
      --type-micro:11px;
    }

    .name{font-size:24px!important;line-height:1.02!important}
    .sub{font-size:var(--type-small)!important}
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

    @media(max-width:390px){
      .name{font-size:24px!important}
      .sub{font-size:var(--type-small)!important}
      .intro h1,.stitle{font-size:var(--type-stage)!important}
      .head h2,.card.lesson>h2{font-size:var(--type-display)!important}
      .detail-card h3,.card.lesson h3{font-size:var(--type-card-title)!important}
      .detail-card p,.card.lesson p,.card.lesson li{font-size:var(--type-body)!important}
      .fi-head h3{font-size:var(--type-section)!important}
      .fi-question{font-size:var(--type-question)!important}
      .fi-stat .fi-stat-label{font-size:var(--type-micro)!important}
      .fi-stat .fi-stat-value{font-size:var(--type-question)!important}
      .fv-rank{font-size:var(--type-lead)!important}
      .fv-suit{font-size:var(--type-question)!important}
      .fv-seat{font-size:var(--type-micro)!important}
    }
  `;
  document.head.appendChild(style);
})();
