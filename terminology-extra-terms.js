(() => {
  function enhanceTerminology(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    if(!lesson || !title || title.textContent.trim().toUpperCase()!=='TERMINOLOGIAS BÁSICAS') return;

    const cards=[...lesson.querySelectorAll('.tp-card')];
    const handCard=cards.find(card=>card.querySelector('h3')?.textContent.trim().toUpperCase()==='FORÇA DE MÃO E DRAWS');
    const handGrid=handCard?.querySelector('.term-grid');

    if(handGrid){
      const kicker=[...handGrid.querySelectorAll('.term')].find(term=>term.querySelector('strong')?.textContent.trim().toUpperCase()==='KICKER');
      const kickerText=kicker?.querySelector('span');
      if(kickerText && kicker.dataset.kickerExpanded!=='1'){
        kickerText.innerHTML='<b>O que é:</b> carta que não pertence à combinação principal, mas é usada para desempatar mãos do mesmo tipo.<br><br><b>Exemplo:</b> em A♠K♦ contra A♥Q♣ num board A♦7♣4♠2♥9♣, ambos têm um par de Ases, mas o Rei é o kicker mais alto e A-K vence A-Q.<br><br><b>Importante:</b> mais de um kicker pode ser comparado. Em mãos como par, dois pares, trinca e carta alta, os kickers podem decidir o pote. Se as cinco melhores cartas forem iguais, o pote é dividido.';
        kicker.dataset.kickerExpanded='1';
      }

      if(!handGrid.querySelector('[data-extra-term="drawing-dead"]')){
        handGrid.insertAdjacentHTML('beforeend',`
          <div class="term" data-extra-term="drawing-dead"><strong>DRAWING DEAD</strong><span><b>O que é:</b> situação em que, pelas cartas já conhecidas, não existe nenhuma carta restante capaz de fazer sua mão vencer a mão adversária. Sua chance de vitória é 0%.<br><br><b>Para que serve:</b> reconhecer quando um draw aparentemente existente já não tem valor real e evitar confundir “ainda há cartas por vir” com “ainda posso ganhar”.<br><br><b>Quando aparece:</b> principalmente depois que uma mão adversária já ficou imbatível.</span></div>
          <div class="term" data-extra-term="flip"><strong>FLIP / COIN FLIP</strong><span><b>O que é:</b> confronto em que duas mãos têm equities próximas de 50% contra 50%. Não precisa ser exatamente metade para cada lado.<br><br><b>Quando aparece:</b> é muito comum pré-flop em all-ins, especialmente um par contra duas overcards. Exemplo clássico: 8♠8♦ contra A♣K♥.</span></div>`);
      }
    }

    if(!lesson.querySelector('[data-extra-card="tempo-decisao"]')){
      const note=cards.find(card=>card.classList.contains('tp-note'));
      const wrapper=document.createElement('div');
      wrapper.className='tp-card';
      wrapper.dataset.extraCard='tempo-decisao';
      wrapper.innerHTML=`<h3>VELOCIDADE E TIPO DE DECISÃO</h3><div class="term-grid">
        <div class="term"><strong>INSTANT CALL / SNAP CALL</strong><span><b>O que é:</b> pagar praticamente de imediato, sem tempo perceptível de reflexão. “Snap call” e “instant call” são usados como sinônimos.<br><br><b>O que pode indicar:</b> muitas vezes uma decisão muito clara para aquele jogador, mas o timing sozinho não prova força ou fraqueza. Jogadores também podem agir rápido por hábito ou para induzir leitura errada.</span></div>
        <div class="term"><strong>SNAP FOLD</strong><span>Fold praticamente instantâneo. Normalmente indica que o jogador considera sua mão claramente insuficiente contra aquela ação, mas não deve ser usado isoladamente como leitura definitiva.</span></div>
        <div class="term"><strong>SNAP SHOVE / SNAP JAM</strong><span>All-in feito imediatamente. <b>Shove</b> e <b>jam</b> são gírias para empurrar todas as fichas. “Snap” apenas descreve que a decisão foi tomada muito rápido.</span></div>
        <div class="term"><strong>TANK / TANKAR</strong><span>Usar um período longo para pensar antes de decidir. Pode ocorrer em spots difíceis. “Tankar” não significa necessariamente fraqueza nem força.</span></div>
        <div class="term"><strong>HERO CALL</strong><span>Call difícil, geralmente no River, feito com uma mão relativamente marginal porque o jogador acredita que o adversário está blefando com frequência suficiente.</span></div>
        <div class="term"><strong>BLUFF CATCHER</strong><span>Mão que normalmente perde para as apostas de valor do adversário, mas vence os blefes. Sua principal função é “capturar” blefes; por isso a decisão costuma depender da frequência de blefe e das pot odds.</span></div>
      </div></div>`;
      if(note) note.before(wrapper); else lesson.querySelector('.tp-grid')?.appendChild(wrapper);
    }

    if(!lesson.querySelector('[data-extra-card="resultado-variancia"]')){
      const note=lesson.querySelector('.tp-note');
      const wrapper=document.createElement('div');
      wrapper.className='tp-card';
      wrapper.dataset.extraCard='resultado-variancia';
      wrapper.innerHTML=`<h3>RESULTADO, VARIÂNCIA E SITUAÇÕES COMUNS</h3><div class="term-grid">
        <div class="term"><strong>COOLER</strong><span>Situação em que duas mãos excepcionalmente fortes se enfrentam e é muito difícil evitar perder muitas fichas. Ex.: set contra set maior. Não significa necessariamente erro estratégico.</span></div>
        <div class="term"><strong>BAD BEAT</strong><span>Quando uma mão que era grande favorita perde após o adversário acertar uma combinação improvável nas cartas restantes. O termo descreve o resultado, não prova que alguém jogou bem ou mal.</span></div>
        <div class="term"><strong>SUCKOUT</strong><span>Gíria para quando uma mão que estava atrás melhora e vence, especialmente se tinha pouca equity. É diferente de “bad beat” apenas pelo ponto de vista e pelo uso coloquial.</span></div>
        <div class="term"><strong>RUNOUT</strong><span>Conjunto das cartas que completam o board a partir de determinado ponto. Ex.: “o runout Turn-River foi 7♠ e K♦”.</span></div>
        <div class="term"><strong>CHOP / SPLIT POT</strong><span>Divisão do pote entre dois ou mais jogadores quando possuem exatamente a mesma melhor mão de cinco cartas, ou conforme a estrutura da modalidade.</span></div>
        <div class="term"><strong>FREEROLL</strong><span>Em um confronto, situação em que um jogador não pode mais perder o pote principal para o outro e ainda possui outs para ganhar sozinho em vez de dividir. O termo também é usado para torneios sem buy-in, dependendo do contexto.</span></div>
      </div></div>`;
      if(note) note.before(wrapper); else lesson.querySelector('.tp-grid')?.appendChild(wrapper);
    }
  }

  const observer=new MutationObserver(enhanceTerminology);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  enhanceTerminology();
})();
