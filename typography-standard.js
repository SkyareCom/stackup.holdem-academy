(() => {
  const STYLE_ID='stackup-typography-standard';
  const old=document.getElementById(STYLE_ID); if(old) old.remove();
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    html,body,.app,body *{font-family:'Overlock Academy','Overlock',sans-serif!important;font-size:12px!important}
    .navicon,.rank,.suit,.fv-rank,.fv-suit{font-family:Arial,sans-serif!important}
    .brand .name,.brand .road-rage-brand{font-family:'Overlock Academy','Overlock',sans-serif!important;font-size:16px!important}
    .brand .sub{font-family:'Overlock Academy','Overlock',sans-serif!important;font-size:20px!important}
    .brand .course-interactive{font-family:'Overlock Academy','Overlock',sans-serif!important;font-size:14px!important}
  `;
  document.head.appendChild(style);
  const ensureCourse=()=>{
    const brand=document.querySelector('.brand .brandin > div:last-child'); if(!brand)return;
    let el=brand.querySelector('.course-interactive');
    if(!el){el=document.createElement('div');el.className='course-interactive';el.textContent='CURSO DE POKER INTERATIVO';brand.appendChild(el);}
  };
  ensureCourse();
  new MutationObserver(ensureCourse).observe(document.documentElement,{childList:true,subtree:true});
})();