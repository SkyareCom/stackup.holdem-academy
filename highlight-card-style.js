(() => {
  const STYLE_ID='stackup-highlight-card-style';
  if(document.getElementById(STYLE_ID)) return;

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
  `;
  document.head.appendChild(style);
})();
