(() => {
  const STYLE_ID='stackup-fundamentals-details-style';

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .detail-grid{display:grid;gap:12px}
      .detail-card{padding:15px 16px;border-radius:17px;background:var(--c2,#e7dcc2);border:1px solid #a87c324d}
      .detail-card h3{margin:0 0 7px;font-size:21px;color:var(--gd,#08372d);text-transform:uppercase}
      .detail-card p{margin:0;color:var(--m,#725f4d);font-size:16px;line-height:1.5}
      .detail-card p+p{margin-top:8px}
      .detail-card strong{color:var(--ink,#25170f)}
      .detail-note{background:#e6d8b9;border-color:#c99539}
      .street-flow{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:4px}
      .street-chip{padding:12px 10px;border-radius:14px;background:#f4ecd9;border:1px solid #a87c3255;text-align:center}
      .street-chip strong{display:block;color:#08372d;font-size:17px;text-transform:uppercase}
      .street-chip span{display:block;margin-top:3px;color:#725f4d;font-size:14px;line-height:1.3}
      @media(max-width:390px){.street-flow{grid-template-columns:1fr}.detail-card h3{font-size:19px}.detail-card p{font-size:15px}}
    `;
    document.head.appendChild(style);
  }

  const lessons={
    'SMALL BLIND, BIG BLIND E ANTE': `
      <div class="detail-grid">
        <div class="detail-card"><h3>POR QUE EXISTEM OS BLINDS?</h3><p><strong>Blinds</strong> são apostas obrigatórias colocadas antes da distribuição das cartas. Elas criam um pote inicial e fazem com que exista algo a disputar em toda mão, evitando que todos simplesmente esperem cartas muito fortes sem custo.</p></div>
        <div class="detail-card"><h3>SMALL BLIND — SB</h3><p>O <strong>Small Blind</strong> é a aposta obrigatória menor. Fica imediatamente à esquerda do Button. Em muitas estruturas vale metade do Big Blind, mas o valor exato é definido pela mesa ou pelo nível do torneio.</p><p>Exemplo: blinds 500/1.000 significam <strong>SB 500</strong> e <strong>BB 1.000</strong>.</p></div>
        <div class="detail-card"><h3>BIG BLIND — BB</h3><p>O <strong>Big Blind</strong> é a aposta obrigatória maior e fica imediatamente à esquerda do Small Blind. Ele serve como unidade de referência para stacks, tamanhos de aposta e profundidade da mesa.</p><p>Exemplo: um stack de 40.000 fichas com BB de 1.000 equivale a <strong>40 BB</strong>.</p></div>
        <div class="detail-card"><h3>O QUE É ANTE?</h3><p>O <strong>Ante</strong> é uma contribuição obrigatória adicional colocada antes da mão. Diferente dos blinds, sua função principal é aumentar o pote inicial e estimular mais disputa pelas fichas já disponíveis.</p><p>O ante é dinheiro morto no pote: ele não funciona como uma aposta que o jogador “completa” para continuar na mão.</p></div>
        <div class="detail-card"><h3>ANTE TRADICIONAL</h3><p>No <strong>Traditional Ante</strong>, cada jogador da mesa coloca uma pequena quantia antes da mão. Era muito comum em estruturas antigas de torneio e ainda pode aparecer em algumas regras e modalidades.</p></div>
        <div class="detail-card"><h3>BIG BLIND ANTE — BBA</h3><p>No <strong>Big Blind Ante</strong>, apenas o jogador no BB coloca, além do Big Blind, um ante que representa a contribuição da mesa inteira. É hoje um formato muito comum em torneios porque acelera o jogo e simplifica a cobrança.</p><p>O tamanho do BBA depende da estrutura; frequentemente é igual a 1 BB, mas a regra do torneio sempre prevalece.</p></div>
        <div class="detail-card"><h3>BUTTON ANTE</h3><p>No <strong>Button Ante</strong>, o jogador no BTN é quem coloca o ante coletivo da mesa. É menos comum que o Big Blind Ante, mas existe em algumas estruturas e jogos.</p></div>
        <div class="detail-card detail-note"><h3>IMPORTANTE</h3><p><strong>Blinds e antes giram junto com as posições</strong> ao longo das mãos. Em torneios, os valores normalmente aumentam conforme os níveis avançam. Em cash games, os blinds costumam permanecer fixos enquanto o jogador estiver naquela mesa.</p><p><strong>Straddle não é ante.</strong> É uma aposta voluntária adicional usada em alguns cash games e será tratada separadamente.</p></div>
      </div>`,
    'STREETS': `
      <div class="detail-grid">
        <div class="detail-card"><h3>O QUE SÃO STREETS?</h3><p><strong>Streets</strong> são as etapas de uma mão de poker. No Texas Hold'em, elas organizam quando as cartas comunitárias aparecem e dividem a mão em quatro momentos: <strong>Pré-flop, Flop, Turn e River</strong>.</p></div>
        <div class="detail-card"><h3>VISÃO GERAL</h3><div class="street-flow"><div class="street-chip"><strong>PRÉ-FLOP</strong><span>0 cartas no board</span></div><div class="street-chip"><strong>FLOP</strong><span>3 cartas no board</span></div><div class="street-chip"><strong>TURN</strong><span>4 cartas no board</span></div><div class="street-chip"><strong>RIVER</strong><span>5 cartas no board</span></div></div></div>
        <div class="detail-card"><h3>PRÉ-FLOP</h3><p>É a fase que começa depois que cada jogador recebe suas cartas fechadas e <strong>antes de qualquer carta comunitária ser aberta</strong>. Portanto, no pré-flop o board ainda está vazio.</p></div>
        <div class="detail-card"><h3>FLOP</h3><p>O <strong>Flop</strong> revela as <strong>três primeiras cartas comunitárias</strong> de uma só vez. A partir daqui já existe um board visível para todos os jogadores que continuam na mão.</p></div>
        <div class="detail-card"><h3>TURN</h3><p>O <strong>Turn</strong> adiciona a <strong>quarta carta comunitária</strong> ao board. Ela pode mudar completamente a força relativa das mãos e as possibilidades de combinações.</p></div>
        <div class="detail-card"><h3>RIVER</h3><p>O <strong>River</strong> adiciona a <strong>quinta e última carta comunitária</strong>. Depois dele não surgem novas cartas no board.</p></div>
        <div class="detail-card"><h3>O QUE É O BOARD?</h3><p>O <strong>Board</strong> é o conjunto das cartas comunitárias abertas no centro da mesa. No Texas Hold'em pode chegar a cinco cartas: 3 no Flop, 1 no Turn e 1 no River.</p><p>Todos os jogadores usam o mesmo board como parte da construção de sua melhor mão de cinco cartas.</p></div>
        <div class="detail-card"><h3>COMO LER O BOARD</h3><p>Além dos valores das cartas, observe como elas se relacionam. Um board pode ser <strong>pareado</strong> quando repete um valor, <strong>conectado</strong> quando possui cartas próximas que favorecem sequências, <strong>monotone</strong> quando as três cartas do flop são do mesmo naipe, ou <strong>two-tone</strong> quando dois naipes aparecem no flop.</p><p>Essas características são chamadas de <strong>textura do board</strong> e serão importantes mais adiante para entender força de mão e possibilidades de draw.</p></div>
        <div class="detail-card detail-note"><h3>SHOWDOWN</h3><p>O <strong>Showdown</strong> pode acontecer depois do River quando ainda há dois ou mais jogadores disputando o pote. Ele é a etapa de comparação das mãos, mas <strong>não é uma street de cartas comunitárias</strong>.</p></div>
      </div>`
  };

  function renderDetails(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    if(!lesson||!title) return;
    const key=title.textContent.trim().toUpperCase();
    if(!lessons[key]) return;
    addStyles();
    const blocks=lesson.querySelector('.blocks');
    if(!blocks||blocks.dataset.detailExpanded==='1') return;
    blocks.innerHTML=lessons[key];
    blocks.dataset.detailExpanded='1';
  }

  const observer=new MutationObserver(renderDetails);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  renderDetails();
})();