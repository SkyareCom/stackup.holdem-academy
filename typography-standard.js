(() => {
  const STYLE_ID='stackup-typography-standard';
  if(document.getElementById(STYLE_ID)) return;

  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    :root,html,body,body *,button,input,select,textarea,option,
    .brand .name,.brand .sub,.brand-course,.navicon,[class],[id]{
      font-family:'Coming Soon',cursive!important;
      font-weight:700!important;
      font-style:italic!important;
    }
  `;
  document.head.appendChild(style);
})();
