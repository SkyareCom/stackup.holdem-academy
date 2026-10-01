(() => {
  const STYLE_ID='stackup-typography-standard';
  const old=document.getElementById(STYLE_ID); if(old) old.remove();
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    /* Saira Semi Condensed applies only to the authenticated/internal Academy app.
       Entry and login screens intentionally keep their existing typography. */
    #app #home *:not(#_):not(#__):not(#___):not(#____):not(#_____):not(#______):not(#_______){font-family:'Saira Semi Condensed','Saira Condensed',sans-serif!important}
    #app #home .pc:not(#_):not(#__):not(#___):not(#____):not(#_____):not(#______):not(#_______),#app #home .pc *:not(#_):not(#__):not(#___):not(#____):not(#_____):not(#______):not(#_______),#app #home .navicon:not(#_):not(#__):not(#___):not(#____):not(#_____):not(#______):not(#_______),#app #home .rank:not(#_):not(#__):not(#___):not(#____):not(#_____):not(#______):not(#_______),#app #home .suit:not(#_):not(#__):not(#___):not(#____):not(#_____):not(#______):not(#_______),#app #home .fv-rank:not(#_):not(#__):not(#___):not(#____):not(#_____):not(#______):not(#_______),#app #home .fv-suit:not(#_):not(#__):not(#___):not(#____):not(#_____):not(#______):not(#_______){font-family:Arial,sans-serif!important}
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
