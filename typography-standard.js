(() => {
  const STYLE_ID='stackup-typography-standard';
  if(document.getElementById(STYLE_ID)) return;
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    :root{
      --type-display:14px;
      --type-stage:14px;
      --type-section:14px;
      --type-card-title:14px;
      --type-item-title:14px;
      --type-question:12px;
      --type-lead:12px;
      --type-body:12px;
      --type-small:12px;
      --type-meta:12px;
      --type-micro:12px;
      font-family:'Love Ya Like A Sister',cursive!important;
    }
    html,body,body *{font-family:'Love Ya Like A Sister',cursive!important}
    .navicon,.rank,.suit,.fv-rank,.fv-suit{font-family:Arial,sans-serif!important}
    h1,h2,h3,h4,h5,h6,.name,.stitle,.ttitle,.rname,.fi-head h3,.fv-scene h4,.fv-name,.fv-format h4,.card.lesson>h2,.card.lesson h3,.detail-card h3{font-size:14px!important}
    body,p,li,button,input,select,textarea,label,span,.sub,.navbtn,.intro p,.head p,.desc,.kicker,.eyebrow,.badge,.foot,.tnote,.rnote,.lead,.card.lesson,.card.lesson h4,.card.lesson p,.card.lesson li,.detail-card p,.block p,.bet-sequence p,.strategy-example p,.ci p,.ci strong,.street-chip strong,.action-chip strong,.street-chip span,.action-chip span,.step-item,.step-num,.ct-tag,.profile-tag,.rank,.fv-rank,.suit,.fv-suit,.fi-kicker,.fi-head p,.fi-mode,.fi-stat b,.fi-stat .fi-stat-value,.fi-stat span,.fi-stat small,.fi-stat .fi-stat-label,.fi-spotbar span,.fi-question,.fi-help,.fi-analysis,.fi-complete,.fi-option,.fi-result,.fi-btn,.fi-seqnum,.fv-label,.fv-handtitle,.fv-seat,.fv-step,.fv-metric span,.fv-empty,.fv-pill,.fv-value,.fv-formatline,.fv-scene p,.fv-metric b{font-size:12px!important}
    h1,h2,h3,h4,h5,h6,.name,.sub,.stitle,.ttitle,.rname,.lead,.desc,.tnote,.rnote,p,li,button,span{overflow-wrap:break-word;word-break:normal}
  `;
  document.head.appendChild(style);
})();
