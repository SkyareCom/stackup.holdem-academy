(() => {
  const APP_NAME = "StackUp Hold'em Academy";
  const PRIVACY_URL = './privacy.html';
  const FOOTER_LOGO_URL = './ph4-footer-logo.webp?v=1';

  function applyReleaseCompliance(){
    const app=document.querySelector('.app');
    if(!app || document.getElementById('stackup-release-compliance')) return;

    const footer=document.createElement('footer');
    footer.id='stackup-release-compliance';
    footer.setAttribute('aria-label','Informações legais');
    footer.style.padding='4px 18px calc(18px + env(safe-area-inset-bottom))';
    footer.style.textAlign='center';
    footer.style.fontSize='11px';
    footer.style.lineHeight='1.45';
    footer.style.letterSpacing='.035em';
    footer.style.color='#a9957d';

    const logo=document.createElement('img');
    logo.src=FOOTER_LOGO_URL;
    logo.alt='PH4 dev&health';
    logo.width=118;
    logo.height=118;
    logo.loading='lazy';
    logo.decoding='async';
    Object.assign(logo.style,{
      display:'block',
      width:'clamp(88px,24vw,118px)',
      height:'auto',
      margin:'0 auto 10px',
      borderRadius:'14px',
      objectFit:'contain'
    });

    const note=document.createElement('div');
    note.textContent='CONTEÚDO EDUCACIONAL · SEM APOSTAS, DEPÓSITOS OU PRÊMIOS EM DINHEIRO REAL';

    const link=document.createElement('a');
    link.href=PRIVACY_URL;
    link.textContent='POLÍTICA DE PRIVACIDADE';
    link.setAttribute('aria-label',`Política de Privacidade — ${APP_NAME}`);
    link.style.display='inline-block';
    link.style.marginTop='5px';
    link.style.color='#d4aa58';
    link.style.textDecoration='underline';
    link.style.textUnderlineOffset='3px';

    footer.append(logo,note,link);
    app.appendChild(footer);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',applyReleaseCompliance,{once:true});
  }else{
    applyReleaseCompliance();
  }
})();