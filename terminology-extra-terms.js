(() => {
  function enhanceTerminology(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    if(!lesson || !title || title.textContent.trim().toUpperCase()!=='TERMINOLOGIAS BÁSICAS') return;

    const cards=[...lesson.querySelectorAll('.tp-card')];
    const target=cards.find(card=>card.querySelector('h3')?.textContent.trim().toUpperCase()==='FORÇA DE MÃO E DRAWS');
    const grid=target?.querySelector('.term-grid');
    if(!grid || grid.querySelector('[data-extra-term="drawing-dead"]')) return;

    grid.insertAdjacentHTML('beforeend',`
      <div class="term" data-extra-term="drawing-dead"><strong>DRAWING DEAD</strong><span><b>O que é:</b> situação em que, pelas cartas já conhecidas, não existe nenhuma carta restante capaz de fazer sua mão vencer a mão adversária. Sua chance de vitória é 0%.<br><br><b>Para que serve:</b> reconhecer quando um draw aparentemente existente já não tem valor real e evitar confundir “ainda há cartas por vir” com “ainda posso ganhar”.<br><br><b>Quando aparece:</b> principalmente depois que uma mão adversária já ficou imbatível. Exemplo: no Turn, o adversário já formou uma combinação que nenhuma carta do River pode superar.</span></div>
      <div class="term" data-extra-term="flip"><strong>FLIP / COIN FLIP</strong><span><b>O que é:</b> confronto em que duas mãos têm equities próximas de 50% contra 50%. Não precisa ser exatamente metade para cada lado.<br><br><b>Para que serve:</b> descrever uma disputa de alta variância em que nenhum jogador é grande favorito.<br><br><b>Quando aparece:</b> é muito comum pré-flop em all-ins, especialmente um par contra duas overcards. Exemplo clássico: 8♠8♦ contra A♣K♥ é aproximadamente um flip, embora o par normalmente tenha pequena vantagem antes do flop.</span></div>`);
  }

  const observer=new MutationObserver(enhanceTerminology);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  enhanceTerminology();
})();
