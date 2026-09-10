(() => {
  const STYLE_ID = 'stackup-ranking-guide-style';
  const GUIDE_CLASS = 'compare-guide';

  function ensureStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .compare-guide{margin-top:18px;padding:17px;border-radius:18px;background:var(--brown-2);border:1px solid var(--gold);color:var(--white)}
      .compare-guide h3{margin:0 0 12px;color:var(--gold);font-size:23px;text-transform:uppercase}
      .compare-item{padding:12px 0;border-top:1px solid rgba(212,170,88,.24)}
      .compare-item:first-of-type{border-top:0;padding-top:0}
      .compare-item:last-child{padding-bottom:0}
      .compare-item strong{display:block;color:var(--cream);font-size:18px;text-transform:uppercase;margin-bottom:4px}
      .compare-item p{margin:0!important;color:#d8c6ad!important;font-size:15px!important;line-height:1.5!important}
    `;
    document.head.appendChild(style);
  }

  function addGuide(){
    const ranking=document.querySelector('.ranking-list');
    if(!ranking || document.querySelector('.'+GUIDE_CLASS)) return;
    ensureStyles();
    const guide=document.createElement('div');
    guide.className=GUIDE_CLASS;
    guide.innerHTML=`
      <h3>COMO SABER QUEM VENCEU?</h3>
      <div class="compare-item">
        <strong>MÃOS DIFERENTES</strong>
        <p>Compare primeiro o tipo da mão. A combinação que aparece mais acima neste ranking vence. Exemplo: um Flush sempre vence uma Sequência.</p>
      </div>
      <div class="compare-item">
        <strong>MESMO TIPO DE MÃO</strong>
        <p>Compare as cartas que formam a combinação, da maior para a menor. Se ainda houver empate, entram os kickers. Exemplo: um par de Reis vence um par de Damas; se ambos têm par de Reis, compare o maior kicker e depois os seguintes.</p>
      </div>
      <div class="compare-item">
        <strong>REGRAS DE DESEMPATE</strong>
        <p>Na Sequência e no Straight Flush, vence a sequência com a carta mais alta. Na Quadra, vence a quadra maior. No Full House, compare primeiro a trinca. No Flush e na Carta Alta, compare a maior carta, depois a segunda e assim por diante. Em Dois Pares, compare o par mais alto, depois o segundo par e por fim o kicker.</p>
      </div>
      <div class="compare-item">
        <strong>EMPATE REAL</strong>
        <p>Se as melhores 5 cartas dos jogadores forem exatamente iguais, o pote é dividido. No poker padrão, o naipe não é usado para desempatar mãos.</p>
      </div>
    `;
    ranking.insertAdjacentElement('afterend',guide);
  }

  const observer=new MutationObserver(addGuide);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  addGuide();
})();